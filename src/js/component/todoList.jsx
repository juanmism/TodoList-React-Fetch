import React from "react";
import {useState, useEffect} from "react";

const TodoList = () => {

    const [task, setTaskValue] = useState("");
    const [tasksList, setTaskList] = useState([]);
   
    const getTasksAPI = async () => {
        try {
                const user = "juanmisaenz";
                const url = "https://assets.breatheco.de/apis/fake/todos/user/" + user;
        
                const request = {
                                    method: "GET"
                }
                const response = await fetch(url,request);
                const result  = await response.json();
                    console.log(result);
                    setTaskList(result);
            } catch (error) {
                console.log(error);
                }
        };

    
        const actuaTasksAPI = async (actualList) => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const usuario = "juanmisaenz";
                const url =
                    "https://assets.breatheco.de/apis/fake/todos/user/" + usuario;
                const request = {
                    method: "PUT",
                    body: JSON.stringify(actualList),
                    headers:  { "Content-Type":"application/json"
				},
                };
                const response = await fetch(url, request);
                const result = await response.json();
                console.log(result);
                getTasksAPI();
                } catch (error) {
                    console.log(error);
            }
        };
        useEffect(() => {
            getTasksAPI();
        }, []);

        const handleKeyDown = event => {
            if (event.key === 'Enter' && task !== "") {
                setTaskValue("")
                actuaTasksAPI([...tasksList, { label: task, done: false},]);
            }
        };

        const removeTarea = (index) => {
            let todoDel = [...tasksList];
		    todoDel.splice(index, 1);
		    actuaTasksAPI(todoDel);
        };

        return (
        <div className="div-main">
            <div className="second-div">
                <div className="form-group">
                    <h1>TASKS TO DO</h1>
                    <input type="text" name="label" className="form-control" placeholder="Add new task" value={task} onChange={(e) => setTaskValue(e.target.value)} onKeyDown={(e) => handleKeyDown(e)}/>
                </div> 
                <div>
                    <ul>
                        {tasksList.map((el, index) => {
                            return (<li key={index}>{el.label}<i className="fas fa-trash-alt" onClick={() => removeTarea(index)}></i></li>
                            )})}
                    </ul>
                    <p>{tasksList  ? "You have " + tasksList.length + " tasks left to do": "You have no tasks todo"}</p>
                </div>
            </div>
        </div>)
}
 export default TodoList;