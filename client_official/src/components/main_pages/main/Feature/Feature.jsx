import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./Feature.scss";
import { Button, OutlineButton } from "../../../button/Button";
import React, { useState, useRef, useContext } from "react";
import { Close } from "@material-ui/icons";
import "./Modal.scss";
import { GlobalState } from "../../../../GlobalState";
import { Link } from "react-router-dom";

// function OnScroll() {
//   let offset = window.pageYOffset;
//   document.getElementById("bigImg").style.backgroundPositionY =
//     offset * 0.2 + "px";
// }
// window.onscroll = () => {
//   OnScroll();
// };

export default function Featured({
  type,
  trailer,
  bigImg,
  titleImg,
  desc,
  smallImg,
  watch,
}) {
  const [active, setActive] = useState(false);
  const state = useContext(GlobalState);
  const [genre, setGenre] = state.moviesAPI.genre;
  const [genres] = state.genresAPI.genres;
  const iframeRef = useRef(null);

  const closeModal = () => {
    iframeRef.current.setAttribute("src", "");
    setActive(!active);
  };

  const openModal = () => {
    iframeRef.current.setAttribute("src", trailer);
    setActive(!active);
  };

  const handleGenre = (e) => {
    setGenre(e.target.value);
  };

  return (
    <div className="featured" id="Feature">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre" onChange={handleGenre}>
            <option value="">All Movies</option>
            {genres.map((genre) => (
              <option
                className="option"
                value={"allGenres=" + genre._id}
                key={genre._id}
              >
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      )}
      <img alt="" className="big_img" id="bigImg" src={bigImg} />
      <div className="titleImg">
        <img alt="" src={titleImg} />
      </div>
      {/* <div className="poster_card">
        <img className="small_img" src={smallImg} alt="" />
      </div> */}
      <div className="info">
        <span className="desc">{desc}</span>
        <div className="buttons">
          <Link to={watch ? watch : "#"}>
            <Button>
              <PlayArrow className="play" color="primary" />
              Play
            </Button>
          </Link>
          <OutlineButton onClick={openModal}>
            <InfoOutlined />
            Watch trailer
          </OutlineButton>
        </div>
      </div>
      <div className={`modal ${active ? "active" : ""}`} onClick={closeModal}>
        <div className="modal__content">
          <iframe
            autoPlay
            ref={iframeRef}
            width="1006"
            height="543"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoPlay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <div className="modal__content__close" onClick={closeModal}>
            <Close />
          </div>
        </div>
      </div>
      <div className="AgeRec">
        <span>13+</span>
      </div>
    </div>
  );
}
