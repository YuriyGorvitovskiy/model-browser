import * as React from "react";

import * as MUS from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Tooltip from "@material-ui/core/Tooltip";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

import commonStyles from "../../styles/css";

const useStyles = MUS.makeStyles((theme: MUS.Theme) =>
    MUS.createStyles({
        ...commonStyles(theme),
        buble: {
            position: "absolute",
            top: theme.spacing(2),
            right: theme.spacing(2),
        },
        panel: {
            position: "absolute",
            top: theme.spacing(2),
            right: theme.spacing(2),
            bottom: theme.spacing(2),
        },
        input: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        inputPanel: {
            alignItems: "center",
            minWidth: 300,
        },
        inputDivider: {
            height: "36px",
        },
        inputButton: {
            minWidth: 0,
        },
    })
);

const ModelViewerSearch = (): JSX.Element => {
    const classes = useStyles();
    const [showSearch, setShowSearch] = React.useState(false);

    if (!showSearch) {
        return (
            <Tooltip title="search" aria-label="search">
                <Fab
                    className={classes.buble}
                    onClick={(e) => {
                        e.preventDefault();
                        setShowSearch(true);
                    }}
                    size="small"
                >
                    <SearchIcon />
                </Fab>
            </Tooltip>
        );
    }

    return (
        <Card className={classes.panel} variant="outlined">
            <Grid
                container
                direction="row"
                wrap="nowrap"
                className={classes.inputPanel + " " + classes.stretch_horizontally}
            >
                <InputBase className={classes.input + " " + classes.stretch_horizontally} placeholder="Search" />
                <Divider orientation="vertical" className={classes.inputDivider} />
                <Button
                    variant="text"
                    className={classes.inputButton}
                    onClick={(e) => {
                        e.preventDefault();
                        setShowSearch(false);
                    }}
                >
                    <CloseIcon color="error" />
                </Button>
            </Grid>
            <Divider />
        </Card>
    );
};

export default ModelViewerSearch;
