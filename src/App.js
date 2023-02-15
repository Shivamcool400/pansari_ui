import React, { useState, useEffect, startTransition } from 'react';
import Worker from './Worker';
import Task from './Task';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Fire from './firebase'
import 'firebase/compat/database';

// Define the task model

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
// Define the worker model


// Create some sample workers and tasks

// remove duplicates from array 



// Define the App component
const App = () => {
  // State for tasks and workers
  const arr = [];
  const temp = [];
  const db = Fire.database();
  const [data, setData] = useState([]);
  var today = new Date();
  var month = today.getMonth() + 1;
  var date = today.getDate();
  var year = today.getFullYear();
  var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
   
  const [allTasks, setAllTasks] = useState(tasks);
  const [allWorkers, setAllWorkers] = useState(workers);


  // const initState = async ()=> {
  //   var starCountRef =  db.ref();
  //   console.log(starCountRef);
  //   const response = await starCountRef.get('value');

  //   console.log(response.val());
  //   setData([response.val()]);
  // }
  function filterArray(array) {

    let newArray = [];
    let uniqueObject = {};

    for (let i in array) {
      var  objTitle = array[i]['Order_time'];      
        uniqueObject[objTitle] = array[i];
    };
      
    for (let i in uniqueObject) {
        newArray.push(uniqueObject[i]);
    };

    return newArray;

}
    
    
  const listen = async (name) => {
    var starCountRef =  db.ref(name);
   await starCountRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        
        var childData = childSnapshot.val();
       
        // ...
        
        
            arr.push(childData);
            console.log(arr);
    
        
        
      });
      console.log(arr);
    });

    let newArr = filterArray(arr);
    setData(newArr);
  }

      useEffect(() => {
        
  
        
        listen("Chiddi");
        listen("Sherry Man")
        listen("Bunty")
        listen("Rohit Motta")
        listen("Mahajan")
        listen("Parveen")
        
    }, []);
 
  

  // Function to update a task status
  const updateTaskStatus = (taskId, newStatus, name, date, order, title) => {
    setAllTasks(
      allTasks.map(task => {
        if (task.id === taskId) {
          return { ...task, status: newStatus };
        }
        return task;
      })
    );
    setData(data.map(task => {
      if (task.id === taskId) {
        return { ...task, status: newStatus };
      }
      return task;
    }));
   
    var postListRef = db.ref(name);
var newPostRef = postListRef.child(taskId);
newPostRef.update({
      id : taskId,
      date: date,
      Order_time: order,
      title : title,
      worker : name,
      status : newStatus
});
  };

  //Function to add a new task
  const addTask = (title, worker) => {
   
    setAllTasks([
      ...allTasks,
      Task(allTasks.length + 1, title, worker, 'pending')
    ]);
    setData(
      [
        ...data,
        Task(data.length + 1, title, worker, 'pending')
      ]
    )
    
    var postListRef = db.ref(worker);
var newPostRef = postListRef.child((data.length+1));
newPostRef.set({
      id : data.length + 1,
      date: `${date}:${month}:${year}`,
      Order_time: time,
      title : title,
      worker : worker,
      status : "pending"
});
    // db.ref(worker).update({
    //   id : allTasks.length + 1,
    //   date: `${date}:${month}:${year}`,
    //   current_time: Date.now(),
    //   title : title,
    //   worker : worker,
    //   status : "pending"

    // });
    tasks.push(allTasks);
  };

 // Admin window component
  const AdminWindow = () => {
    return (
      <div>
        <h2>Admin Window</h2>
        <h3>Tasks</h3>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Date and Order-Time</th>
      <th scope="col">Task Title</th>
      <th scope="col">Assigned To</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
  {data.length < 1 ? <h3>no tasks</h3>  : data.map((task,i) => (
          <tr key={i}  className={task.status === 'pending' ? 'table-danger' :'table-success'}>
      
          <th  scope="row">{i + 1}</th>
          <td>{task.date} /  {task.Order_time}</td>
          <td>{task.title}</td>
          <td>{task.worker}</td>
          <td>{task.status}</td>
        </tr>  
          ))}
          {/* {allTasks.map(task => (
          <tr className={task.status === 'pending' ? 'table-danger' :'table-success'}>
      
          <th scope="row">{task.id}</th>
          <td>{task.title}</td>
          <td>{task.worker}</td>
          <td>{task.status}</td>
        </tr>  
          ))} */}
    
    
  </tbody>
</table>
       
<div className="container text-center">
  <div className="row">
    <div className="col">
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
          <div className="row">
    <div className="col">
    <div className="input-group">
  <span className="input-group-text">Task Description</span>
  <textarea className="form-control" aria-label="With textarea" name="taskTitle"></textarea>
</div>
    </div>
    </div>
    <br/>
    <div className="row">
    <div className="col">
    <select className="form-select" aria-label="Default select example"name="assignedWorker">
            {allWorkers.map(worker => (
              <option key={worker.id} value={worker.name}>
                {worker.name}
              </option>
            ))}
          </select>
    </div>
    </div>
    <br/>
    <div className="row">
    <div className="col">
    <button type="submit"className="btn btn-secondary btn-lg">Add Task</button>
    </div>
    </div>
          
         
          
        </form>
      </div>
  
</div>
        
        
    );
  };

  // Worker window component
  const WorkerWindow = ({ worker }) => {
    const workerTasks = data.filter(task => task.worker === worker.name);

    return (
      <div>
        <h2>Hello, {worker.name} . These are Your Upcoming Tasks.</h2>
        {/* <h3>Tasks</h3> */}
        <table className="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Date and Order-Time</th>
      <th scope="col">Task Title</th>
      <th scope="col">Status</th>
      <th scope="col">Change Status</th>
    </tr>
  </thead>
  <tbody>
  {workerTasks.map((task,i) => (
          <tr className={task.status === 'pending' ? 'table-danger' :'table-success'}>
      
          <th scope="row">{i+1}</th>
          <td>{task.date} /  {task.Order_time}</td>
          <td>{task.title}</td>
          <td>{task.status}</td>
          <td>   {worker.role === 'worker' && task.status === 'pending' ? (
                <button
                  onClick={() => {
                    updateTaskStatus(task.id, 'completed',task.worker,task.date,task.Order_time,task.title);
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
<Router>
      
        <Routes>
          
          <Route exact path="/admin" element={<AdminWindow />}/>
          {allWorkers.map(worker => (
        <Route exact path={worker.name} element={<WorkerWindow key={worker.id} worker={worker} />}/>
      ))}
          
         
        </Routes>
     
    </Router>
      {/* <AdminWindow />
      {allWorkers.map(worker => (
        <WorkerWindow key={worker.id} worker={worker} />
      ))} */}
    </div>
  );
};

export default App;








































































































































































































































































































