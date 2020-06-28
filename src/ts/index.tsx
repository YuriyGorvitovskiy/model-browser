import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Router from "react-router-dom";

import Viewer from "./widget/model-view";

const Root = () => {
    return (
        <Router.HashRouter>
            <Router.Switch>
                <Router.Route path="/:class_name" component={Viewer} />
                <Router.Route path="/" component={() => <h2>blank</h2>} />
            </Router.Switch>
        </Router.HashRouter>
    );
};
ReactDOM.render(<Root />, document.getElementById("rootElement"));
