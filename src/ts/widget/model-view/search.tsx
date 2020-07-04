import * as React from "react";

import * as MUS from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

import commonStyles from "../../styles/css";
import { typography } from "material-ui/styles";

const useStyles = MUS.makeStyles((theme: MUS.Theme) =>
    MUS.createStyles({
        ...commonStyles(theme),
        buble: {
            position: "absolute",
            top: theme.spacing(2),
            right: theme.spacing(2),
        },
        name: {
            margin: theme.spacing(1),
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
interface Props {
    names: string[];
    selected: string;
    onSelect: (name: string) => void;
}
const ModelViewerSearch = (props: Props): JSX.Element => {
    const classes = useStyles();
    const [showSearch, setShowSearch] = React.useState(false);
    const [filter, setFilter] = React.useState("");

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
                <InputBase
                    className={classes.input + " " + classes.stretch_horizontally}
                    onChange={(ev) => setFilter(ev.target.value)}
                    placeholder="Search"
                    value={filter}
                />
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
            <Box className={classes.stretch_vertically}>
                <Grid container direction="column" wrap="nowrap" className={classes.scrollable}>
                    {props.names
                        .filter((n) => !filter || n.indexOf(filter) >= 0)
                        .map((n, i) => (
                            <Grid
                                className={`${classes.stretch_horizontally} ${
                                    n === props.selected ? classes.fill_info : ""
                                }`}
                                item
                                key={i}
                                onClick={(ev) => {
                                    ev.preventDefault();
                                    props.onSelect(n);
                                }}
                            >
                                <Typography className={classes.name}>{n}</Typography>
                                <Divider />
                            </Grid>
                        ))}
                </Grid>
            </Box>
        </Card>
    );
};

export default ModelViewerSearch;
