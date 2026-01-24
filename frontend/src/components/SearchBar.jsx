export default function SearchBar({ value, onChange, placeholder = "Rechercher un artisan..." }) {
    return (
        <div className="mb-3">
            <label className="form-label visually-hidden" htmlFor="search-artisans">
                Recherche
            </label>
            <input
                id="search-artisans"
                className="form-control"
                type="search"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                autoComplete="off"
            />
        </div>
    )
}