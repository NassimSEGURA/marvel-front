import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const ComicCard = ({ comic, isFavorite }) => {
  const toggleComicsId = (e, comicId) => {
    e.preventDefault();

    const comicIds = Cookies.get("comicIds") || "";
    const updatedIds = comicIds
      .split(",")
      .filter((id) => id !== comicId)
      .join(",");

    if (comicIds.includes(comicId)) {
      Cookies.set("comicIds", updatedIds, { expires: 7 });

      e.target.classList.remove("filled-red");
    } else {
      const updatedIdsWithComic = updatedIds
        ? `${updatedIds},${comicId}`
        : comicId;
      Cookies.set("comicIds", updatedIdsWithComic, { expires: 7 });

      e.target.classList.add("filled-red");
    }
  };
  return (
    <div className="comic-card-container" key={comic._id}>
      <Link to={`/comic/${comic._id}`}>
        <div className="comic-card">
          <div className="comic-card-image">
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
            />
          </div>
          <div className="comic-card-name">
            <p>{comic.title}</p>
          </div>
        </div>
      </Link>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        className={`svg-favorite-button ${isFavorite ? "filled-red" : ""}`}
        onClick={(e) => toggleComicsId(e, comic._id)}
      >
        <path d="M287.9 0c9.2 0 17.6 5.2 21.6 13.5l68.6 141.3 153.2 22.6c9 1.3 16.5 7.6 19.3 16.3s.5 18.1-5.9 24.5L433.6 328.4l26.2 155.6c1.5 9-2.2 18.1-9.6 23.5s-17.3 6-25.3 1.7l-137-73.2L151 509.1c-8.1 4.3-17.9 3.7-25.3-1.7s-11.2-14.5-9.7-23.5l26.2-155.6L31.1 218.2c-6.5-6.4-8.7-15.9-5.9-24.5s10.3-14.9 19.3-16.3l153.2-22.6L266.3 13.5C270.4 5.2 278.7 0 287.9 0zm0 79L235.4 187.2c-3.5 7.1-10.2 12.1-18.1 13.3L99 217.9 184.9 303c5.5 5.5 8.1 13.3 6.8 21L171.4 443.7l105.2-56.2c7.1-3.8 15.6-3.8 22.6 0l105.2 56.2L384.2 324.1c-1.3-7.7 1.2-15.5 6.8-21l85.9-85.1L358.6 200.5c-7.8-1.2-14.6-6.1-18.1-13.3L287.9 79z" />
        <clipPath id="svg-clip-path">
          <rect x="0" y="0" width="576" height="512" />
        </clipPath>
      </svg>
    </div>
  );
};

export default ComicCard;
