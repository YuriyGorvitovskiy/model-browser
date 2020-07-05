import axios from "axios";

interface ClassInfo {
    label: string;
    "schema:schema": {
        label: string;
    };
    "^class:attribute": {
        label: string;
        type: string;
        "target:class": {
            label: string;
            "schema:schema": {
                label: string;
            };
        };
    }[];
    "^target:attribute": {
        label: string;
        "class:class": {
            label: string;
            "schema:schema": {
                label: string;
            };
        };
    }[];
}

const requestClass = async (schema_label: string, class_label: string): Promise<ClassInfo> => {
    const jql = {
        $type: "class",
        label: class_label,
        "schema:schema": {
            label: schema_label ? schema_label : {},
        },
        "^class:attribute": {
            label: {},
            type: {},
            "target:class": {
                label: {},
                "schema:schema": {
                    label: {},
                },
            },
        },
        "^target:attribute": {
            label: {},
            "class:class": {
                label: {},
                "schema:schema": {
                    label: {},
                },
            },
        },
    };

    const response = await axios.post("/jql/model", JSON.stringify(jql), {
        headers: { "Content-Type": "application/json" },
    });

    return response.data[0];
};

export default requestClass;
