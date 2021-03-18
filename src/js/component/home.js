import React, { useState, useEffect } from "react";
//import { Button } from "bootstrap";
//create your first component

export function Home() {
	let [listaTareas, setListaTareas] = useState([]);
	let [tarea, setTarea] = useState("");
	const [contador, setContador] = useState(0);
	useEffect(() => {
		getTareas();
	}, []);
	function getTareas() {
		var requestOptions = {
			method: "GET",
			redirect: "follow"
		}; //cierra requestOptions
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/pame2394",
			requestOptions
		)
			.then(response => response.json())
			.then(result => setListaTareas(result))
			.catch(error => console.log("error", error));
	} //cierra getTareas
	const putTareas = () => {
		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");
		var raw = JSON.stringify(listaTareas);
		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow"
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/pame2394",
			requestOptions
		)
			.then(response => response.json())
			.then(result => console.log(result))
			.catch(error => console.log("error", error));
	};
	const add = () => {
		if (tarea == "") {
			alert("Enter the task that you want to add");
		} else {
			setListaTareas([...listaTareas, { label: tarea, done: false }]);
			setTarea("");
		} //cierra el else
	}; //cierra agregar

	console.log(listaTareas);
	putTareas();

	const deleteTask = i => {
		const nuevaTarea = [...listaTareas];
		nuevaTarea.splice(i, 1);
		setListaTareas(nuevaTarea);
		setContador(contador - 1);
	};

	const deleteAll = () => {
		listaTareas = [];
		setListaTareas([...listaTareas, { label: "Sample Task", done: false }]);
		putTareas();
		//window.location.reload(true);
		console.log(listaTareas);
	};

	return (
		<div
			className="text-center mt-5"
			style={{ background: "#DCDCDC", width: "360px", margin: "auto" }}>
			<h1>
				<strong>To do List</strong>
			</h1>
			<input
				placeholder="Enter your Task"
				onChange={e => setTarea(e.target.value)}
				value={tarea}></input>
			<button
				style={{
					background: "##696969",
					marginLeft: "0.3cm"
				}}
				onClick={add}>
				Add Task
			</button>
			<ul className="list-group">
				{listaTareas.map((item, index) => {
					return (
						<li key={index} className="list-group-item">
							{item.label}
							<button
								className="remove"
								onClick={() => deleteTask(index)}>
								X
							</button>
						</li>
					); //cierra return
				}) //cierra map
				}
			</ul>
			<button onClick={deleteAll}>Delete all!</button>
			<div>{listaTareas.length + " Remaining Tasks"}</div>
		</div>
	);
} //cierra Export
