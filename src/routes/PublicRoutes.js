import React from "react";

import Home from "../page/Home";
import NotFound from "../page/PageNotFound";
import Vertify from "../components/Vertify";
import ConfirmSuccess from "../page/ConfirmSuccess";

export const RoutePublic = [
    {
        path: "*",
        element: <NotFound />,
    },
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/vertify",
        element: <Vertify />,
    },
    {
        path: "/confirm/:email",
        element: <ConfirmSuccess />,
    },
];
