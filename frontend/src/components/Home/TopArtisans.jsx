import ArtisanCard from "../Artisans/ArtisanCard";

export default function TopArtisansCarousel({ artisans }) {
    return (
        <section className="container py-4">
            <div className="title-accent mb-2" />
            <h2 className="section-title mb-3">Top 3 des artisans</h2>

            <div className="tta-carousel" aria-label="Top 3 des artisans">
                {artisans.map((a) => (
                    <div className="tta-carousel__item" key={a.id_artisan}>
                        <ArtisanCard artisan={a} />
                    </div>
                ))}
            </div>
        </section>
    );
}
