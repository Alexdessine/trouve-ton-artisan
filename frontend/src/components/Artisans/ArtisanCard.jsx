import RatingStars from "./RatingStars";

export default function ArtisanCard({ artisan }) {
    const name = artisan.nom;
    const city = artisan.ville;
    const specialityLabel = artisan.Specialite?.label ?? "—";

    return (
        <article className="tta-card p-3 h-100">
            <h3 className="h6 mb-2 tta-card__name">{name}</h3>

            <div className="mb-2">
                <RatingStars value={artisan.note} />
            </div>

            <div className="text-center">
                <div className="fw-semibold">{specialityLabel}</div>
                <div className="text-body-secondary">{city}</div>
            </div>
        </article>
    );
}
