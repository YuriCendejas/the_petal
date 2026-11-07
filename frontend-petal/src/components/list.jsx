import { api } from "../api.js";                           // our fetch helper

export default function ProjectList({ projects, onChanged, onError }) { // data and two functions from the parent
  async function run(path, method) {                       // one function for both Done (PATCH) and Delete (DELETE)
    try {
      await api(path, { method });                         // no body needed for either request
      onChanged();                                         // reload the list and the flower
    } catch (err) {
      onError(err.message);                                // show the error in the parent's error line
    }
  }

  if (!projects.length) return <p>No projects yet.</p>;   // friendly message for an empty list

  return (
    <ul>
      {projects.map((p) => {                               // turn each project into one list row
        const overdue = p.status === "pending" && new Date(p.deadline) < new Date(); // not done and the deadline already passed
        const cls = p.status === "done" ? "done" : overdue ? "overdue" : ""; // pick a CSS class for the colored left border

        return (
          // key must be unique per row, and Mongo's _id is
          <li key={p._id} className={cls}>
            <div>
              <strong>{p.title}</strong>
              <small>
                {new Date(p.deadline).toLocaleString()}    {/* turns the stored date into one readable in your timezone */}
                {overdue ? " · missed" : ""}               {/* adds a label for missed ones */}
              </small>
            </div>
            <div className="actions">
              {/* the Done button only shows for pending projects (&& means "only if true") */}
              {p.status === "pending" && (
                <button onClick={() => run(`/api/projects/${p._id}/complete`, "PATCH")}>
                  Done
                </button>
              )}
              {/* Delete always shows; ${p._id} puts this project's id into the URL */}
              <button className="del" onClick={() => run(`/api/projects/${p._id}`, "DELETE")}>
                Delete
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}