import * as React from "react";
import * as MUS from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import commonStyles from "../../styles/css";

const useStyles = MUS.makeStyles((theme: MUS.Theme) =>
    MUS.createStyles({
        ...commonStyles(theme),
        attribute: {
            padding: theme.spacing(1),
            textAlign: "left",
            verticalAlign: "middle",
        },
        type: {
            padding: theme.spacing(1),
            textAlign: "left",
            verticalAlign: "middle",
        },
        value: {
            padding: theme.spacing(1),
            textAlign: "left",
            verticalAlign: "middle",
        },
    })
);

interface Params {
    field: {
        name: string;
        type: string;
        value: string | number | boolean;
    };
}

const ModelViewerAttribute = (params: Params): JSX.Element => {
    const classes = useStyles();

    return (
        <Grid item container direction="row" wrap="nowrap" alignItems="flex-start">
            <Grid item xs={3}>
                <Typography className={classes.attribute} variant="body1">
                    {params.field.name}
                </Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography className={classes.type} variant="body1">
                    {params.field.type}
                </Typography>
            </Grid>
            <Grid item xs={7}>
                <Typography className={classes.value} variant="body1">
                    {"" + params.field.value}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ModelViewerAttribute;
