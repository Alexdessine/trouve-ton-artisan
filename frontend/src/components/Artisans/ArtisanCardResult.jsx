import RatingStars from "./RatingStars";
import profil from "../../assets/img/user.svg";
import { Link } from "react-router-dom";

export default function ArtisanCardResult({ artisan }) {
    const id = artisan.id_artisan;
    const name = artisan.nom;
    const city = artisan.ville;
    const specialityLabel = artisan.Specialite?.label ?? "—";

    return (
        <Link to ={`/artisans/${id}`} className="text-decoration-none" aria-label={`Voir la fiche de ${artisan?.nom ?? "cet artisan"}`}>
        <article className="tta-card-result p-3">
            <div className="profil">
                <img src={profil} alt="Profil" className="me-2" width="120px" height="120px"/>

                <div className="mb-2">
                    <RatingStars value={artisan.note} />
                </div>
            </div>

            <div className="details">
                <h3 className="h6 mb-2 tta-card__name"><span><i className="fa-solid fa-user"></i></span> {name}</h3>
                <div><span><i className="fa-solid fa-briefcase"></i></span> {specialityLabel}</div>
                <div><span><i className="fa-solid fa-location-dot"></i></span> {city}</div>
            </div>
        </article>
        </Link>
    );
}