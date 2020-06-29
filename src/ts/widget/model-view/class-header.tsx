import * as React from "react";
import * as MUS from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

import commonStyles from "../../styles/css";

const useStyles = MUS.makeStyles((theme: MUS.Theme) =>
    MUS.createStyles({
        ...commonStyles(theme),
    })
);

interface Props {
    class: {
        name: string;
    };
}

const ModelViewerClassHeader = (props: Props): JSX.Element => {
    const classes = useStyles();
    return (
        <Box className={classes.stretch_horizontally + " " + classes.fill_info + " " + classes.center}>
            <Typography variant="h3">{props.class.name}</Typography>
        </Box>
    );
};

export default ModelViewerClassHeader;
