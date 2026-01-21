import { Link, useRouteError } from 'react-router-dom';

export default function NotFoundPage() {
    // Pour le debug en dev
    useRouteError();

    return (
        <div>
            <h1>404 - Page non trouvée</h1>
            <p>La page que vous recherchez n'existe pas.</p>
            <Link to="/">Retour à l'accueil</Link>
        </div>
    );
}