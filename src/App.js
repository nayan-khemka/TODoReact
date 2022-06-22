import React, { useState, useEffect } from 'react';

import axios from 'axios';

import UpdateTdo from './UpdateTodo';

const client = axios.create({
	baseURL: 'http://localhost:3006/todos',
});

const App = () => {
	const [id, setID] = useState(0);
	const [title, setTitle] = useState('');
	const [completed, setCom] = useState(Boolean(false));
	const [todos, setTodos] = useState([]);

	// GET with Axios
	useEffect(() => {
    client.get().then((response) => {setTodos(response.data);});
     }, []);
  

	// DELETE with Axios
	const deleteTodo = (id) => {
    client.delete(`${id}`);
    setTodos(
       todos.filter((todo) => {
          return todo.id !== id;
       })
    );
 };

 

	// handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		addTodos(title, completed);
	};
  
//   const handleSubmit2 = (e) => {
// 		e.preventDefault();
// 		UpdateTodo(title, completed);
// 	};

	// const UpdateTodo = () =>{
	// 	client.put()
		
	//    }

	// POST with Axios
	const addTodos = (title, completed) => {
    client
       .post('', {
          title: title,
          completed: completed,
       })
       .then((response) => {
          setTodos([response.data, ...todos]);
       });
    setTitle('');
    setCom(false);
 };
 const [isShown3, setIsShown3] = useState(false);
 const [isShown, setIsShown] = useState(false);

const handleClick = event => {
  setIsShown(current => !current);
};

const getTodo = (e) =>{
	e.preventDefault();
	let todo=client.get(`/${id}`)
	.catch(function(error){
		// console.log(error.mesage)
		alert("No Task with Such ID");
		setIsShown3(current=>!current)
		return
	});
	if(todo)
	setIsShown3(current=>!current);
};



const [isShown2, setIsShown2] = useState(false);

const handleClick2 = event => {
  setIsShown2(current => !current);
};


	return (
		<div className="app">
			<nav>
				<h1>Todos APP</h1>
        <button onClick={handleClick} className="button-6" style={{textAlign:'center',fontSize:'15px'}}>ADD</button>
		<button onClick={handleClick2} className="button-6" style={{textAlign:'center',fontSize:'15px'}}>Update</button>
			</nav>
			{ isShown &&(
        <div className="add-todo-container">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						className="form-control"
						value={title}
            placeholder="Task"
						onChange={(e) => setTitle(e.target.value)}
					/>
					Completed: <input type="checkbox"
						name=""
						className="form-control"
						id=""
						cols="10"
						rows="8"
						value={completed}
						onChange={(e) => setCom(e.target.value)}
					></input>
					<button type="submit">Add Task</button>
				</form>
        <hr/>
			</div>
      )}
	  {isShown2 && (
		<div>
			<form onSubmit={getTodo}>
				<input type="number" className='form-control' cols="10"
						rows="8" value={id} placeholder="ID" onChange={(e) => setID(e.target.value)} />
				<button type="submit">Update Task</button>
			</form>
		</div>
	  )
	  }
	  {
		isShown3 && (
			<div>
			{console.log("hello "+id)}
			<UpdateTdo id={id}/>
			</div>
		)
	  }
			<div className="todos-container">
				<h2 style={{textAlign:"center"}}>ALL TODOS</h2>
				{todos.map((todo) => {
					return (
						<div className="todo-card" key={todo.id}>
              <h2>{todo.id}</h2>
							<h2 className="todo-title">{todo.title}</h2>
							{/* <p className="todo-com">{todo.completed}</p> */}
							<div className="button">
								<div className="delete-btn" style={{display:"inline-block"}} onClick={() => deleteTodo(todo.id)}>
									Delete
								</div>
                {/* <button className="delete-btn" style={{textAlign:'center',fontSize:'15px'}} onClick={()=>updatetodos(todo.id)} >
                  Update
                </button> */}
				{/* {isShown2 && <UpdateTdo todo={todo}/>} */}
                {/* {isShown2 &&(
                  <form onSubmit={handleSubmit2}>
                  <input type="text" className="form-control"
                    value={title}
                    placeholder="Task"
                    onChange={(e) => setTitle(e.target.value)}/>
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
                )} */}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default App;