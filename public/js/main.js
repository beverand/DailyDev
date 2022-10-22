const deleteBtn = document.querySelectorAll('.del')
const reviewBtn = document.querySelectorAll('.rev')
const answerBtn = document.querySelectorAll('.ans')
// const todoItem = document.querySelectorAll('span.not')
// const todoComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(reviewBtn).forEach((el)=>{
    el.addEventListener('click', reviewTodo)
})

Array.from(answerBtn).forEach((el)=>{
    el.addEventListener('click', answerTodo)
})

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    console.log('Clicked')
    console.log(JSON.stringify(this.parentNode.dataset))
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log("delete", response)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function answerTodo(){
    const todoId = this.parentNode.dataset.id
    toggle('qAns'+todoId)
    try{
        const response = await fetch('todos/answerTodo', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function reviewTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/reviewTodo', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

function toggle(x) {
	if (document.getElementById(x).style.display == 'none') {
		document.getElementById(x).style.display = '';
	} else {
		document.getElementById(x).style.display = 'none';
	}
}