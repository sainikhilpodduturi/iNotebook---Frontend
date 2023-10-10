import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const ref = useRef(null);
  const closeRef = useRef(null);

 const navigate =  useNavigate();

  useEffect(() => { 
    if(localStorage.getItem('token')){
      getNote();
    }
    else{
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (note) => {
    ref.current.click();
    setNote({
      id: note._id,
      title: note.title,
      description: note.description,
      tag: note.tag,
    });
  };

  const handleChangeEvent = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  const handleSubmitEvent = (event) => {
    editNote(note.id, note.title, note.description, note.tag);
    closeRef.current.click();
  };

  return (
    <>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    aria-describedby="emailHelp"
                    value={note.title}
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
                    id="description"
                    name="description"
                    value={note.description}
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
                    id="tag"
                    name="tag"
                    value={note.tag}
                    onChange={handleChangeEvent}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeRef}
              >
                Close
              </button>
              <button
                disabled={note.title.length < 3 || note.description.length < 5}
                type="button"
                onClick={handleSubmitEvent}
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>




    


      <AddNote />
      <div className="row my-5">
        <h2 className="text-center">Your Notes</h2>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
