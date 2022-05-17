import { useState } from "react";
import { useEffect } from "react";
import IntTodo from "./ToDoTypes";
import axios from "axios";
import { config } from "dotenv";

export default function Main(): JSX.Element {
  const [toDo, setToDo] = useState<IntTodo[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(true);

  config();

  const mainListURL = "https://to-do-2022.herokuapp.com/";

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
    axios.post(`${mainListURL}todo`, toDoObj);
  };

  const handleCheck = () => {
    setChecked(!checked);
  };

  const handleDelete = (id: any) => {
    axios.delete(`${mainListURL}todo/${id}`);
  };

  const handleEdit = () => {
    console.log(1234);
  };

  const eachToDo = toDo.map((toDo: IntTodo) => {
    return (
      <>
        {toDo.done ? (
          <li key={toDo.id}>{toDo.task}</li>
        ) : (
          <li style={{ textDecorationLine: "line-through" }} key={toDo.id}>
            {toDo.task}✔️
          </li>
        )}
        <button onClick={() => handleDelete(toDo.id)}>delete</button>
      </>
    );
  });

  return (
    <>
      <h1>List of To Do's</h1>
      <p>Please add in your To-Do and tick the checkbox if it is completed:</p>
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
      <button onClick={handleEdit}>Edit To-Do</button>
    </>
  );
}
