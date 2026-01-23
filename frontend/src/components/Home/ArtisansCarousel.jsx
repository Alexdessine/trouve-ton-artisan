import ArtisanCard from "../Artisans/ArtisanCard";

export default function ArtisansCarousel({ title = "Artisans", artisans }) {
    return (
        <section className="Top">
            <div className="separation"></div>
            <h2 className="topArtisan">{title}</h2>

            <div className="tta-carousel" aria-label={title}>
                {artisans.filter((a) => a.is_favori === true).map((a) => (
                    <div className="tta-carousel__item" key={a.id_artisan}>
                        <ArtisanCard artisan={a} />
                    </div>
                ))}
            </div>
        </section>
    );
}
