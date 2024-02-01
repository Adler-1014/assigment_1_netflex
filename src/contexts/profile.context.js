// userProfile.context.js
import React, { createContext, useState, useContext } from "react";

const UserProfileContext = createContext({
  nickname: "",
  likedMovies: [],
  setNickname: (newNickname) => {},
  addLikedMovie: () => {},
  removeLikedMovie: () => {},
});

export const UserProfileProvider = ({ children }) => {
  const [nickname, setNickname] = useState("");
  const [likedMovies, setLikedMovies] = useState([]);

  const addLikedMovie = (movie) => {
    setLikedMovies((prevLikedMovies) => {
      // Check if the movie is already liked
      const isAlreadyLiked = prevLikedMovies.some(
        (likedMovie) => likedMovie.id === movie.id
      );
      if (!isAlreadyLiked) {
        return [...prevLikedMovies, movie];
      }
      return prevLikedMovies;
    });
  };

  const removeLikedMovie = (movieId) => {
    setLikedMovies((prevLikedMovies) =>
      prevLikedMovies.filter((movie) => movie.id !== movieId)
    );
  };

  return (
    <UserProfileContext.Provider
      value={{
        nickname,
        setNickname,
        likedMovies,
        addLikedMovie,
        removeLikedMovie,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useProfile = () => useContext(UserProfileContext);
export default UserProfileContext;
