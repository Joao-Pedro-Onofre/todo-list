import "./Dashboard.css";
import TaskRow from "../../components/TaskRow/TaskRow";
import AddItem from "../../components/AddItem/AddItem";
import { useTasks } from "../../stores/tasksStore";

function Dashboard() {
  const { tasks, addTask, deleteTask, toggleTask } = useTasks();
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
                    <AddItem onAdd={addTask} />{" "}
                    {/* A Dashboard está a passar um prop(função) nome->onAdd value->addTask ou seja onAdd === addTask 
                        Aqui, nós so estamos a passar a funcao, ela nao está a ser executada, ela só é executada quando se clica no botao*/}
                  </div>
                  <div className="list-wrapper">
                    <ul className="d-flex flex-column-reverse todo-list">
                      {/* prop name->task, prop value-> {id, title, done} */}
                      {tasks.map((task) => (
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
