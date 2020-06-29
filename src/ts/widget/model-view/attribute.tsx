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
        value: {
            padding: theme.spacing(1),
            textAlign: "right",
            verticalAlign: "middle",
        },
    })
);

interface Params {
    attr: {
        name: string;
        type: string;
    };
}

const ModelViewerAttribute = (params: Params): JSX.Element => {
    const classes = useStyles();

    return (
        <Grid item container direction="row" wrap="nowrap">
            <Grid item xs={6}>
                <Typography className={classes.attribute} variant="body1">
                    {params.attr.name}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <Typography className={classes.value} variant="body1">
                    {params.attr.type}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default ModelViewerAttribute;
