import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/signup" element={<SignUpPage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
