import React from "react";
import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layouts/RootLayout.jsx";
import HomePage from "../pages/HomePage.jsx";
import ArtisansPage from "../pages/ArtisansPage.jsx";
import ArtisanDetailPage from "../pages/ArtisanDetailPage.jsx";
import LegalPage from "../pages/LegalPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <NotFoundPage />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "artisans", element: <ArtisansPage /> },
            { path: "artisans/:id", element: <ArtisanDetailPage /> },
            { path: "legal", element: <LegalPage /> },
        ],
    },
]);
