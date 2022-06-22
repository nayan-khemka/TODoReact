import React, {useState} from "react";
import axios from "axios";

const UpdateTdo=(id)=>{
    console.log(id);
    const client = axios.create({
        baseURL: `http://localhost:3006/todos/${id.id}`,
    });
    let todo={}
    client.get().then(function(response){
        todo=response.data
    });
    console.log(todo);
    const [title, setTitle] = useState(todo.title);
	const [completed, setCom] = useState(Boolean(todo.completed));

    const UpTodos=(title,completed)=>{
        console.log(id,title,completed)
        client.put('',
        {
            title:title,
            completed:completed
        })
   };

    const handleSubmit = (e) => {
		// e.preventDefault();
		UpTodos(title, completed);
	};

    return(

        <form onSubmit={handleSubmit}>
            {console.log(todo)}
                  <input type="text" className="form-control"
                    value={title}
                    placeholder="Task"
                    onChange={(e) => setTitle(e.target.value)}>{title}</input>
                Completed:  <input type="checkbox"
                        name=""
                        className="form-control"
                        id=""
                        cols="10"
                        rows="8"
                        value={completed}
                        onChange={(e) => setCom(e.target.value)}>
                      </input>
                      <button type="submit">Save</button>
                </form>
    );
}
export default UpdateTdo;