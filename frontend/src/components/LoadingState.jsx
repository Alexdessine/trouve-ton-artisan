export default function LoadingState({ message = "Chargement en cours..." }) {
    return (
        <div className="py-4 text-center">
            <div className="spinner-border" role="status" aria-label="Chargement"/>
            <p className="mt-2 mb-0">{message}</p>
        </div>
    );
}