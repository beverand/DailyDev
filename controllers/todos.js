const Question = require('../models/Question')
const Todo = require('../models/Todo')
const User = require('../models/User')

module.exports = {
    getTodos: async (req,res)=>{
        //console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            //const itemLeft = await Todo.countDocuments({userId:req.user.id,completed: false})
            const n = await User.find({_id:req.user._id}).select('questions')
            const m = await User.countDocuments({_id:req.user._id}).select('questions.Object.question')
            let r = n[0].questions
            let itemsLeft = 0
            let o = []
            for (x in n[0].questions){
                n[0].questions[x].response? itemsLeft + 0 : itemsLeft++
                let dataObject = {};
                dataObject['_id'] = r[x]._id  
                dataObject['todo'] = r[x].question
                dataObject['response'] = r[x].response
                dataObject['qsource'] = r[x].qsource
                dataObject['qtype'] = r[x].qtype
                o.push(dataObject);                             
            }
            let todoItem = o
            res.render('todos.ejs', {todos: todoItem, total: n[0].questions.length, user: req.user, left: n[0].questions.length - itemsLeft})
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            await Todo.create({
                todo: req.body.todoItem, completed: false, userId: req.user.id,
            })
            
            let newQ = await Question.create({
                question: req.body.todoItem, 
                response: req.body.newAns,
                qtype: 'undefined',
                qsource: 'self'
            })

            await User.updateOne(
                { "_id": req.user.id },
                {
                    $push: {
                        questions: newQ
                    }
                }
            );
            console.log('Question has been added!')
            await res.redirect('/todos')
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
            //await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            await Question.findOneAndDelete({_id:req.body.todoIdFromJSFile})
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