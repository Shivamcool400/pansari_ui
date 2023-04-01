import React, { useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';



function Home() {
  
  let navigate = useNavigate();
  

  return (
    <div>
        <br/>
        <br/>
        
       < br/>
      <div class="container text-center">
  <div class="row">
  <div class="col"></div>
    <div class="col">
    <button type="button" onClick={()=>{navigate("/login")}} class="btn btn-primary btn-lg">Admin</button>
    </div> 
    <div class="col"></div> 
  </div>
    
  <br/>
  <br/>
  <div class="row">
    <div class="col"></div>
    <div class="col">
    <button type="button" onClick={()=>{navigate("/Chiddi")}} class="btn btn-primary btn-lg">Chiddi</button>
    </div> 
    <div class="col"></div> 
  </div>
  <br/>
  <div class="row">
    <div class="col"></div>
    <div class="col">
    <button type="button" onClick={()=>{navigate("/Bunty")}} class="btn btn-primary btn-lg">Bunty</button>
    </div> 
    <div class="col"></div> 
  </div>
  <br/>
  <div class="row">
    <div class="col"></div>
    <div class="col">
    <button type="button" onClick={()=>{navigate("/Mahajan")}} class="btn btn-primary btn-lg">Mahajan</button>
    </div> 
    <div class="col"></div> 
  </div>
  <br/>
  <div class="row">
    <div class="col"></div>
    <div class="col">
    <button type="button" onClick={()=>{navigate("/Sherry Man")}} class="btn btn-primary btn-lg">Sherry Man</button>
    </div> 
    <div class="col"></div> 
  </div>
  <br/>
  <div class="row">
    <div class="col"></div>
    <div class="col">
    <button type="button" onClick={()=>{navigate("/Parveen")}} class="btn btn-primary btn-lg">Parveen</button>
    </div> 
    <div class="col"></div> 
  </div>
  <br/>
  <div class="row">
    <div class="col"></div>
    <div class="col">
    <button type="button" onClick={()=>{navigate("/Rohit Motta")}} class="btn btn-primary btn-lg">Rohit Motta</button>
    </div> 
    <div class="col"></div> 
  </div>
  
</div>
      
</div> 
    
  )
}

export default Home
