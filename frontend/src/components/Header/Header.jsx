import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";

/**
 * Header (structure)
 * - logo -> /
 * - Menu catégories
 * - Recherche
 */
export default function Header() {
    const categories = [
        {slug: "batiment", label: "Bâtiment"},
        {slug: "services", label: "Services"},
        {slug: "fabrication", label: "Fabrication"},
        {slug: "alimentation", label: "Alimentation"},
    ];

    return (
        <header>
            <nav style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #ddd" }}>
                <Link to="/" aria-label="Aller à l’accueil">
                    <img src={logo} alt="Logo Trouve ton artisan" style={{ height: 50, display: "block" }} />
                </Link>

                {/* Menu catégories */}
                <div style={{ display: "flex", gap: 12 }}>
                    {categories.map(category => (
                        <NavLink
                            key={category.slug} to={`/${category.slug}`}>
                            {category.label}
                        </NavLink>
                    ))}
                </div>

                {/* Espace */}
                <div style={{ flex: 1 }}/>

                {/* Recherche */}
                <form role="search" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="q" style={{  marginRight: 8 }}>
                        Rechercher
                    </label>
                    <input 
                        id="q"
                        name="q"
                        type="search"
                        placeholder="Nom d'un artisan..."
                    />
                </form>
            </nav>
        </header>
    )
}