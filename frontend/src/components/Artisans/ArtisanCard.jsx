import RatingStars from "./RatingStars";
import { Link } from "react-router-dom";

export default function ArtisanCard({ artisan }) {
    const id = artisan.id_artisan;
    const name = artisan.nom;
    const city = artisan.ville;
    const specialityLabel = artisan.Specialite?.label ?? "—";
    // const favori = artisan.is_favori ? "Au top" : "";

    return (
        <Link to ={`/artisans/${id}`} className="text-decoration-none" aria-label={`Voir la fiche de ${artisan?.nom ?? "cet artisan"}`}>
        <article className="tta-card p-3">
            <h3 className="h6 mb-2 tta-card__name">{name}</h3>

            <div className="mb-2">
                <RatingStars value={artisan.note} />
            </div>

            <div className="text-center">
                <div>{specialityLabel}</div>
                <div>{city}</div>
            </div>
        </article>
        </Link>
    );
}
