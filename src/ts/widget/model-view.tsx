import * as React from "react";
import * as Router from "react-router-dom";

const ModelViewer = (): JSX.Element => {
    const { class_name } = Router.useParams();
    return <h1>I am Model Browser for {class_name}</h1>;
};

export default ModelViewer;
