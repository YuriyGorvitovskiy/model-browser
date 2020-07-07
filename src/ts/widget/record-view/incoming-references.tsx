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
    references: {
        schema: string;
        table: string;
        field: string;
        refs: {
            id: string;
            name: string;
        }[];
    };
}

const ModelViewerClassRelations = (props: Props): JSX.Element => {
    const classes = useStyles();

    return (
        <Grid item container direction="row" wrap="nowrap" className={classes.relation_class}>
            <Grid item xs={7}>
                <Card className={classes.stretch_both + " " + classes.center} variant="outlined">
                    <Grid container direction="column" wrap="nowrap" alignItems="center">
                        {props.references.refs.map((r, i) => (
                            <Router.Link
                                key={i}
                                to={`/record/${props.references.schema}/${props.references.table}/${r.id}`}
                            >
                                <Typography component="h6" variant="h6">
                                    {r.name || "<blank>"}
                                </Typography>
                            </Router.Link>
                        ))}
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={5} container direction="column" wrap="nowrap">
                <Reference name={props.references.field} />
            </Grid>
        </Grid>
    );
};

export default ModelViewerClassRelations;
