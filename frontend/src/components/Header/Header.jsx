import React, { useEffect, useRef, useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import logo330 from "../../assets/img/logo-330.webp";
import logo660 from "../../assets/img/logo-660.webp";
import logo990 from "../../assets/img/logo-990.webp";
import { fetchCategories } from "../../services/api";

// Composant Header avec navigation et recherche
export default function Header() {
    // États locaux pour les catégories, l'ouverture du menu et de la recherche
    const [categories, setCategories] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Références et hooks de navigation
    const menuRef = useRef(null);
    const burgerRef = useRef(null);
    const searchRef = useRef(null);
    const searchToggleRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    // Effets pour charger les catégories et gérer les clics en dehors des menus
    useEffect(() => {
        fetchCategories().then(setCategories).catch(() => setCategories([]));
    }, []);

    // Gestion des clics en dehors du menu
    useEffect(() => {
        if (!isMenuOpen) return;

        // Gestion des clics en dehors du menu pour le fermer
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target) &&
                burgerRef.current &&
                !burgerRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false);
            }
        };

        // Ajout et nettoyage de l'écouteur d'événements
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    // Fermeture du menu à la navigation
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    // Gestion des clics en dehors de la recherche
    useEffect(() => {
        if (!isSearchOpen) return;

        const handleClickOutsideSearch = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target) &&
                searchToggleRef.current &&
                !searchToggleRef.current.contains(event.target)
            ) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutsideSearch);
        return () => document.removeEventListener("mousedown", handleClickOutsideSearch);
    }, [isSearchOpen]);

    // Fermeture de la recherche à la navigation
    useEffect(() => {
        setIsSearchOpen(false);
    }, [location.pathname]);

    // Fonctions pour ouvrir/fermer le menu et la recherche
    const openSearch = () => {
        setIsSearchOpen((prev) => !prev);
        setIsMenuOpen(false);
    };

    // Ouvre ou ferme le menu
    const openMenu = () => {
        setIsMenuOpen((prev) => !prev);
        setIsSearchOpen(false);
    };

    // Fonction de soumission du formulaire de recherche
    const handleSubmit = (e) => {
        e.preventDefault();

        const q = searchTerm.trim();
        if (!q) return;

        // navigation vers la page liste/résultats
        navigate(`/artisans?q=${encodeURIComponent(q)}`);

        // optionnel : fermer la recherche mobile après validation
        setIsSearchOpen(false);
        
    };

    // Rendu du composant Header
    return (
        <header>
            <nav className={`navbar ${isSearchOpen || isMenuOpen ? "active" : ""}`}>
                <div className="navTop">
                    <Link to="/" aria-label="Aller à l’accueil">
                        <img 
                        src={logo330}
                        srcSet={`${logo330} 330w, ${logo660} 660w, ${logo990} 990w`} 
                        sizes="(max-width: 480px) 160px, 329px" 
                        alt="Logo Trouve ton artisan" 
                        className="logo_header" />
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
                                ref={searchToggleRef}
                                className="fa-jelly fa-regular fa-magnifying-glass tablet"
                                onClick={openSearch}
                                role="button"
                                aria-label="Ouvrir la recherche"
                            ></i>

                            {/* Burger mobile */}
                            <i
                                ref={burgerRef}
                                className="fa-solid fa-bars"
                                onClick={openMenu}
                                role="button"
                                aria-label="Ouvrir le menu"
                            ></i>
                        </div>

                        <div className={`menuCategories ${isMenuOpen ? "active" : ""}`} ref={menuRef}>
                            {categories.map((cat) => (
                                <NavLink key={cat.id_categorie} className="menu-item" to={`/${cat.slug}`} onClick={() => setIsMenuOpen(false)}>
                                    {cat.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Search dropdown mobile */}
            <div ref={searchRef} className={`searchSection ${isSearchOpen ? "active" : ""}`}>
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
