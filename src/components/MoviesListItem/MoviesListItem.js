import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import getTMDBImgSrc from "../../utils/getTMDBImgSrc";
import styles from "./MoviesListItem.module.scss";
import styled from "styled-components";
import { useProfile } from "../../contexts/profile.context";

const Button = styled.button`
  padding: 8px 12px;
  margin-top: 10px; // Adjust as needed
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function MoviesListItem({ movie }) {
  const { isLoggedIn } = useAuth();
  const { likedMovies, addLikedMovie, removeLikedMovie } = useProfile(); // Use UserProfileContext for profile data

  const isLiked = likedMovies.some((likedMovie) => likedMovie.id === movie?.id);

  const toggleLike = () => {
    if (isLiked) {
      removeLikedMovie(movie);
    } else {
      addLikedMovie(movie);
    }
  };

  return (
    <div className={styles.wrapper}>
      <Link to={`/movies/${movie.id}`}>
        <img src={getTMDBImgSrc(movie.backdrop_path)} alt={movie.title} />
        <h2>{movie.title}</h2>
      </Link>

      {isLoggedIn && (
        <Button onClick={toggleLike}>
          {isLiked ? "Dislike" : "Like"} {/* Toggle button text */}
        </Button>
      )}
    </div>
  );
}

export default MoviesListItem;
