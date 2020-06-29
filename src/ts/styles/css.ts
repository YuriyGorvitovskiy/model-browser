import { createStyles, Theme } from "@material-ui/core/styles";

export default (theme: Theme) =>
    createStyles({
        fill_error: {
            color: theme.palette.error.contrastText,
            backgroundColor: theme.palette.error.main,
        },
        fill_info: {
            color: theme.palette.info.contrastText,
            backgroundColor: theme.palette.info.main,
        },
        fill_primary: {
            color: theme.palette.primary.contrastText,
            backgroundColor: theme.palette.primary.main,
        },
        fill_secondary: {
            color: theme.palette.secondary.contrastText,
            backgroundColor: theme.palette.secondary.main,
        },
        fill_success: {
            color: theme.palette.success.contrastText,
            backgroundColor: theme.palette.success.main,
        },
        fill_warning: {
            color: theme.palette.warning.contrastText,
            backgroundColor: theme.palette.warning.main,
        },
        nowrap: {
            minWidth: "auto",
            whiteSpace: "nowrap",
        },
        scrollable: {
            overflow: "scroll",
        },
        stretch_both: {
            boxSizing: "border-box",
            flex: 1,
            minHeight: 0,
            minWidth: 0,
            height: "100%",
            width: "100%",
        },
        stretch_horizontally: {
            boxSizing: "border-box",
            flex: 1,
            minWidth: 0,
            width: "100%",
        },
        stretch_vertically: {
            boxSizing: "border-box",
            flex: 1,
            minHeight: 0,
            height: "100%",
        },
        center: {
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
        },
    });
