import "./Dashboard.css";
import TaskRow from "../../components/TaskRow/TaskRow";
import AddItem from "../../components/AddItem/AddItem";
import { useTasks } from "../../stores/tasksStore";
import { useState } from "react";

function Dashboard() {
  const { tasks, addTask, deleteTask, toggleTask } = useTasks();
  const [filter, setFilter] = useState("all"); //Local state para os filtros (Este state só funciona na Dashboard)
  /** Este local state cria:
   * - filter (value atual do filter)
   * - setFilter (funcao para mudar o value)
   * - "all" (value default)
   */
  const [searchText, setSearchText] = useState(""); //por exemplo este já n tem um default value

  //Isto é um computed value, ou seja, corre sempre cada vez que há um render
  const visibleTasks = tasks
    //filtrar pela dropdown
    .filter((task) => {
      if (filter === "done") return task.done;
      if (filter === "todo") return !task.done;
      return true; // "all"
      /**
       * Verifica que tasks estão marcadas e retorna conforme o filtro escolhido
       */
    })
    //filtrar pela caixa de pesquisa
    .filter((task) => {
      const query = searchText.trim().toLowerCase();
      if (!query) return true;

      return task.title.toLowerCase().includes(query);
    });
  return (
    <>
      <div className="page-content page-container" id="page-content">
        <div className="page-title d-flex justify-content-center mt-5">
          <h1 className="page-title">Jonofer's To-Do List</h1>
        </div>
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-md-12">
              <div className="card">
                <div className="card-body">
                  <div className="add-items d-flex">
                    <AddItem onAdd={addTask} />
                    {/* A Dashboard está a passar um prop(função) nome->onAdd value->addTask ou seja onAdd === addTask 
                        Aqui, nós so estamos a passar a funcao, ela nao está a ser executada, ela só é executada quando se clica no botao*/}
                  </div>
                  <div className="row container">
                    <div className="col-md-8">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search tasks..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <select
                        className="form-select ms-2"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)} //chama o setFilter e a dashboard dá re-render
                      >
                        <option value="all">All</option>
                        <option value="todo">To do</option>
                        <option value="done">Done</option>
                      </select>
                    </div>
                  </div>
                  <hr />
                  <div className="list-wrapper">
                    <ul className="d-flex flex-column-reverse todo-list">
                      {/* prop name->task, prop value-> {id, title, done} */}
                      {visibleTasks.map((task) => (
                        <TaskRow
                          key={task.id} //isto é só para o react
                          task={task} //isto é o prop (estamos a enviar a task completa)
                          onDelete={() => deleteTask(task.id)}
                          onToggle={() => toggleTask(task.id)}
                        />
                      ))}
                      {/* Aqui o delete já não pode ser como o addTask, porque assim o delete ia ser executado logo, e ia dar undefined porque nao retorna nada
                       */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
