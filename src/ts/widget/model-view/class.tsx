import * as React from "react";
import * as MUS from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

import Attribute from "./attribute";
import ClassHeader from "./class-header";

import commonStyles from "../../styles/css";

const useStyles = MUS.makeStyles((theme: MUS.Theme) =>
    MUS.createStyles({
        ...commonStyles(theme),
    })
);

interface Props {
    class: {
        name: string;
        attrs: {
            name: string;
            type: string;
        }[];
    };
}

const ModelViewerClass = (props: Props): JSX.Element => {
    const classes = useStyles();
    return (
        <Card className={classes.stretch_both} variant="outlined">
            <ClassHeader class={props.class} />
            <Divider />
            <Grid container direction="column" wrap="nowrap">
                {props.class.attrs.flatMap((a, i) => [<Attribute key={"a" + i} attr={a} />, <Divider key={"d" + i} />])}
            </Grid>
        </Card>
    );
};

export default ModelViewerClass;
