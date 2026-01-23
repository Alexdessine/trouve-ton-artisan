import ArtisanCard from "../Artisans/ArtisanCard";

export default function ArtisansCarousel({ title = "Artisans", artisans }) {
    const favoris = artisans.filter((a) => a.is_favori === true);

    // ID stable pour le carousel (si tu as plusieurs carousels, il faut un id unique)
    const carouselId = "artisansCarousel";

    if (favoris.length === 0) return null;

    return (
        <section className="Top">
            <div className="separation"></div>
            <h2 className="topArtisan">{title}</h2>

            <div
                id={carouselId}
                className="carousel slide"
                data-bs-ride="carousel"
                aria-label={title}
            >
                {/* Indicators */}
                <div className="carousel-indicators">
                    {favoris.map((_, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target={`#${carouselId}`}
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : undefined}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Slides */}
                <div className="carousel-inner">
                    {favoris.map((a, index) => (
                        <div
                            key={a.id_artisan}
                            className={`carousel-item ${index === 0 ? "active" : ""}`}
                        >
                            {/* On garde ArtisanCard : aspect inchangé */}
                            <div className="d-flex justify-content-center py-2">
                                <ArtisanCard artisan={a} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Controls */}
                {favoris.length > 1 && (
                    <>
                        <button
                            className="carousel-control-prev"
                            type="button"
                            data-bs-target={`#${carouselId}`}
                            data-bs-slide="prev"
                            aria-label="Précédent"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Précédent</span>
                        </button>

                        <button
                            className="carousel-control-next"
                            type="button"
                            data-bs-target={`#${carouselId}`}
                            data-bs-slide="next"
                            aria-label="Suivant"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Suivant</span>
                        </button>
                    </>
                )}
            </div>
            <div className="tta-carousel" aria-label={title}> {artisans.filter((a) => a.is_favori === true).map((a) => (<div className="tta-carousel__item" key={a.id_artisan}> <ArtisanCard artisan={a} /> </div>))} </div>
        </section>
    );
}
