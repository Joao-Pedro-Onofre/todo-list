import { useState } from "react";
import "./AddItem.css";

{
  /** Este funtion AddItem({onAdd}) é como se tivesse a fazer lá dentro: const onAdd = props.onAdd, ou seja está a guardar o prop que está a receber*/
}
function AddItem({ onAdd }) {
  const [title, setTitle] = useState("");

  function submit() {
    if (!onAdd) return;
    onAdd(title);
    setTitle("");
  }

  return (
    <>
      <input
        type="text"
        className="form-control todo-list-input"
        placeholder="What do you need to do today?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className="font-weight-bold todo-list-add-btn" onClick={submit}>
        Add
      </button>
    </>
  );
}
export default AddItem;
