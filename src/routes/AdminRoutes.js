import React from "react";

import IndexAdmin from "../components/admin/IndexAdmin";
import NotFound from "../page/PageNotFound";
import AddCar from "../components/admin/AddCar";
import ContentCar from "../components/admin/ContentCar";
import ContentBooking from "../components/admin/ContentBooking";
import ContentImage from "../components/admin/ContentImage";    
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
        path: "/home",
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
        path: "/listimage",
        element: <ContentImage />,
    },
    {
        path: "/upload",
        element: <UploadImg />,
    },
];
