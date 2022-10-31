const Question = require('../models/Question')
//const Todo = require('../models/Todo')
const User = require('../models/User')

module.exports = {
    getTodos: async (req,res)=>{
        try{
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
           const n = await User.find({_id:req.user._id}).select('questions')

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
    deleteTodo: async (req, res)=>{
        //console.log('deltodo',req.body.todoIdFromJSFile)
        try{
            await User.updateOne({ _id: req.user.id }, { $pull: { "questions": { _id: req.body.todoIdFromJSFile } } })
            console.log('Deleted Question')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    },
    answerTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile, req.body.respTextArea)    
        try{
            await User.findOneAndUpdate(
                {_id: req.user.id , "questions._id": req.body.todoIdFromJSFile } ,
                  {
                    $set: {"questions.response": req.body.respTextArea}
                  }
            )
            console.log('Answer Todo')
            res.json('Answer It')
        }catch(err){
            console.log(err)
        }
    },
    reviewTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await User.findOne({_id:req.body.todoIdFromJSFile})
            console.log('Review Todo')
            res.json('Review It')
        }catch(err){
            console.log(err)
        }
    }
}    