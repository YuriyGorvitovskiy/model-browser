import React from "react";
import * as Router from "react-router-dom";
import * as MUS from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import commonStyles from "../../styles/css";

const useStyles = MUS.makeStyles((theme: MUS.Theme) =>
    MUS.createStyles({
        ...commonStyles(theme),
        root: {
            padding: theme.spacing(1),
        },
        link: {
            color: theme.palette.info.contrastText,
        },
    })
);

interface Props {
    record: {
        schema: string;
        table: string;
        name: string;
        id: string;
    };
}

const ModelViewerClassHeader = (props: Props): JSX.Element => {
    const classes = useStyles();
    return (
        <Grid
            item
            container
            direction="column"
            className={
                classes.stretch_horizontally + " " + classes.fill_info + " " + classes.center + " " + classes.root
            }
        >
            <Typography component="h3" variant="h3">
                {props.record?.name || "<blank>"}
            </Typography>
            <Typography component="h5" variant="h5">
                {props.record?.schema + "/"}
                {props.record ? (
                    <Router.Link className={classes.link} to={`/model/${props.record?.table}`} target="model">
                        {props.record?.table}
                    </Router.Link>
                ) : undefined}
                {"/" + props.record?.id}
            </Typography>
        </Grid>
    );
};

export default ModelViewerClassHeader;
