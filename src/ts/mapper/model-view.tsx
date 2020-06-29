import axios from "axios";

import * as React from "react";
import * as Router from "react-router-dom";

import Widget, { ModelViewProps } from "../widget/model-view";

const requestClassInfo = async (class_name: string, set: (i: ModelViewProps) => void) => {
    set({
        class: {
            name: class_name,
            attrs: [],
            incoming: [],
            outgoing: [],
        },
    });
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
        class: {
            name: response.data[0].label,
            attrs,
            incoming: Object.entries(incoming)
                .map(([c, r]) => ({ name: c, rels: r.sort().map((a) => ({ name: a })) }))
                .sort((a, b) => a.name.localeCompare(b.name)),
            outgoing: Object.entries(outgoing)
                .map(([c, r]) => ({ name: c, rels: r.sort().map((a) => ({ name: a })) }))
                .sort((a, b) => a.name.localeCompare(b.name)),
        },
    });
};

const ModelViewMapper = (): JSX.Element => {
    const { class_name } = Router.useParams();
    const [classInfo, setClassInfo] = React.useState(
        () =>
            ({
                class: {
                    name: "",
                    attrs: [],
                    incoming: [],
                    outgoing: [],
                },
            } as ModelViewProps)
    );

    if (class_name !== classInfo.class.name) {
        requestClassInfo(class_name, setClassInfo);
    }
    return <Widget class={classInfo.class} />;
};

export default ModelViewMapper;
