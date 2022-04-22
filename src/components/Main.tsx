import { useState } from "react";
import { useEffect } from "react";
import IntTodo from "./ToDoTypes";
import axios from "axios";

export default function Main(): JSX.Element {
  const [toDo, setToDo] = useState<IntTodo[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const mainListURL = "http://localhost:5000/items"

  // useEffect(() => {
  //   const getAllToDos = async () => {
  //     const response = await fetch("http://localhost:5000/items");
  //     const allToDos: IntTodo[] = await response.json();
  //     setToDo([...allToDos]);
  //   };
  //   getAllToDos();
  // }, [toDo]);

useEffect(() => {
  async function getAllToDos(){
  const allToDos = await axios.get(mainListURL);
  const data:IntTodo[] = allToDos.data
  setToDo([...data])
}
getAllToDos()
}, [toDo]);




  const handleSearch = (e: string) => {
    setSearchText(e);
  };



  const handleInputClick = () =>{
    const toDoObj:IntTodo = {
      task: searchText}
    axios.post(mainListURL, toDoObj)
  }


  const eachToDo = toDo.map((toDo: IntTodo) => <li key={toDo.id}>{toDo.task} </li>);

  return (
    <>
      <h1>List of To Do's</h1>
      <div>
        <input
          placeholder="Add To Do..."
          value={searchText}
          onChange={(e) => handleSearch(e.target.value)}
        ></input>
        <button onClick={handleInputClick}>Click to Add</button>
        <input type="checkbox" placeholder="done?"></input>
      </div>
      <ul>
        {eachToDo}
      </ul>
    </>
  );
}