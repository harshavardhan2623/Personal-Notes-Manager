import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NoteForm from "./pages/NoteForm";

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/note/:id?" element={<NoteForm />} />
        </Routes>
    </Router>
);

export default App;
