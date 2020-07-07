import * as React from "react";
import * as Router from "react-router-dom";
import * as MUS from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Relation from "./relation";

import commonStyles from "../../styles/css";

const useStyles = MUS.makeStyles((theme: MUS.Theme) =>
    MUS.createStyles({
        ...commonStyles(theme),
        relation_class: {
            paddingBottom: theme.spacing(2),
        },
    })
);

interface Props {
    dir: "incoming" | "outgoing";
    class: {
        name: string;
        rels: {
            name: string;
        }[];
    };
}

const ModelViewerClassRelations = (props: Props): JSX.Element => {
    const classes = useStyles();

    const classBox = (
        <Grid item xs={6}>
            <Card className={classes.stretch_both + " " + classes.center} variant="outlined">
                <Router.Link to={"/model/" + props.class.name}>
                    <Typography variant="h6">{props.class.name}</Typography>
                </Router.Link>
            </Card>
        </Grid>
    );

    return (
        <Grid item container direction="row" wrap="nowrap" className={classes.relation_class}>
            {"incoming" === props.dir ? classBox : null}
            <Grid item xs={6} container direction="column" wrap="nowrap">
                {props.class.rels.map((r, j) => (
                    <Relation key={j} rel={r} />
                ))}
            </Grid>
            {"outgoing" === props.dir ? classBox : null}
        </Grid>
    );
};

export default ModelViewerClassRelations;
