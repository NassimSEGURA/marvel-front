import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

const ComicDetails = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComic = async () => {
      try {
        const response = await axios.get(
          `https://site--marvelbackend--wspsyg9lcnvt.code.run/comic/${comicId}`
        );
        setComic(response.data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération du comic :",
          error
        );
        setLoading(false);
      }
    };

    fetchComic();
  }, [comicId]);

  return (
    <>
      <Navbar />
      <div className="comic-details">
        {loading ? (
          <p>Chargement en cours...</p>
        ) : comic ? (
          <>
            <h2>{comic.title}</h2>
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
            <p>
              Description:{" "}
              {comic.description || "Pas de description disponible."}
            </p>
            {/* Ajoutez d'autres détails du comic selon votre besoin */}
          </>
        ) : (
          <p>Comic introuvable.</p>
        )}
      </div>
    </>
  );
};

export default ComicDetails;
