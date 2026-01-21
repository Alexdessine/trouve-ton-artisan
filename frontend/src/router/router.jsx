import { createBrowserRouter} from "react-router-dom";
import RootLayout from "../layouts/RootLayout";

import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RoutLayout />,
        errorElement: <NotFoundPage />,
        children: [
            {index: true, element: <HomePage />},
            {path: "artisans", element: <ArtisansPage />},
            {path: "artisan/:id", element: <ArtisansDetailsPage />},
            {path: "legal", element: <LegalPage />},
        ],
    },
]);