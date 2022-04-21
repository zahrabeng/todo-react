import { useState } from "react";
import { useEffect } from "react";
import IntTodo from "./ToDoTypes";
import axios from "axios";

export default function Main(): JSX.Element {
  const [toDo, setToDo] = useState<IntTodo[]>([]);
  const [searchText, setSearchText] = useState<string>("");


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
  const allToDos = await axios.get(`http://localhost:5000/items`);
  const data:IntTodo[] = allToDos.data
  setToDo([...data])
}
getAllToDos()
}, [toDo]);


  const handleSearch = (e: string) => {
    setSearchText(e);
  };

  const handleInputClick = (text:string) =>{
    
    setToDo([...toDo,  ])
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
        <button >Click to Add</button>
      </div>
      <ul>
        {eachToDo}
      </ul>
    </>
  );
}
