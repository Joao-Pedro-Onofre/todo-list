import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../../stores/tasksStore";

export default function EditTask() {
  const { tasks, updateTask } = useTasks();
  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasks.find((t) => t.id === id); // Vai buscar ao array de tasks, a task que tem o id i gual ao id do URL
  /**
   * tasks - array
   * .find() - encontra o primeiro elemento que corresponder
   * (t) - cada task no array
   * t.id === id - verifica se são exatamente iguais
   */

  const initialTitle = task ? task.title : ""; //se a task existir, usa o titulo da task, senão usa ""
  const [title, setTitle] = useState(initialTitle);

  if (!task) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Task not found</h2>
        <button onClick={() => navigate("/")}>Back</button>
      </div>
    );
  }

  function save() {
    const trimmed = title.trim();
    if (!trimmed) return;
    updateTask(task.id, { title: trimmed });
    navigate("/");
  }

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: "0 auto" }}>
      <h1>Edit Task</h1>

      <label style={{ display: "block", marginTop: 12 }}>
        Title
        <input
          style={{ display: "block", width: "100%", padding: 10, marginTop: 6 }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button onClick={save}>Save</button>
        <button onClick={() => navigate("/")}>Cancel</button>
      </div>
    </div>
  );
}
