import React from "react";
import { Link, useRouteError } from "react-router-dom";
import NotFound from "../../src/assets/img/404.svg";

export default function NotFoundPage() {
    useRouteError(); // optionnel
    return (
        <div>
            <img src={NotFound} alt="Page 404" />
            <Link to="/" className="p-4">Retour à l’accueil</Link>
        </div>
    );
}
