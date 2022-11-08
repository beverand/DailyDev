const express = require('express')
const router = express.Router()
const todosController = require('../controllers/todos') 
const profileController = require('../controllers/profile') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, todosController.getTodos)

router.get('/getProfile', profileController.getProfile)

router.post('/createTodo', todosController.createTodo)

router.put('/answerTodo', todosController.answerTodo)
//router.put('/markComplete', todosController.markComplete)

//router.put('/markIncomplete', todosController.markIncomplete)

router.delete('/deleteTodo', todosController.deleteTodo)

module.exports = router