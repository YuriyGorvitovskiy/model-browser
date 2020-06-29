import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Router from "react-router-dom";

import Viewer from "./mapper/model-view";

const Root = () => {
    return (
        <Router.HashRouter>
            <Router.Switch>
                <Router.Route path="/:class_name" component={Viewer} />
                <Router.Route path="/">
                    <Router.Redirect to="/jexkg" />
                </Router.Route>
            </Router.Switch>
        </Router.HashRouter>
    );
};
ReactDOM.render(<Root />, document.getElementById("rootElement"));
