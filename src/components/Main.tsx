import { useState } from "react";
import { useEffect } from "react";
import IntTodo from "./ToDoTypes";
import axios from "axios";

export default function Main(): JSX.Element {
  const [toDo, setToDo] = useState<IntTodo[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(true);

  const mainListURL = "http://localhost:5000/items";

  useEffect(() => {
    async function getAllToDos() {
      const allToDos = await axios.get(mainListURL);
      const data: IntTodo[] = allToDos.data;
      setToDo([...data]);
    }
    getAllToDos();
  }, [toDo]);

  const handleSearch = (e: string) => {
    setSearchText(e);
  };

  const handleInputClick = () => {
    const toDoObj: IntTodo = {
      task: searchText,
      done: checked,
    };
    axios.post(mainListURL, toDoObj);
  };

  const handleCheck = () => {
    setChecked(!checked);
  };

  const handleDelete = (id: any) => {
    axios.delete(`http://localhost:5000/items/${id}`);
  };

  const eachToDo = toDo.map((toDo: IntTodo) => {
    if (toDo.done === true)
      return (
        <>
          <li key={toDo.id}>{toDo.task}</li>{" "}
          <button onClick={() => handleDelete(toDo.id)}>delete</button>{" "}
        </>
      );
    else if (toDo.done === false)
      return (
        <>
          <li style={{ textDecorationLine: "line-through" }} key={toDo.id}>
            {toDo.task}
          </li>{" "}
          <button onClick={() => handleDelete(toDo.id)}>delete</button>
        </>
      );
  });

  //style={{ textDecorationLine: 'line-through' }}
  return (
    <>
      <h1>List of To Do's</h1>
      <p>Please add in your To Do and tick the checkbox if it is completed:</p>
      <div>
        <input
          placeholder="Add To Do..."
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        ></input>
        <input type="checkbox" onClick={handleCheck}></input>
        <button onClick={handleInputClick}>Click to Add</button>
      </div>
      <ul>{eachToDo}</ul>
    </>
  );
}
