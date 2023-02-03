import React from "react";

import IndexAdmin from "../components/admin/IndexAdmin";
import NotFound from "../page/PageNotFound";
import AddCar from "../components/admin/AddCar";
import ContentCar from "../components/admin/ContentCar";
import ContentBooking from "../components/admin/ContentBooking";
import UploadImg from "../components/upload";

export const RouteAdmin = [
    {
        path: "*",
        element: <NotFound />,
    },
    {
        path: "/",
        element: <IndexAdmin />,
    },
    {
        path: "/addcar",
        element: <AddCar />,
    },
    {
        path: "/listcar",
        element: <ContentCar />,
    },
    {
        path: "/listbooking",
        element: <ContentBooking />,
    },
    {
        path: "/upload",
        element: <UploadImg />,
    },
];
