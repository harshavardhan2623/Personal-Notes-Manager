import React, { useState, useEffect } from "react";
import axios from "axios";

const HomePage = () => {
    const [notes, setNotes] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchNotes = async () => {
            const { data } = await axios.get(`/api/notes?search=${search}`);
            setNotes(data);
        };
        fetchNotes();
    }, [search]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search notes..."
                onChange={(e) => setSearch(e.target.value)}
            />
            <ul>
                {notes.map((note) => (
                    <li key={note.id}>{note.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
