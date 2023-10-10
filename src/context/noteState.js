import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const note = [];
  const [notes, setNotes] = useState(note);
  const host = "http://localhost:5000";

  // Fetching Notes
  const getNote = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    let json = await response.json();
    setNotes(json);
  };

  // Adding a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "auth-token":
          localStorage.getItem('token'),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    let json = await response.json();
    console.log(json);
    setNotes(notes.concat(json));
  };

  // Deleting a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    console.log(json);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  // Updating a Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    let json = await response.json();
    console.log(json)

    let newNote = JSON.parse(JSON.stringify(notes));
    // let newNote = notes;
    for (let i in newNote) {
      const element = newNote[i];
      if (element._id === id) {
        newNote[i].title = title;
        newNote[i].description = description;
        newNote[i].tag = tag;
        break;
      }
    } 
    setNotes(newNote);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
