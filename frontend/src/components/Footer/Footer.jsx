import React from "react";
import { Link } from "react-router-dom";
import logoFooter from "../../assets/img/logo_footer.png";

export default function Footer() {
    return (
        <footer>
            <div className="footerSections">
                <div className="footerItem">
                    <div className="footerLogo">
                        <Link to="/" aria-label="Aller à l’accueil">
                            <img src={logoFooter} alt="Logo Trouve ton artisan" className="logo_footer" />
                        </Link>
                    </div>
                    <div className="footerSocials">
                        <div className="footerAddress">
                            <p>Lyon</p>
                            <address>
                                <a href="https://www.google.fr/maps/place/101+Cr+Charlemagne,+69002+Lyon/@45.7387127,4.8203878,16z/data=!3m1!4b1!4m6!3m5!1s0x47f4ecfb42ffac87:0x949daf5720a56c30!8m2!3d45.7389557!4d4.8206121!16s%2Fg%2F11c3q36h3v?entry=ttu&g_ep=EgoyMDI2MDEyMC4wIKXMDSoKLDEwMDc5MjA2N0gBUAM%3D" target="_blank" rel="noopener noreferrer">
                                    101, cours Charlemagne<br />
                                    CR 20033<br />
                                    69269 LYON CEDEX 02<br />
                                    France<br />
                                </a>
                                <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a><br />
                            </address>
                        </div>
                        <div className="footerLegal">
                            <div className="links">
                                <div className="linksTop">
                                    <Link to="/legal">Mentions légales</Link>
                                    <Link to="/legal">Données personnelles</Link>
                                </div>
                                <div className="linksBottom">
                                    <Link to="/accessibility">Accessibilité</Link>
                                    <Link to="/confidentiality">Cookies</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </footer>
    );
}
