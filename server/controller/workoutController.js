const Workout = require('../model/workoutModel');
const mongoose = require('mongoose')

//get all workous
const getWorkouts = async(req,res) =>{
  const workouts = await Workout.find({}).sort({createdAt : -1})
  res.status(200).json(workouts);
}

//get single Workout
const getSingleWorkout = async(req ,res) =>{
  const {id} = req.params;
  if(mongoose.Types.ObjectId.isValid(id)){
    
    const workout = await Workout.findById(id)
  
    if(!workout){
      return res.status(404).json({error : 'no such workout'})
    }
  
    res.status(200).json(workout)
  }else{
    return res.status(404).json({error : 'no such workout'})
  }

}

// creating a new workout
const createWorkout = async(req,res) =>{
  const {title , load , reps} = req.body;
  let emptyFields = []

  if(!title){
    emptyFields.push('title')
  }
  if(!load){
    emptyFields.push('load')
  }
  if(!reps){
    emptyFields.push('reps')
  }
  console.log(req.method , req.body , req.headers)
  if(emptyFields.length == 0){
    const workout = await Workout.create({title , load , reps})
    res.status(200).json(workout)
  }else{
    res.status(400).json({error :'Please Fill in All the Fields' , emptyFields})
  }
}

//delete workout
const deleteWorkout = async(req,res)=>{
  const {id} = req.params;
  if(mongoose.Types.ObjectId.isValid(id)){
    const workout = await Workout.findOneAndDelete({_id: id})
    if(!workout){
      return res.status(400).json({error : 'no such workout'})
    }
    res.status(200).json(workout)
  }else{
    return res.status(400).json({error : 'no such workout'})
  }
}

//update Workout
const updateWorkout = async(req ,res) =>{
  const {id} = req.params;

  if(mongoose.Types.ObjectId.isValid(id)){
    const workout = await Workout.findOneAndUpdate({_id: id} ,{
      ...req.body
    })
    if(!workout){
      return res.status(400).json({error : 'no such workout'})
    }
    res.status(200).json(workout)
  }else{
    return res.status(400).json({error : 'no such workout'})
  }
}

module.exports = {
  createWorkout,
  getWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout
}