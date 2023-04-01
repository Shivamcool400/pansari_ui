import React, { useState, useEffect, startTransition } from 'react';
import Worker from './Worker';
import Task from './Task';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Fire from './firebase'
import 'firebase/compat/database';
import Login from './login';
import ProtectedRoute from './protected';
import Home from './home';
import { getStorage,ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list, } from 'firebase/storage';
import { v4 } from "uuid";
import AdminWindow from './AdminWindow';


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
  const storage = getStorage(Fire);
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  var [show,setShow] = useState(false);
  var today = new Date();
  var month = today.getMonth() + 1;
  var date = today.getDate();
  var year = today.getFullYear();
  var time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  var exact_date = `${date}:${month}:${year}`
   
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
    function removeDuplicates(arr) {
        return arr.filter((item, 
            index) => arr.indexOf(item) === index);
    }
    
  const listen = async (name) => {
    var starCountRef =  db.ref(name);
   await starCountRef.once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        var childKey = childSnapshot.key;
        
        var childData = childSnapshot.val();
       
        // ...
        
        
            arr.push(childData);
            temp.push(childData.date);
    
        
        
      });
    });

    let newArr = filterArray(arr);
    let newdate = removeDuplicates(temp);
    setData(newArr);
    setDates(newdate);
  }

      useEffect(() => {
        
  
        
        listen("Chiddi")
        listen("Sherry Man")
        listen("Bunty")
        listen("Rohit Motta")
        listen("Mahajan")
        listen("Parveen")
        
    }, []);


    //Date Functions 
 
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };
   const reset = () => {
   setShow("");
   setSelectedDate("");
   var dropDown = document.getElementById("inputGroupSelect01");  
   dropDown.selectedIndex = 0;
  }
  const getdetails = ()=>{
  setShow(true);

  console.log(selectedDate);
    
 }

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
  const addTask = (title, worker, type) => {
    setAllTasks([
      ...allTasks,
      Task(allTasks.length + 1, title, worker,type, 'pending')
    ]);
    setData(
      [
        ...data,
        Task(data.length + 1, title, worker,type, 'pending')
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
      status : "pending",
      type: type
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
    listen("Chiddi")
    listen("Sherry Man")
    listen("Bunty")
    listen("Rohit Motta")
    listen("Mahajan")
    listen("Parveen")
    
  };

  //image
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, exact_date);
  const uploadFile = () => {
    const imageRef = ref(storage, `${exact_date}/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrls((prev) => [...prev, url]);
      });
    });
  };
 
//modal
const hel=()=>{
  const exampleModal = document.getElementById('exampleModal')
  exampleModal.addEventListener('show.bs.modal', event => {
    // Button that triggered the modal
    const button = event.relatedTarget
    // Extract info from data-bs-* attributes
    const recipient = button.getAttribute('data-bs-whatever')
    // If necessary, you could initiate an AJAX request here
    // and then do the updating in a callback.
    //
    // Update the modal's content.
    const demo = data.filter(task => task.id == `${recipient}`);
    
    const modalBodyInput = exampleModal.querySelector('.modal-body img')
     console.log(recipient,demo);
     if(demo[0].url){
      modalBodyInput.src = demo[0].url
     }
     else{
      modalBodyInput.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
     }
    
  })
}


  // Worker window component
  const WorkerWindow = ({ worker }) => {
    const workerTasks = data.filter(task => task.worker === worker.name && task.status === "pending");

    return (
      <div>
        <h3 className='text-center'>
  Bittu Pansari
  <br/>
  <small class="text-muted">Shop Orders Panel</small>
</h3>
<br/>
<br/>
        <h2>Hello, {worker.name} . These are Your Pending Tasks.</h2>
        {/* <h3>Tasks</h3> */}
        <table className="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Date and Order-Time</th>
      <th scope="col">Task Title</th>
      <th scope="col">Images</th>
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
          <td><button type="button" onClick={hel} class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever={task.id}>
  Show Image
</button>
{/* modal */}
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div class="container text-center">
  <div class="row">
    <div class="col">
    </div>
    <div class="col-sm-12 col-md-4">
    <img class="img-thumbnail" src='' />
  </div>
   <div class="col">
    </div>
</div> 
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</div>
</td>
          <td>{task.status}</td>
          <td>   {worker.role === 'worker' && task.status === 'pending' && task.type === "Non-Payment" ? (
                <button className='btn btn-success'
                  onClick={() => {
                    updateTaskStatus(task.id, 'completed',task.worker,task.date,task.Order_time,task.title);
                  }}
                >
                  Completed successfully
                </button>
              ) : (
                <div><button className='btn btn-success'
                onClick={() => {
                  updateTaskStatus(task.id, 'completed Payment Received',task.worker,task.date,task.Order_time,task.title);
                }}
              >
                Delivered Payment Received!
              </button>
              <button className='btn btn-warning'
                  onClick={() => {
                    updateTaskStatus(task.id, 'completed Payment Not Received',task.worker,task.date,task.Order_time,task.title);
                  }}
                >
                  Delivered Payment Not Received!
                </button>
              </div>
                
              )}</td>
        </tr>  
          ))}
    
    
  </tbody>
</table>


<br/>
<br/>
<footer className='footer'>
    <div className="copyright text-center">&copy; Developed by DayaRam and Sons. Version 1.0 @2023</div>
      </footer> 
      </div>
    );
  };

  return (
    <div>
<Router>
      
        <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route exact path="/login" element={<Login />}/>
        
        <Route exact path="/admin" element={<ProtectedRoute ProtectedComponent={<AdminWindow />} />}/>
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








































































































































































































































































































