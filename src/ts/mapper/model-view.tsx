import axios from "axios";

import * as React from "react";
import * as Router from "react-router-dom";

import Widget, { ClassInfo } from "../widget/model-view";

const dummyClassInfo = (name: string): ClassInfo => ({
    name,
    attrs: [],
    incoming: [],
    outgoing: [],
});
const requestClassInfo = async (class_name: string, set: (i: ClassInfo) => void) => {
    const jql = {
        $type: "class",
        label: class_name,
        "^class:attribute": {
            label: {},
            type: {},
            "target:class": {
                label: {},
            },
        },
        "^target:attribute": {
            label: {},
            "class:class": {
                label: {},
            },
        },
    };

    const response = await axios.post("/jql/model", JSON.stringify(jql), {
        headers: { "Content-Type": "application/json" },
    });

    const attrs = response.data[0]["^class:attribute"]
        .filter((a) => "reference" !== a.type || null == a["target:class"])
        .map((a) => ({ name: a.label, type: a.type }))
        .sort((a, b) => a.name.localeCompare(b.name));

    const outgoing: { [key: string]: string[] } = response.data[0]["^class:attribute"]
        .filter((a) => "reference" === a.type && null != a["target:class"])
        .reduce((a, r) => {
            const target = r["target:class"].label;
            const clazz = (a[target] = a[target] || []);
            clazz.push(r.label);
            return a;
        }, {});

    const incoming: { [key: string]: string[] } = response.data[0]["^target:attribute"].reduce((a, r) => {
        const target = r["class:class"].label;
        const clazz = (a[target] = a[target] || []);
        clazz.push(r.label);
        return a;
    }, {});

    set({
        name: response.data[0].label,
        attrs,
        incoming: Object.entries(incoming)
            .map(([c, r]) => ({ name: c, rels: r.sort().map((a) => ({ name: a })) }))
            .sort((a, b) => a.name.localeCompare(b.name)),
        outgoing: Object.entries(outgoing)
            .map(([c, r]) => ({ name: c, rels: r.sort().map((a) => ({ name: a })) }))
            .sort((a, b) => a.name.localeCompare(b.name)),
    });
};
const requestClasses = async (set: (c: string[]) => void) => {
    const jql = {
        $type: "class",
        label: {},
    };

    const response = await axios.post("/jql/model", JSON.stringify(jql), {
        headers: { "Content-Type": "application/json" },
    });

    const classes = response.data.map((c) => c.label).sort();

    set(classes);
};

const ModelViewMapper = (): JSX.Element => {
    const { class_name } = Router.useParams();
    const [classes, setClasses] = React.useState([] as string[]);
    const [classInfo, setClassInfo] = React.useState(dummyClassInfo(""));

    React.useEffect(() => {
        requestClasses(setClasses);
    }, []);
    if (class_name !== classInfo.name) {
        setClassInfo(() => dummyClassInfo(class_name));
        requestClassInfo(class_name, setClassInfo);
    }
    return <Widget class={classInfo} classes={classes} classRoute={(c) => "/" + c} />;
};

export default ModelViewMapper;
