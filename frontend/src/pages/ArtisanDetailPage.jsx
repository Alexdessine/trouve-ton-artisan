import React from "react";
import { useParams } from 'react-router-dom';

export default function ArtisansDetailsPage() {
    const { id } = useParams();
    return <h1>Détails de l'artisan avec l'ID : {id}</h1>;
}