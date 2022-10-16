const Question = require('../models/Question')
const Todo = require('../models/Todo')
const User = require('../models/User')

module.exports = {
    getTodos: async (req,res)=>{
        //console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            const itemLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            const n = await User.find({_id:req.user._id}).select('questions')
            const m = await User.countDocuments({_id:req.user._id}).select('questions.Object.question')
            //console.log(JSON.stringify(n))
            //console.log(typeof n)
            let r = n[0].questions
            let itemsLeft = 0
            let o = []
            // let dataObject = {_id: 'test', complete: false};
            // o[0] = dataObject
            //console.log(o[0]._id)
            let counter = 0
            for (x in r){
                //console.log(n[0].questions[x].question + ': '+ n[0].questions[x].response) //=== 0? itemsLeft+1: 
                counter+=1
                if(n[0].questions[x].response){
                  itemsLeft + 0   
                } else 
                {
                  itemsLeft++
                  let dataObject = {};
                  dataObject['_id'] = r[x];
                  //console.log()
                  dataObject["todo"] = r[x].question
                  dataObject['completed'] = false;
                  dataObject['userId'] = req.user._id
                  o.push(dataObject);
                }                
            }
            let todoItem = o
            console.log(itemsLeft)
            console.log(JSON.stringify(todoItem))
            console.log(typeof o, Array.isArray(o))
            console.log(typeof todoItems,  Array.isArray(todoItems))
            res.render('todos.ejs', {todos: todoItem, left: itemsLeft, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({todo: req.body.todoItem, completed: false, userId: req.user.id})
            console.log('Todo has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    markComplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: true
            })
            console.log('Marked Complete')
            res.json('Marked Complete')
        }catch(err){
            console.log(err)
        }
    },
    markIncomplete: async (req, res)=>{
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
                completed: false
            })
            console.log('Marked Incomplete')
            res.json('Marked Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    answerTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile})
            console.log('Answer Todo')
            res.json('Answer It')
        }catch(err){
            console.log(err)
        }
    },
    reviewTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOne({_id:req.body.todoIdFromJSFile})
            console.log('Review Todo')
            res.json('Review It')
        }catch(err){
            console.log(err)
        }
    }
}    