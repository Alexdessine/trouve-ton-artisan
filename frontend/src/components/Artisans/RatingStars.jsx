// Composant fonctionnel RatingStars qui prend en prop une valeur numérique "value"
export default function RatingStars({ value }) {

    // Conversion de la valeur en nombre et gestion des cas non valides
    const rating = value === null || value === undefined ? null : Number(value);
    const safe = Number.isFinite(rating) ? rating : null;

    // Calcul du nombre d'étoiles pleines et vides à afficher
    const full = safe !== null ? Math.round(safe) : 0;
    const empty = 5 - full;

    // Rendu du composant avec les étoiles et la note
    return (
        <div className="tta-stars" aria-label={safe !== null ? `Note ${safe}/5` : "Note indisponible"}>
            {safe !== null && <span className="">{safe.toFixed(1)}</span>}
            {"★".repeat(full)}
            {"☆".repeat(empty)}
        </div>
    );
}
