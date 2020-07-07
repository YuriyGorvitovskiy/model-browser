import React from "react";
import { useHistory } from "react-router-dom";

import * as MUS from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import MainRecord from "./record-view/record";
import IncomingReferences from "./record-view/incoming-references";
import OutgoingReference from "./record-view/outgoing-reference";
import Spacing from "./record-view/record-header-spacing";

import commonStyles from "../styles/css";

const useStyles = MUS.makeStyles((theme: MUS.Theme) =>
    MUS.createStyles({
        ...commonStyles(theme),
        root: {
            padding: theme.spacing(2),
        },
        search_expand: {
            paddingRight: "332px",
        },
    })
);

export interface Record {
    schema: string;
    table: string;
    id: string;
    name: string;
    fields: {
        name: string;
        type: string;
        value: boolean | number | string;
    }[];
    outgoing: {
        field: string;
        schema: string;
        table: string;
        id: string;
        name: string;
    }[];
    incoming: {
        schema: string;
        table: string;
        field: string;
        refs: {
            id: string;
            name: string;
        }[];
    }[];
}

export interface RecordViewProps {
    record: Record;
}

const RecordView = (props: RecordViewProps): React.ReactElement => {
    const classes = useStyles();

    return (
        <Grid container direction="row" wrap="nowrap" className={`${classes.stretch_horizontally} ${classes.root}`}>
            <Grid item xs={3} container direction="column" wrap="nowrap">
                <Spacing />
                {props.record?.incoming.map((r, i) => (
                    <IncomingReferences key={i} references={r} />
                ))}
            </Grid>
            <Grid item xs={6} container direction="column" wrap="nowrap">
                <MainRecord record={props.record} />
            </Grid>
            <Grid item xs={3} container direction="column" wrap="nowrap">
                <Spacing />
                {props.record?.outgoing.map((r, i) => (
                    <OutgoingReference key={i} reference={r} />
                ))}
            </Grid>
        </Grid>
    );
};

export default RecordView;
