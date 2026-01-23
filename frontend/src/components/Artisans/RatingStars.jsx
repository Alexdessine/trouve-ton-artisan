export default function RatingStars({ value }) {
    const rating = value === null || value === undefined ? null : Number(value);
    const safe = Number.isFinite(rating) ? rating : null;

    const full = safe !== null ? Math.round(safe) : 0;
    const empty = 5 - full;

    return (
        <div className="tta-stars" aria-label={safe !== null ? `Note ${safe}/5` : "Note indisponible"}>
            {safe !== null && <span className="">{safe.toFixed(1)}</span>}
            {"★".repeat(full)}
            {"☆".repeat(empty)}
        </div>
    );
}
