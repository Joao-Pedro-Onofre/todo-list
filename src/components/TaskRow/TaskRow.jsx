import { IoMdCloseCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import { FaEdit } from "react-icons/fa";
import "./TaskRow.css";

{
  /* Agora aqui podemos aceder a todos os atributos da task (task.id, task.title, task.done) 
    Agora que fiz o onDelete, tive de atualizar o que o TaskRow está a receber da Dashboard
  */
}
function TaskRow({ task, onDelete, onToggle }) {
  const navigate = useNavigate();

  return (
    <>
      <li>
        <div className="form-check">
          <label className="form-check-label">
            <input
              className="checkbox"
              type="checkbox"
              checked={task.done}
              onChange={onToggle}
            />
            {task.title}
            <i className="input-helper"></i>
          </label>
        </div>
        <i className="remove" onClick={onDelete} role="button" tabIndex={0}>
          <IoMdCloseCircle />
        </i>
        <i
          className="update"
          onClick={() => navigate(`/edit/${task.id}`)}
          role="button"
          tabIndex={0}
        >
          <FaEdit />
        </i>
      </li>
    </>
  );
}
export default TaskRow;
