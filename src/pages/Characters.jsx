import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Cookies from "js-cookie";

import CharacterCard from "../components/CharacterCard";

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          `https://site--marvelbackend--wspsyg9lcnvt.code.run/characters?limit=12&skip=${
            (currentPage - 1) * 12
          }&name=${searchQuery}`
        );

        setCharacters(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 12));
        setLoading(false);
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des personnages :",
          error
        );
      }
    };

    fetchCharacters();
  }, [currentPage, searchQuery]);

  const handleSearch = (query) => {
    setCurrentPage(1);
    setSearchQuery(query);
  };

  return (
    <>
      <Navbar />
      <div className="charactersBody">
        <SearchBar onSearch={handleSearch} />
        {loading ? (
          <p>Chargement en cours...</p>
        ) : (
          <div className="character-cards">
            {characters.map((character) => (
              <CharacterCard character={character} key={character._id} />
            ))}
          </div>
        )}
        <ReactPaginate
          previousLabel="Précédent"
          nextLabel="Suivant"
          breakLabel="..."
          pageCount={totalPages}
          marginPagesDisplayed={1}
          pageRangeDisplayed={5}
          onPageChange={(selectedPage) => {
            setCurrentPage(selectedPage.selected + 1);
          }}
          containerClassName="pagination"
          activeClassName="active"
        />
      </div>
    </>
  );
};

export default CharactersPage;
