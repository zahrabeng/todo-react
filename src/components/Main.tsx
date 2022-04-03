import { useState } from "react"
import { useEffect } from "react";
import IntTodo from "./ToDoTypes";

export default function Main():JSX.Element{
const [toDo, setToDo] = useState<IntTodo[]>([]);

  useEffect(() => {
    const getAllToDos = async () => {
      const response = await fetch("http://localhost:4000/items");
      const allToDos: IntTodo[] = await response.json();
      setToDo([...allToDos]);
    };
    getAllToDos();
  }, []);

  const eachToDo = toDo.map(toDo => <p key={toDo.id}>{toDo.task}</p>)

    return(
        <>
        <h1>List of To Do's</h1>
        {eachToDo}
        </>
    )
}
