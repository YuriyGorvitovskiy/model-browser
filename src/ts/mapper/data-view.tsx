import axios from "axios";

import * as React from "react";
import * as Router from "react-router-dom";

import requestClass from "../request/class";

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
    }[]; // source: schema,class,attribute
}

interface Record {
    schema: string;
    table: string;
    id: string;
    columns: {
        column: string;
        type: string;
        value: boolean | number | string;
    }[];
    outgoing: {
        column: string;
        schema: string;
        table: string;
        id: string;
        name: string;
    }[];
    incoming: {
        schema: string;
        table: string;
        column: string;
        refs: {
            id: string;
            name: string;
        }[];
    }[];
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
        columns: Object.entries(model.columns)
            .map(([a, t]) => ({ column: a, type: t, value: response[a] }))
            .sort((a, b) => a.column.localeCompare(b.column)),
        outgoing: Object.entries(model.outgoing)
            .map(([a, o]) => ({
                column: a,
                schema: o.schema,
                table: o.table,
                id: response[a + ":" + o.table].id,
                name: response[a + ":" + o.table].label,
            }))
            .sort((a, b) => a.table.localeCompare(b.table) || a.column.localeCompare(b.column)),
        incoming: model.incoming
            .map((i) => ({
                schema: i.schema,
                table: i.table,
                column: i.column,
                refs: response["^" + i.column + ":" + i.table]
                    .map((r) => ({ id: r.id, name: r.label }))
                    .sort((a, b) => a.name.localeCompare(b.name)),
            }))
            .sort((a, b) => a.table.localeCompare(b.table) || a.column.localeCompare(b.column)),
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

    return (
        <div>
            <h1>Record</h1>
            <pre>{JSON.stringify(record, null, 4)}</pre>
        </div>
    );
};

export default DataViewMapper;
