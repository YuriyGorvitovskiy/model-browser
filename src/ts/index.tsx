import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Router from "react-router-dom";

import ModelViewer from "./mapper/model-view";
import RecordViewer from "./mapper/record-view";

const Root = () => {
    return (
        <Router.HashRouter>
            <Router.Switch>
                <Router.Route path="/record/:schema/:table/:id">
                    <RecordViewer />
                </Router.Route>
                <Router.Route path="/model/:class_name">
                    <ModelViewer />
                </Router.Route>
                <Router.Route path="">
                    <Router.Redirect to="/model/class" />
                </Router.Route>
            </Router.Switch>
        </Router.HashRouter>
    );
};
ReactDOM.render(<Root />, document.getElementById("rootElement"));
