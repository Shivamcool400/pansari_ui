import React, { useState, useEffect } from 'react';
import Worker from './Worker';
import Task from './Task';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

// Define the task model


// Define the worker model


// Create some sample workers and tasks
const workers = [
  Worker(1, 'Chiddi', 'worker'),
  Worker(2, 'Mahajan', 'worker'),
  Worker(3, 'Sherry Man', 'worker'),
  Worker(4, 'Bunty', 'worker'),
  Worker(5, 'Parveen', 'worker'),
  Worker(6, 'Rohit Motta', 'worker')
];

const tasks = [
  // Task(1, 'Task 1', 'John Doe', 'pending'),
  // Task(2, 'Task 2', 'Jane Doe', 'pending'),
  // Task(3, 'Task 3', 'Jim Doe', 'pending')
];

// Define the App component
const App_4 = () => {
  // State for tasks and workers
  const [allTasks, setAllTasks] = useState(tasks);
  const [allWorkers, setAllWorkers] = useState(workers);

  // Function to update a task status
  const updateTaskStatus = (taskId, newStatus) => {
    setAllTasks(
      allTasks.map(task => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
  };

  //Function to add a new task
  const addTask = (title, worker) => {
    setAllTasks([
      ...allTasks,
      Task(allTasks.length + 1, title, worker, 'pending')
    ]);
  };

 // Admin window component
  const AdminWindow = () => {
    return (
      <div>
        <h2>Admin Window</h2>
        <h3>Tasks</h3>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Task Title</th>
      <th scope="col">Assigned To</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
  {allTasks.map(task => (
          <tr class={task.status === 'pending' ? 'table-danger' :'table-success'}>
      
          <th scope="row">{task.id}</th>
          <td>{task.title}</td>
          <td>{task.worker}</td>
          <td>{task.status}</td>
        </tr>  
          ))}
    
    
  </tbody>
</table>
       
<div class="container text-center">
  <div class="row">
    <div class="col">
    <h3>Add Task</h3>
    </div>
    </div>
    <form
          onSubmit={e => {
            e.preventDefault();
            addTask(e.target.taskTitle.value, e.target.assignedWorker.value);
            e.target.taskTitle.value = '';
          }}
        >
          <br/>
          <div class="row">
    <div class="col">
    <div class="input-group">
  <span class="input-group-text">Task Description</span>
  <textarea class="form-control" aria-label="With textarea" name="taskTitle"></textarea>
</div>
    </div>
    </div>
    <br/>
    <div class="row">
    <div class="col">
    <select class="form-select" aria-label="Default select example"name="assignedWorker">
            {allWorkers.map(worker => (
              <option key={worker.id} value={worker.name}>
                {worker.name}
              </option>
            ))}
          </select>
    </div>
    </div>
    <br/>
    <div class="row">
    <div class="col">
    <button type="submit"class="btn btn-secondary btn-lg">Add Task</button>
    </div>
    </div>
          
         
          
        </form>
      </div>
  
</div>
        
        
    );
  };

  // Worker window component
  const WorkerWindow = ({ worker }) => {
    const workerTasks = allTasks.filter(task => task.worker === worker.name);

    return (
      <div>
        <h2>{worker.name} ({worker.role}) Window</h2>
        <h3>Tasks</h3>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Task Title</th>
      <th scope="col">Status</th>
      <th scope="col">Change Status</th>
    </tr>
  </thead>
  <tbody>
  {workerTasks.map(task => (
          <tr className={task.status === 'pending' ? 'table-danger' :'table-success'}>
      
          <th scope="row">{task.id}</th>
          <td>{task.title}</td>
          <td>{task.status}</td>
          <td>   {worker.role === 'worker' && task.status === 'pending' ? (
                <button
                  onClick={() => {
                    updateTaskStatus(task.id, 'completed');
                  }}
                >
                  Complete Task
                </button>
              ) : null}</td>
        </tr>  
          ))}
    
    
  </tbody>
</table>
       
      </div>
    );
  };

  return (
    <div>
{/* <Router>
      
        <Routes>
          
          <Route exact path="/admin" element={<AdminWindow />}/>
          {allWorkers.map(worker => (
        <Route exact path="/worker" element={<WorkerWindow key={worker.id} worker={worker} />}/>
      ))}
          
         
        </Routes>
     
    </Router> */}
      <AdminWindow />
      {allWorkers.map(worker => (
        <WorkerWindow key={worker.id} worker={worker} />
      ))}
    </div>
  );
};

export default App_4;
