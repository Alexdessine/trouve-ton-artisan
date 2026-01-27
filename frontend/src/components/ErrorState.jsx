// Composant affichant un état d'erreur avec un message personnalisable
export default function ErrorState({ message = "Une erreur est survenue." }) {
    return (
        <div className="alert alert-danger my-3" role="alert">
            {message}
        </div>
    );
}