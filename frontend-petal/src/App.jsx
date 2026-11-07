import { useCallback, useEffect, useRef, useState } from "react"; // the React tools we use below
import { api } from "./api.js";                            // our fetch helper
import Flower from "./components/flower.jsx";              // the three components (.jsx is required in the path)
import ProjectForm from "./components/form.jsx";
import ProjectList from "./components/list.jsx";
export default function App() {
  const [projects, setProjects] = useState([]);            // the list from GET /api/projects
  const [flower, setFlower] = useState(null);              // the data from GET /api/flower (null until loaded)
  const [error, setError] = useState("");                  // one shared error message
  const seen = useRef(null);                               // remembers petal counts between renders without triggering a redraw: { last, prev }

  const refresh = useCallback(async () => {                // reloads everything; useCallback keeps it the same function between renders
    try {
      const [list, f] = await Promise.all([                // run both requests at the same time instead of one after the other
        api("/api/projects"),
        api("/api/flower"),
      ]);

      if (!seen.current) {                                 // first load of the page
        const stored = localStorage.getItem("petalsLeft"); // the count from your last visit (saved in the browser)
        seen.current = {
          last: f.petalsLeft,                              // the count right now
          prev: stored !== null ? Number(stored) : f.petalsLeft, // the count you saw last visit, or the current one if there's no history
        };
      } else if (seen.current.last !== f.petalsLeft) {     // later refresh where the petal count changed
        seen.current = { last: f.petalsLeft, prev: seen.current.last }; // old "last" becomes "prev", so only NEW losses animate
      }
      localStorage.setItem("petalsLeft", f.petalsLeft);    // save for the next visit

      setProjects(list);                                   // put the new data in state, which redraws the page
      setFlower({ ...f, prevLeft: seen.current.prev });    // pass the flower data plus prevLeft down to Flower
      setError("");                                        // clear old errors on success
    } catch (err) {
      setError(err.message);                               // show what went wrong
    }
  }, []);                                                  // empty list = this function never needs to be recreated

  useEffect(() => {                                        // runs once when the page first appears
    refresh();                                             // load data right away
    const id = setInterval(refresh, 30000);                // and again every 30 seconds, so petals can fall while the page is open
    return () => clearInterval(id);                        // cleanup: stop the timer when the page closes
  }, [refresh]);

  return (
    <main>
      <Flower flower={flower} />                           {/* left column: the drawing */}
      <section className="panel">                          {/* right column: form and list */}
        <h1>Petal</h1>
        <p className="sub">Miss a deadline and a petal falls.</p>
        <ProjectForm onCreated={refresh} />                {/* after creating, call refresh */}
        <p className="error">{error}</p>
        <ProjectList projects={projects} onChanged={refresh} onError={setError} /> {/* list gets the data and ways to reload or report errors */}
      </section>
    </main>
  );
}