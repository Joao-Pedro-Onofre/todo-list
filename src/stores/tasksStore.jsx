import { createContext, useContext, useEffect, useMemo, useState } from "react";

const TasksContext = createContext(null);

//Aqui estamos a criar o provider para podermos importar isto no site
export function TasksProvider({ children }) {
  // Aqui estamos a ir á local storage para ir buscar as tasks
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Aqui temos que passar as tasks para JSON para poderem ser usadas
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //-----------------------------------------------------------------

  //Add task
  function addTask(title) {
    const trimmed = title.trim();
    if (!trimmed) return;

    setTasks((prev) => [
      { id: crypto.randomUUID(), title: trimmed, done: false },
      ...prev,
    ]);
  }

  // Delete Task
  function deleteTask(id) {
    setTasks(function (previousTasks) {
      /**
       * 1- Pega na lista de tasks
       * 2- Remove a task
       * 3- Retorna um novo array de tasks sem a que eliminamos
       * 4- Atualiza o state com o novo array
       *
       *
       * ----
       * NOTA
       * ----
       * «array».filter(condição) - percorre o array inteiro e remove o que nao respeita a condição
       * (o array fica com tamanho diferente)
       */
      const filteredTasks = previousTasks.filter(function (task) {
        return task.id !== id;
      });

      return filteredTasks;
    });
  }

  // Update Task
  /**
   * patch - novos dados de uma certa task
   *
   * 1- se a task existir
   *  1a - cria um novo objeto
   *  1b - Copia os dados antigos para o novo objeto
   *  1c - dá overwrite com os novos dados
   * 2- se não existir, retorna a task sem alterações
   * 3- atualiza o state
   *
   *
   * ----
   * Nota
   * ----
   * «array».map(condição) - percorre o array inteiro, e transforma os dados la dentro
   * (o array fica do mesmo tamanho)
   */
  function updateTask(id, patch) {
    setTasks(function (previousTasks) {
      const updatedTasks = previousTasks.map(function (task) {
        if (task.id === id) {
          // Dá merge dos dados antigos com os dados novos
          const updatedTask = { ...task, ...patch }; //(task -> Json completo, patch -> Json só com os campos que é para atualizar)
          return updatedTask;
        }

        return task;
      });

      return updatedTasks;
    });
  }

  // Optional (but you’ll want it soon)
  /**
   * Mesma logica
   * 1- Criar novo objeto
   * 2- Copiar os dados antigos para o novo objeto
   * 3- alterar o "done" da task para ficar true/false
   * 4- atualizar o state
   *
   */
  function toggleTask(id) {
    setTasks(function (previousTasks) {
      const updatedTasks = previousTasks.map(function (task) {
        if (task.id === id) {
          const updatedTask = { ...task, done: !task.done };
          return updatedTask;
        }

        return task;
      });

      return updatedTasks;
    });
  }

  const value = useMemo(
    () => ({ tasks, addTask, deleteTask, updateTask, toggleTask }),
    [tasks],
  );

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used inside <TasksProvider>");
  return ctx;
}
