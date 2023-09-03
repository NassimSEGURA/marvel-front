import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import ReactPaginate from "react-paginate";
import SearchBar from "../components/SearchBar";
import ComicCard from "../components/ComicCard";
import Footer from "../components/Footer";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(
          `https://site--marvelbackend--wspsyg9lcnvt.code.run/comics?limit=20&skip=${
            (currentPage - 1) * 20
          }&title=${searchQuery}`
        );

        setComics(response.data.results);
        setTotalPages(Math.ceil(response.data.count / 20));
        setLoading(false);
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la récupération des comics :",
          error
        );
      }
    };

    fetchComics();
  }, [currentPage, searchQuery]);

  const handleSearch = (query) => {
    setCurrentPage(1);
    setSearchQuery(query);
  };

  return (
    <>
      <Navbar />
      <div className="comicsBody">
        <SearchBar onSearch={handleSearch} />
        {loading ? (
          <p>Chargement en cours...</p>
        ) : (
          <div className="comics-cards">
            {comics.map((comic) => (
              <ComicCard comic={comic} key={comic._id} />
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
      <Footer />
    </>
  );
};

export default Comics;
