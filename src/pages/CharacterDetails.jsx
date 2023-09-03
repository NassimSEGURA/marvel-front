import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const CharacterDetailsPage = () => {
  const { characterId } = useParams();
  const [characterDetails, setCharacterDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [comicTitles, setComicTitles] = useState([]); // Tableau pour stocker les titres des comics

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await axios.get(
          `https://site--marvelbackend--wspsyg9lcnvt.code.run/character/${characterId}`
        );
        const data = response.data;

        // Extraction des IDs des comics
        const comicIds = data.comics.filter((comicId) => comicId !== null);

        // Récupération des titres des comics
        const comicTitles = await Promise.all(
          comicIds.map(async (comicId) => {
            const comicResponse = await axios.get(
              `https://site--marvelbackend--wspsyg9lcnvt.code.run/comic/${comicId}`
            );
            return comicResponse.data.title;
          })
        );

        // Stockage des titres des comics
        setComicTitles(comicTitles);

        // Stockage des détails du personnage
        setCharacterDetails(data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des détails du personnage :",
          error
        );
        setLoading(false);
      }
    };

    fetchCharacterDetails();
  }, [characterId]);

  return (
    <div>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <>
          <Navbar />
          <div className="character-details">
            <div className="character-name-container">
              <h1 className="character-name">{characterDetails.name}</h1>
            </div>
            <div className="character-info">
              <div className="character-image">
                <img
                  src={
                    characterDetails.thumbnail &&
                    characterDetails.thumbnail.path
                      ? `${characterDetails.thumbnail.path}.${characterDetails.thumbnail.extension}`
                      : "URL_PAR_DEFAUT_SI_PATH_NEST_PAS_DEFINI"
                  }
                  alt={characterDetails.name}
                />
              </div>
              <div className="right-character-details-card-wrapper">
                <div className="character-description">
                  <p> {characterDetails.description}</p>
                </div>
                <div className="comics-list">
                  <h2>Ce personnage apparait dans les comics suivants :</h2>
                  <ul>
                    {comicTitles.map((comicTitle, index) => (
                      <li key={index}>
                        <Link to={`/comic/${characterDetails.comics[index]}`}>
                          {comicTitle}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CharacterDetailsPage;
