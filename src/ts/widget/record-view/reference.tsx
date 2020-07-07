import * as React from "react";
import * as MUS from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import commonStyles from "../../styles/css";

const useStyles = MUS.makeStyles((theme: MUS.Theme) =>
    MUS.createStyles({
        ...commonStyles(theme),
        reference_name: {
            paddingRight: theme.spacing(2),
            textAlign: "right",
            verticalAlign: "middle",
        },
        reference_arrow: {
            position: "relative",
            textAlign: "right",
            top: "-8px",
        },
    })
);

interface Params {
    name: string;
}

const RecordViewReference = (params: Params): JSX.Element => {
    const classes = useStyles();

    return (
        <Grid item>
            <Typography variant="body1" className={classes.reference_name}>
                {params.name}
            </Typography>
            <Divider className={classes.stretch_horizontally} />
            <div className={classes.reference_arrow}>
                <img src="arrow.png" />
            </div>
        </Grid>
    );
};

export default RecordViewReference;
