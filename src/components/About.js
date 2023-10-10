import React, { useContext } from "react";
import NoteContext from "../context/noteContext";

const About = () => {
  // const contextvar = useContext(NoteContext);
 
  return (
    <div>
      {/* This is about {contextvar.state.name} from {contextvar.state.city} */}
      This is about page
    </div>
  );
};

export default About;
