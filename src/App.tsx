import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AuthRoute from "./components/AuthRoute";
import Header from "./components/Header";
import Layout from "./components/layout/Layout";
import CreatePollPage from "./pages/CreatePollPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { fetchCurrentUser } from "./store/slices/accountSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    checkUser()
  }, [])
  
  function checkUser() {
    if (localStorage.getItem('jwtforms')) {
      dispatch(fetchCurrentUser())
    }
  }

  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="top-right" />
      <Header />
      <Layout>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/createpoll" element={<CreatePollPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
