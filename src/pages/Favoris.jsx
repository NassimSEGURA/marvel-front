import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";
import CharacterCard from "../components/CharacterCard";
import ComicCard from "../components/ComicCard";

const Favoris = () => {
  const [characterResults, setCharacterResults] = useState([]);
  const [comicResults, setComicResults] = useState([]);

  const isCharacterFavorite = (characterId) => {
    return characterIds.includes(characterId);
  };

  const isComicFavorite = (comicId) => {
    return comicIds.includes(comicId);
  };

  const characterIds =
    Cookies.get("characterIds")
      ?.split(",")
      .filter((id) => id) || [];
  const comicIds =
    Cookies.get("comicIds")
      ?.split(",")
      .filter((id) => id) || [];

  useEffect(() => {
    const fetchCharacterData = async () => {
      // Vérifiez d'abord si characterIds est vide
      if (characterIds.length === 0) {
        return;
      }

      try {
        const characterPromises = characterIds.map(async (characterId) => {
          const response = await axios.get(
            `https://site--marvelbackend--wspsyg9lcnvt.code.run/character/${characterId}`
          );
          return response.data;
        });

        const characterResults = await Promise.all(characterPromises);
        setCharacterResults(characterResults);
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des personnages :",
          error
        );
      }
    };

    const fetchComicData = async () => {
      // Vérifiez d'abord si comicIds est vide
      if (comicIds.length === 0) {
        return;
      }

      try {
        const comicPromises = comicIds.map(async (comicId) => {
          const response = await axios.get(
            `https://site--marvelbackend--wspsyg9lcnvt.code.run/comic/${comicId}`
          );
          return response.data;
        });

        const comicResults = await Promise.all(comicPromises);
        setComicResults(comicResults);
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des comics :",
          error
        );
      }
    };

    fetchCharacterData();
    fetchComicData();
  }, [characterIds, comicIds]);

  return (
    <>
      <Navbar />
      <div className="favorisBody">
        <h1>Page Favoris</h1>

        <div className="character-favorites">
          <h2>Personnages Favoris</h2>
          <div className="character-cards">
            {characterResults.map((character) => (
              <CharacterCard
                key={character._id}
                character={character}
                isFavorite={isCharacterFavorite(character._id)}
              />
            ))}
          </div>
        </div>

        <div className="comic-favorites">
          <h2>Comics Favoris</h2>
          <div className="comics-cards">
            {comicResults.map((comic) => (
              <ComicCard
                key={comic._id}
                comic={comic}
                isFavorite={isComicFavorite(comic._id)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favoris;
