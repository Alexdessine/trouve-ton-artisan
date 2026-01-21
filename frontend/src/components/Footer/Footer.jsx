import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid #ddd" }}>
            <small>© {year} Trouve ton artisan</small>
            {" · "}
            <Link to="/legal">Mentions légales</Link>
        </footer>
    );
}
