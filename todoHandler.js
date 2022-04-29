const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const todoSchema = require('./Schema/todoSchema')
const Todo = new mongoose.model("Todo",todoSchema)


router.get("/",async(req,res)=>{
    await Todo.find({}).select({
        _id: 0,
        _v: 0,
        date: 0,
      })
      .exec((err, data) => {
        if (err) {
          res.status(500).json({
            error: "There was a server side error!",
          });
        } else {
          res.status(200).json({
            result: data,
            message: "Success",
          });
        }
      });;
    
})


router.get("/:id",async(req,res)=>{
    try{
        const data = await Todo.find({_id:req.params.id})
        res.status(200).json({
            result: data,
            message: "Success",
          });

    }catch{
        res.status(500).json({
            error: "There was a server side error!",
          });
    }
})


router.post("/",async(req,res)=>{
    

    const newTodo = new Todo(req.body);
    await newTodo.save((err)=>{
        if(err){
            // console.log(err);
            res.status(500).json({
                error:"There was a server side error!"
            });

        }else{
            res.status(200).json({
                message:"Todo was inserted successfully"
            });
        }
    })
})


router.post("/all",async(req,res)=>{
    await Todo.insertMany(req.body,(err)=>{
        if(err){
            // console.log(err);
            res.status(500).json({
                error:"There was a server side error!"
            });

        }else{
            res.status(200).json({
                message:"Todos were inserted successfully"
            });
        }
    })
})

router.put("/:id",async(req,res)=>{
    
})


router.delete("/:id",async(req,res)=>{
    await Todo.deleteOne({_id:req.params.id},(err)=>{
        if(err){
            res.status(500).json({
                error:"There was a server side error!"
            });

        }else{
            res.status(200).json({
                message:"Todo were deleted successfully"
            });
        }
    });
})

module.exports = router