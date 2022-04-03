import { useState } from "react"
import { useEffect } from "react";
import IntTodo from "./ToDoTypes";

export default function Main():JSX.Element{
const [toDo, setToDo] = useState<IntTodo[]>([]);
const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const getAllToDos = async () => {
      const response = await fetch("http://localhost:4000/items");
      const allToDos: IntTodo[] = await response.json();
      setToDo([...allToDos]);
    };
    getAllToDos();
  }, [toDo]);

  const handleSearch = (e: string) => {
    setSearchText(e);
    console.log(searchText)
  };

  
  const eachToDo = toDo.map(toDo => <p key={toDo.id}>{toDo.task}</p>)

    return(
        <>
        <h1>List of To Do's</h1>
        
        <input placeholder="Add To Do..." value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
        ></input>
        {eachToDo}
        </>
    )
}