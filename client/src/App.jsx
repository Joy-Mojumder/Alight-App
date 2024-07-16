import { Toaster } from "react-hot-toast";
import SignUpPage from "./pages/auth/signup/SignUpPage";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/auth/login/LoginPage";

import { AnimatePresence } from "framer-motion";
import Navbar from "./components/common/Navbar";
import LeftBar from "./components/common/LeftBar";
import { useQuery } from "@tanstack/react-query";
import HomePage from "./pages/home/HomePage";
const App = () => {
  const location = useLocation();

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch user");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg" />
      </div>
    );
  }
  return (
    <>
      {authUser && <Navbar />}
      <div className="min-h-screen flex max-h-screen mx-auto">
        {authUser && <LeftBar />}
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={authUser ? <HomePage /> : <Navigate to="/login" />}
            />
            <Route
              path="/signup"
              element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!authUser ? <LoginPage /> : <Navigate to="/" />}
            />
          </Routes>
        </AnimatePresence>
        <Toaster />
      </div>
    </>
  );
};

export default App;
