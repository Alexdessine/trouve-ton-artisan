import React from "react";
import { Link, useRouteError } from "react-router-dom";

export default function NotFoundPage() {
    useRouteError(); // optionnel
    return (
        <div>
            <h1>404 — Page introuvable</h1>
            <Link to="/">Retour à l’accueil</Link>
        </div>
    );
}
