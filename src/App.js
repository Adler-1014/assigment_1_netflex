import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth.context";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import MoviesDetailPage from "./pages/MoviesDetailPage";
import SignInPage from "./pages/SignInPage";
import MyPage from "./pages/MyPage";
import { UserProfileProvider } from "./contexts/profile.context";

function App() {
  return (
    <AuthProvider>
      <UserProfileProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/movies/:movieId" element={<MoviesDetailPage />} />
            <Route path="/my-page" element={<MyPage />} />
          </Route>
        </Routes>
      </UserProfileProvider>
    </AuthProvider>
  );
}

export default App;
