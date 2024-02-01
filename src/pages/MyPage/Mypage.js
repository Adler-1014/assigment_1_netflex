import React, { useState } from "react";
import { useAuth } from "../../contexts/auth.context";
import getTMDBImgSrc from "../../utils/getTMDBImgSrc";

import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useProfile } from "../../contexts/profile.context";

const PageContainer = styled.div`
  padding: 20px;
  color: white;
  background-color: #333; // Example background color
`;

const Title = styled.h1`
  color: #e50914; // Example title color
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #555;
`;

const Button = styled.button`
  padding: 10px;
  margin-right: 10px;
  border-radius: 4px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: darkblue;
  }
`;
const LikedMoviesList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(300px, 1fr)
  ); // Adjust the size as needed
  grid-gap: 20px; // Space between grid items
`;

const MovieItem = styled.li`
  background-color: #444;
  border-radius: 5px;
  overflow: hidden; // Optional, for a cleaner look

  img {
    width: 120%;
    height: auto;
    display: block;
  }

  div {
    padding: 10px;
    text-align: center; // Center the text
  }
`;

function MyPage() {
  const { isLoggedIn, logOut } = useAuth();
  const { nickname, setNickname, likedMovies, removeLikedMovie } = useProfile();
  const [newNickname, setNewNickname] = useState(nickname); // Initialize with current nickname

  const handleNicknameChange = () => {
    setNickname(newNickname);
    // Optionally update the nickname in your backend as well
  };

  if (!isLoggedIn) {
    return <div>Please log in to view this page.</div>;
  }

  return (
    <PageContainer>
      <Title>My Page</Title>
      <Input
        type="text"
        value={newNickname}
        onChange={(e) => setNewNickname(e.target.value)}
        placeholder="Enter new nickname"
      />
      <Button onClick={handleNicknameChange}>Update Nickname</Button>
      <Button onClick={logOut}>Log Out</Button>
      <Title>My Liked Movies</Title>
      <LikedMoviesList>
        {likedMovies.map((movie) => (
          <MovieItem key={movie.id}>
            <div>
              <img
                src={getTMDBImgSrc(movie.backdrop_path)}
                alt={movie.title}
                style={{ width: "100px", height: "auto" }}
              />
              <div>{movie.title}</div>
              <Button onClick={() => removeLikedMovie(movie.id)}>
                Dislike
              </Button>
            </div>
          </MovieItem>
        ))}
      </LikedMoviesList>
    </PageContainer>
  );
}

export default MyPage;
