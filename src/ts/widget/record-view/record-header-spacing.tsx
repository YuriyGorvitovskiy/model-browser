import * as React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const RecordViewerClassHeaderSpacing = (): JSX.Element => {
    return (
        <Grid item container direction="column">
            <Typography component="h3" variant="h3">
                &nbsp;
            </Typography>
            <Typography component="h5" variant="h5">
                &nbsp;
            </Typography>
        </Grid>
    );
};

export default RecordViewerClassHeaderSpacing;
