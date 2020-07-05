import axios from "axios";

import * as React from "react";
import * as Router from "react-router-dom";

import requestClass from "../request/class";

type Record = { [key: string]: boolean | number | string };

interface Model {
    schema: string;
    table: string;
    attrs: { [key: string]: string }; // name => type
    outgoing: { [key: string]: { class: string; schema: string } }; // name => target
    incoming: { name: string; class: string; schema: string }[]; // source: schema,class,attribute
}

const requestModel = async (schema: string, table: string): Promise<Model> => {
    const response = await requestClass(schema, table);

    const model: Model = {
        schema: response["schema:schema"].label,
        table: response.label,
        attrs: Object.fromEntries(
            response["^class:attribute"].filter((a) => null == a["target:class"]).map((a) => [a.label, a.type])
        ),
        outgoing: Object.fromEntries(
            response["^class:attribute"]
                .filter((a) => null != a["target:class"])
                .map((a) => [
                    a.label,
                    { class: a["target:class"].label, schema: a["target:class"]["schema:schema"].label },
                ])
        ),
        incoming: response["^target:attribute"].map((a) => ({
            name: a.label,
            class: a["class:class"].label,
            schema: a["class:class"]["schema:schema"].label,
        })),
    };
    return model;
};

const requestRecord = async (
    schema: string,
    table: string,
    id: string,
    setModel: (m: Model) => void,
    setRecord: (r: Record) => void
) => {
    const model = await requestModel(schema, table);
    setModel(model);

    const attrs = Object.keys(model.attrs)
        .filter((a) => a !== "id")
        .map((a) => [a, {}]);
    const outgoing = Object.entries(model.outgoing).map(([a, o]) => [a + ":" + o.class, { id: {}, label: {} }]);
    const incoming = model.incoming.map((i) => ["^" + i.name + ":" + i.class, { id: {}, label: {} }]);

    const jql = {
        $type: table,
        id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...Object.fromEntries(attrs.concat(outgoing, incoming)),
    };

    const response = await axios.post("/jql/" + schema, JSON.stringify(jql), {
        headers: { "Content-Type": "application/json" },
    });

    setRecord(response.data[0]);
};

const DataViewMapper = (): JSX.Element => {
    const { schema, table, id } = Router.useParams();
    const [model, setModel] = React.useState(null as Model);
    const [record, setRecord] = React.useState(null as Record);

    React.useEffect(() => {
        setRecord(null);
        requestRecord(schema, table, id, setModel, setRecord);
    }, [schema, table, id]);

    return (
        <div>
            <h1>Model</h1>
            <pre>{JSON.stringify(model, null, 4)}</pre>
            <h1>Record</h1>
            <pre>{JSON.stringify(record, null, 4)}</pre>
        </div>
    );
};

export default DataViewMapper;
