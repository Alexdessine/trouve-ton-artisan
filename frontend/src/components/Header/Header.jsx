import React, { useEffect, useState} from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import {fetchCategories} from "../../services/api";
export default function Header() {
    const [categories, setCategories] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        fetchCategories().then(setCategories).catch(() => setCategories([]));
    }, []);

    const openSearch = () => {
        console.log("click sur la recherche");
        setIsSearchOpen((prev) => !prev);
    };
    const openMenu = () => { 
        console.log("click sur le menu");
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <header>
            <nav className={`navbar ${isSearchOpen || isMenuOpen ? "active" : ""}`}>
                {/* LIGNE 1 (logo + search + icônes) */}
                <div className="navTop">
                    <Link to="/" aria-label="Aller à l’accueil">
                        <img src={logo} alt="Logo Trouve ton artisan" className="logo_header" />
                    </Link>

                    <div className="navActions">
                        <div className="navItems">

                        {/* Search desktop/tablet dans la nav */}
                        <form className="searchForm" role="search">
                            <input
                                className="searchBar"
                                type="search"
                                placeholder="Rechercher un artisan"
                                aria-label="Rechercher un artisan"
                            />
                            <button className="searchButton" type="submit" aria-label="Lancer la recherche">
                                <i className="fa-jelly fa-regular fa-magnifying-glass"></i>
                            </button>
                        </form>

                        {/* Icône search mobile */}
                        <i
                            className="fa-jelly fa-regular fa-magnifying-glass tablet"
                            onClick={openSearch}
                            role="button"
                            aria-label="Ouvrir la recherche"
                        ></i>

                        {/* Burger mobile */}
                        <i
                            className="fa-solid fa-bars"
                            onClick={openMenu}
                            role="button"
                            aria-label="Ouvrir le menu"
                        ></i>
                    </div>

                {/* LIGNE 2 (menu catégories sous la search en desktop) */}
                <div className={`menuCategories ${isMenuOpen ? "active" : ""}`}>
                    {categories.map((cat) => (
                        <NavLink key={cat.id_categorie} className="menu-item" to={`/${cat.slug}`}>
                            {cat.label}
                        </NavLink>
                    ))}
                </div>
                        </div>
                    </div>
            </nav>

            {/* Search dropdown mobile (si tu la veux séparée sous le header) */}
            <div className={`searchSection ${isSearchOpen ? "active" : ""}`}>
                <form className="searchForm" role="search">
                    <input
                        className="searchBar"
                        type="search"
                        placeholder="Rechercher un artisan"
                        aria-label="Rechercher un artisan"
                    />
                    <button className="searchButton" type="submit" aria-label="Lancer la recherche">
                        <i className="fa-jelly fa-regular fa-magnifying-glass"></i>
                    </button>
                </form>
            </div>
        </header>
    );
}
