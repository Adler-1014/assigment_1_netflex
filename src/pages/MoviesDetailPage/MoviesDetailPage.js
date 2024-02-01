import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import getTMDBImgSrc from "../../utils/getTMDBImgSrc";
import styles from "./MoviesDetailPage.module.scss";
import { useAuth } from "../../contexts/auth.context";
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

function MoviesDetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { likedMovies, addLikedMovie, removeLikedMovie } = useProfile(); // Use UserProfileContext for profile data
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    api.movies.getMovie(movieId).then((movie) => setMovie(movie));
  }, [movieId]);

  const isLiked = likedMovies.some((likedMovie) => likedMovie.id === movie?.id);

  const toggleLike = () => {
    if (isLiked) {
      removeLikedMovie(movie);
    } else {
      addLikedMovie(movie);
    }
  };

  if (movie === null) return null;

  return (
    <div className={styles.wrapper}>
      <section className={styles.mainInfo}>
        <img
          className={styles.posterImg}
          src={getTMDBImgSrc(movie.poster_path)}
          alt={movie.title}
        />

        <div className={styles.mainInfoRight}>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.overview}>{movie.overview}</p>

          <ul className={styles.genres}>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
          <strong>{movie.vote_average}</strong>

          {isLoggedIn && (
            <Button onClick={toggleLike}>
              {isLiked ? "Dislike" : "Like"} {/* Toggle button text */}
            </Button>
          )} 
        </div>
      </section>

      <section>
        <img src={getTMDBImgSrc(movie.backdrop_path)} alt={movie.title} />
      </section>
    </div>
  );
}

export default MoviesDetailPage;
