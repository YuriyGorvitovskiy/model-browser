import * as React from "react";
import * as Router from "react-router-dom";
import * as MUS from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Reference from "./reference";

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
    reference: {
        field: string;
        schema: string;
        table: string;
        id: string;
        name: string;
    };
}

const ModelViewerClassRelations = (props: Props): JSX.Element => {
    const classes = useStyles();
    return (
        <Grid item container direction="row" wrap="nowrap" className={classes.relation_class}>
            <Grid item xs={5} container direction="column" wrap="nowrap">
                <Reference name={props.reference?.field} />
            </Grid>
            <Grid item xs={7}>
                <Card className={classes.stretch_both + " " + classes.center} variant="outlined">
                    {props.reference.id ? (
                        <Router.Link
                            to={`/record/${props.reference.schema}/${props.reference.table}/${props.reference.id}`}
                        >
                            <Typography component="h6" variant="h6">
                                {props.reference.name || "<blank>"}
                            </Typography>
                        </Router.Link>
                    ) : (
                        <div>&nbsp;</div>
                    )}
                </Card>
            </Grid>
        </Grid>
    );
};

export default ModelViewerClassRelations;
