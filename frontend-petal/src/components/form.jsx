import { useState } from "react";                          // useState lets a component remember values
import { api } from "../api.js";                           // our fetch helper (.js is required, same ES module rule as the backend)

export default function ProjectForm({ onCreated }) {      // onCreated is a function the parent gives us to call after saving
  const [title, setTitle] = useState("");                  // what's typed in the title box
  const [deadline, setDeadline] = useState("");            // what's picked in the date box
  const [error, setError] = useState("");                  // an error message to show, empty when fine

  async function handleSubmit(e) {                         // runs when the form is submitted
    e.preventDefault();                                    // stops the browser's default behavior of reloading the page
    setError("");                                          // clear any old error first
    try {
      await api("/api/projects", {                         // POST to the same endpoint you tested in Postman
        method: "POST",
        body: JSON.stringify({ title, deadline: new Date(deadline).toISOString() }), // the form gives local time; ISO format is what your Zod schema expects
      });
      setTitle("");                                        // empty the boxes
      setDeadline("");
      onCreated();                                         // tell the parent to reload projects and the flower
    } catch (err) {
      setError(err.message);                               // show the validation or server message
    }
  }

  return (
    <>
      {/* onSubmit connects the form to handleSubmit */}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Project title"                      // gray hint text
          value={title}                                    // the box always shows what React remembers
          onChange={(e) => setTitle(e.target.value)}       // every keystroke updates the remembered value
          required                                         // browser blocks an empty submit
        />
        <input
          type="datetime-local"                            // browser's built-in date and time picker
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          required
        />
        <button type="submit">Add project</button>
      </form>
      {/* shows the error text, and takes up no room when empty */}
      <p className="error">{error}</p>
    </>
  );
}