export default function RatingStars({ value }) {
    const rating = value === null || value === undefined ? null : Number(value);
    const safe = Number.isFinite(rating) ? rating : null;

    const full = safe !== null ? Math.round(safe) : 0;
    const empty = 5 - full;

    return (
        <div className="tta-stars" aria-label={safe !== null ? `Note ${safe}/5` : "Note indisponible"}>
            {"★".repeat(full)}
            {"☆".repeat(empty)}
            {safe !== null && <span className="ms-2 text-body-secondary">{safe.toFixed(1)}</span>}
        </div>
    );
}
