import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <div>
            <header>
                <nav style={{ display: "flex", gap: 12 }}>
                    <NavLink to="/">Accueil</NavLink>
                    <NavLink to="/artisans">Artisans</NavLink>
                    <NavLink to="/legal">Mentions légales</NavLink>
                </nav>
            </header>

            <main style={{ paddingTop: 16 }}>
                <Outlet />
            </main>
        </div>
    );
}
