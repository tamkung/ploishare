import React from "react";

import IndexUser from "../page/IndexUser";
import NotFound from "../page/PageNotFound";
import Booking from "../page/Booking";
import BookingDetail from "../page/BookingDetail";
import BookingList from "../page/BookingList";

export const RouteUser = [
    {
        path: "*",
        element: <NotFound />,
    },
    {
        path: "/",
        element: <IndexUser />,
    },
    {
        path: "/home",
        element: <IndexUser />,
    },
    {
        path: "/booking",
        element: <Booking />,
    },
    {
        path: "/booking-detail",
        element: <BookingDetail />,
    },
    {
        path: "/booking-list",
        element: <BookingList />,
    },
];
