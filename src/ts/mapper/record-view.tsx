import axios from "axios";

import * as React from "react";
import * as Router from "react-router-dom";

import requestClass from "../request/class";
import RecordViewer, { Record } from "../widget/record-view";

interface Model {
    schema: string;
    table: string;
    columns: { [column: string]: string }; // name => type
    outgoing: {
        [column: string]: {
            schema: string;
            table: string;
        };
    }; // name => target
    incoming: {
        schema: string;
        table: string;
        column: string;
    }[]; // source: schema, class, attribute
}

const requestModel = async (schema: string, table: string): Promise<Model> => {
    const response = await requestClass(schema, table);

    const model: Model = {
        schema: response["schema:schema"].label,
        table: response.label,
        columns: Object.fromEntries(
            response["^class:attribute"].filter((a) => null == a["target:class"]).map((a) => [a.label, a.type])
        ),
        outgoing: Object.fromEntries(
            response["^class:attribute"]
                .filter((a) => null != a["target:class"])
                .map((a) => [
                    a.label,
                    {
                        schema: a["target:class"]["schema:schema"].label,
                        table: a["target:class"].label,
                    },
                ])
        ),
        incoming: response["^target:attribute"].map((a) => ({
            schema: a["class:class"]["schema:schema"].label,
            table: a["class:class"].label,
            column: a.label,
        })),
    };
    return model;
};

const requestRecord = async (schema: string, table: string, id: string, setRecord: (r: Record) => void) => {
    const model = await requestModel(schema, table);

    const attrs = Object.keys(model.columns)
        .filter((a) => a !== "id")
        .map((a) => [a, {}]);
    const outgoing = Object.entries(model.outgoing).map(([a, o]) => [a + ":" + o.table, { id: {}, label: {} }]);
    const incoming = model.incoming.map((i) => ["^" + i.column + ":" + i.table, { id: {}, label: {} }]);

    const jql = {
        $type: table,
        id,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ...Object.fromEntries(attrs.concat(outgoing, incoming)),
    };

    const response = (
        await axios.post("/jql/" + schema, JSON.stringify(jql), {
            headers: { "Content-Type": "application/json" },
        })
    ).data[0];

    const record: Record = {
        schema: model.schema,
        table: model.table,
        id: response.id,
        name: response.label,
        fields: Object.entries(model.columns)
            .map(([a, t]) => ({ name: a, type: t, value: response[a] }))
            .sort((a, b) => a.name.localeCompare(b.name)),
        outgoing: Object.entries(model.outgoing)
            .map(([a, o]) => ({
                field: a,
                schema: o.schema,
                table: o.table,
                id: response[a + ":" + o.table]?.id,
                name: response[a + ":" + o.table]?.label,
            }))
            .sort((a, b) => a.table.localeCompare(b.table) || a.field.localeCompare(b.field)),
        incoming: model.incoming
            .map((i) => ({
                schema: i.schema,
                table: i.table,
                field: i.column,
                refs: response["^" + i.column + ":" + i.table]
                    .map((r) => ({ id: r.id, name: r.label }))
                    .sort((a, b) => a.name.localeCompare(b.name)),
            }))
            .sort((a, b) => a.table.localeCompare(b.table) || a.field.localeCompare(b.field)),
    };

    setRecord(record);
};

const DataViewMapper = (): JSX.Element => {
    const { schema, table, id } = Router.useParams();
    const [record, setRecord] = React.useState(null as Record);

    React.useEffect(() => {
        setRecord(null);
        requestRecord(schema, table, id, setRecord);
    }, [schema, table, id]);

    return <RecordViewer record={record} />;
};

export default DataViewMapper;
