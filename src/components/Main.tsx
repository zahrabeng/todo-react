import { useState } from "react";
import { useEffect } from "react";
import IntTodo from "./ToDoTypes";
import axios from "axios";

export default function Main(): JSX.Element {
  const [toDo, setToDo] = useState<IntTodo[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [checked, setChecked] = useState<boolean>(true);
  const [toggleEdit, setToggleEdit] = useState<boolean>(false);
  const [toggleInput, setToggleInput] = useState<boolean>(false);

  const mainListURL = "https://to-do-2022.herokuapp.com/";

  useEffect(() => {
    async function getAllToDos() {
      const allToDos = await axios.get(mainListURL);
      const data: IntTodo[] = allToDos.data;
      setToDo([...data]);
    }
    getAllToDos();
  }, [toggleInput]);



  const handleInputClick = () => {
    setToggleInput(!toggleInput)
    const toDoObj = {
      task: searchText, 
      done: checked,
    };
    axios.post(`${mainListURL}todo`, toDoObj); 
     
    setSearchText("")
    setChecked(false) 
  };

  const handleDelete = (id: number) => {
    setToggleInput(!toggleInput)
    axios.delete(`${mainListURL}todo/${id}`);
  };

  const  handleEdit  = async (id: number) => {
    setToggleInput(!toggleInput)
    setToggleEdit(!toggleEdit)
    const data = await axios.get(`${mainListURL}todo/${id}`)
    setSearchText(data.data[0].task)
    setChecked(data.data[0].done)
    console.log(checked)
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
        <button onClick={() => handleEdit(toDo.id)}>Edit</button>
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
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <input type="checkbox" onClick={()=> setChecked(!checked)}></input>
        <button onClick={()=> handleInputClick() }>Click to Add</button>
      </div>
     
      <ul>{eachToDo}</ul>
    </>
  );
}
