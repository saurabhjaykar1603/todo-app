import React, { useEffect, useState } from "react";
import "./Home.css";
import Task from "../../components/Task/Task";

function Home() {
  const [taskList, setTaskList] = useState([
    { id: 1, title: "Task 1", description: "description 1 ", priority: "high" },
  ]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  // Load List From localStorage

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("taskbuddy"));
    if (list && list.length >= 0) {
      setDescription(list);
    }
  }, []);

  // Save Task to Local Storage
  const saveTaskTolocalStorage = (tasks) => {
    localStorage.setItem("taskbuddy", JSON.stringify(tasks));
  };

  // add task btn
  const addTaskToLink = () => {
    const randomId = Math.floor(Math.random() * 1000);

    const obj = {
      id: randomId,
      title: title,
      description: description,
      priority: priority,
    };
    const newTaskList = [...taskList, obj];

    setTaskList(newTaskList);

    setTitle("");
    setDescription("");
    setPriority("");

    saveTaskTolocalStorage(newTaskList);
  };

  // Delete Task Button
  const removeTaskFromList = (id) => {
    let index;

    taskList.forEach((task, i) => {
      if (task.id === id) {
        index = i;
      }
    });

    const tempArray = taskList;
    tempArray.splice(index, 1);

    setTaskList([...tempArray]);
    saveTaskTolocalStorage(tempArray);
  };

  return (
    <>
      <div className="container">
        <h1 className="app-title">🎯 Task Buddy 🎯</h1>
      </div>
      <div className="todo-flex-container">
        <div>
          <h1 className="text-center">
            Show List <i className="fa-solid fa-list"></i>
          </h1>
          {taskList.map((taskItem, index) => {
            const { id, title, description, priority } = taskItem;

            return (
              <Task
                id={id}
                title={title}
                description={description}
                priority={priority}
                key={index}
                removeTaskFromList={removeTaskFromList}
                object={taskItem}
              />
            );
          })}
        </div>

        <div>
          <h1 className="text-center">
            Add List <i className="fa-solid fa-plus"></i>
          </h1>
          <div className="add-task-container">
            <form action="">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter Task Here"
                className="task-input"
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description  Here"
                className="task-input"
              />
              <input
                type="text"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                placeholder="Enter Priority Here"
                className="task-input"
              />
              <div className="btn-container">
                <button
                  type="button"
                  className="btn-add-task"
                  onClick={addTaskToLink}
                >
                  Add Task to List
                </button>
                <button
                  type="button"
                  className="btn-add-task"
                  onClick={addTaskToLink}
                >
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
