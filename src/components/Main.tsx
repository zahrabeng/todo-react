import { useState } from "react";
import { useEffect } from "react";
import IntTodo from "./ToDoTypes";
import axios from "axios";
//const axios = require('axios');

export default function Main(): JSX.Element {
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

  axios({
    method: 'post',
    url: '/item',
    data: {
      task:""
    }
  });

  const handleSearch = (e: string) => {
    setSearchText(e);
  };

  const handleInputClick = (text:string) =>{
    setToDo([...toDo, ])
  }

  const eachToDo = toDo.map((toDo: IntTodo) => <p key={toDo.id}>{toDo.task}</p>);

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
      {eachToDo}
    </>
  );
}
