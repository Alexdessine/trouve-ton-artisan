import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { fetchCategories } from "../../services/api";

export default function Header() {
    const [categories, setCategories] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories().then(setCategories).catch(() => setCategories([]));
    }, []);

    const openSearch = () => setIsSearchOpen((prev) => !prev);
    const openMenu = () => setIsMenuOpen((prev) => !prev);

    const handleSubmit = (e) => {
        e.preventDefault();

        const q = searchTerm.trim();
        if (!q) return;

        // navigation vers la page liste/résultats
        navigate(`/artisans?q=${encodeURIComponent(q)}`);

        // optionnel : fermer la recherche mobile après validation
        setIsSearchOpen(false);
    };

    return (
        <header>
            <nav className={`navbar ${isSearchOpen || isMenuOpen ? "active" : ""}`}>
                <div className="navTop">
                    <Link to="/" aria-label="Aller à l’accueil">
                        <img src={logo} alt="Logo Trouve ton artisan" className="logo_header" />
                    </Link>

                    <div className="navActions">
                        <div className="navItems">
                            {/* Search desktop/tablet */}
                            <form className="searchForm" role="search" onSubmit={handleSubmit}>
                                <input
                                    className="searchBar"
                                    type="search"
                                    placeholder="Rechercher un artisan"
                                    aria-label="Rechercher un artisan"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
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

            {/* Search dropdown mobile */}
            <div className={`searchSection ${isSearchOpen ? "active" : ""}`}>
                <form className="searchForm" role="search" onSubmit={handleSubmit}>
                    <input
                        className="searchBar"
                        type="search"
                        placeholder="Rechercher un artisan"
                        aria-label="Rechercher un artisan"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="searchButton" type="submit" aria-label="Lancer la recherche">
                        <i className="fa-jelly fa-regular fa-magnifying-glass"></i>
                    </button>
                </form>
            </div>
        </header>
    );
}
