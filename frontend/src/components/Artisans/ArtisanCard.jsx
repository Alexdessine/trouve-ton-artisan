// Import du composant d'affichage des étoiles de notation
// Ce composant est utilisé pour afficher la note de l'artisan sous forme d'étoiles
import RatingStars from "./RatingStars";

// import du composant Link de react-router-dom pour la navigation entre les pages
import { Link } from "react-router-dom";

// Composant fonctionnel ArtisanCard qui prend en prop un objet artisan
export default function ArtisanCard({ artisan }) {

    // Extraction des propriétés nécessaires de l'objet artisan
    const id = artisan.id_artisan;
    const name = artisan.nom;
    const city = artisan.ville;

    // récupération du label de la spécialité de l'artisan, avec une valeur par défaut "—" si non défini
    const specialityLabel = artisan.Specialite?.label ?? "—";

    return (
        // Le composant Link permet de naviguer vers la page de détail de l'artisan lorsqu'on clique sur la carte
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
