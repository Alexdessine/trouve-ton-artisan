import React, { useEffect, useState} from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import {fetchCategories} from "../../services/api";

/**
 * Header (structure)
 * - logo -> /
 * - Menu catégories
 * - Recherche
 */
export default function Header() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories()
            .then(setCategories)
            .catch(() => setCategories([]));
    }, []);


    return (
        <header>
            <nav style={{ display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #ddd" }}>
                <Link to="/" aria-label="Aller à l’accueil">
                    <img src={logo} alt="Logo Trouve ton artisan" style={{ height: 50, display: "block" }} />
                </Link>

                {categories.map((cat) => (
                    <NavLink key={cat.id} to={`/${cat.slug}`}>
                        {cat.label}
                    </NavLink>
                ))}
            </nav>
        </header>
    );

    

}