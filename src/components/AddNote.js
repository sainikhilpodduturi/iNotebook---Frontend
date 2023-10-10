import React, { useContext, useState } from "react";
import noteContext from "../context/noteContext";

const AddNote = () => {
  const handleChangeEvent = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  const handleSubmitEvent = (event) => {
    event.preventDefault();
    addNote(note.title, note.desc, note.tag);
    setNote({title:"", desc:"", tag:""})
  };

  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", desc: "", tag:"" });

  return (
    <div className="container my-3">
      <h2 className="text-center">Add a Note</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            value={note.title}
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={handleChangeEvent}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            value={note.desc}
            id="desc"
            name="desc"
            onChange={handleChangeEvent}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            value={note.tag}
            id="tag"
            name="tag"
            onChange={handleChangeEvent}
          />
        </div>
        <button
         disabled={note.desc.length < 5 || note.title.length < 3 }
          type="submit"
          onClick={handleSubmitEvent}
          className="btn btn-primary"
        >
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
