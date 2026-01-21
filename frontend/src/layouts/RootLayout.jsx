import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";

export default function RootLayout() {
    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Header />

            <main style={{ paddingTop: 16, flex: 1 }}>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
