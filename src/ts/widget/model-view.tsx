import * as React from "react";
import { useHistory } from "react-router-dom";

import * as MUS from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import MainClass from "./model-view/class";
import ClassRelations from "./model-view/class-relations";
import Spacing from "./model-view/class-header-spacing";
import Search from "./model-view/search";

import commonStyles from "../styles/css";
import useLocalStorage from "./use-local-storage";

const useStyles = MUS.makeStyles((theme: MUS.Theme) =>
    MUS.createStyles({
        ...commonStyles(theme),
        root: {
            padding: theme.spacing(2),
        },
        search_expand: {
            paddingRight: "332px",
        },
    })
);

export interface ClassInfo {
    name: string;

    attrs: {
        name: string;
        type: string;
    }[];

    incoming: {
        name: string;
        rels: {
            name: string;
        }[];
    }[];

    outgoing: {
        name: string;
        rels: {
            name: string;
        }[];
    }[];
}

export interface ModelViewProps {
    classes: string[];
    class: ClassInfo;
    classRoute: (className: string) => string;
}

const ModelViewer = (props: ModelViewProps): JSX.Element => {
    const history = useHistory();
    const classes = useStyles();
    const [search, setSearch] = useLocalStorage("model-view.expand-search", false);

    return (
        <Grid
            container
            direction="row"
            wrap="nowrap"
            className={`${classes.stretch_horizontally} ${classes.root} ${search ? classes.search_expand : ""}`}
        >
            <Grid item xs={4} container direction="column" wrap="nowrap">
                <Spacing />
                {props.class.incoming.map((s, i) => (
                    <ClassRelations key={i} dir="incoming" class={s} />
                ))}
            </Grid>
            <Grid item xs={4} container direction="column" wrap="nowrap">
                <MainClass class={props.class} />
            </Grid>
            <Grid item xs={4} container direction="column" wrap="nowrap">
                <Spacing />
                {props.class.outgoing.map((t, i) => (
                    <ClassRelations key={i} dir="outgoing" class={t} />
                ))}
            </Grid>
            <Search
                names={props.classes}
                onSelect={(c) => history.push(props.classRoute(c))}
                selected={props.class.name}
                expand={search}
                onExpand={setSearch}
            />
        </Grid>
    );
};

export default ModelViewer;
