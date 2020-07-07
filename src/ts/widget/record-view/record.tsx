import * as React from "react";
import * as MUS from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import RecordHeader from "./record-header";
import RecordField from "./record-field";

import commonStyles from "../../styles/css";

const useStyles = MUS.makeStyles((theme: MUS.Theme) =>
    MUS.createStyles({
        ...commonStyles(theme),
    })
);

interface Props {
    record: {
        schema: string;
        table: string;
        id: string;
        name: string;
        fields: {
            name: string;
            type: string;
            value: boolean | number | string;
        }[];
    };
}

const ModelViewerClass = (props: Props): JSX.Element => {
    const classes = useStyles();
    return (
        <Card className={classes.stretch_both} variant="outlined">
            <RecordHeader record={props.record} />
            <Divider />
            <Grid container direction="column" wrap="nowrap">
                {props.record?.fields?.flatMap((f, i) => [
                    <RecordField key={"a" + i} field={f} />,
                    <Divider key={"d" + i} />,
                ])}
            </Grid>
        </Card>
    );
};
export default ModelViewerClass;
