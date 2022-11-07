const deleteBtn = document.querySelectorAll('.del')
const reviewBtn = document.querySelectorAll('.rev')
const answerBtn = document.querySelectorAll('.ans')
const saveAnsBtn = document.querySelectorAll("[id^='saveAns']")
const profileBtn =  document.querySelector('.profile')
let btnArray = new Set()

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(reviewBtn).forEach((el)=>{
    el.addEventListener('click', reviewTodo)
})

Array.from(answerBtn).forEach((el)=>{
    el.addEventListener('click', showAnswerBox)
})

Array.from(saveAnsBtn).forEach((el)=>{
    el.addEventListener('click', answerTodo)
})

profileBtn.addEventListener('click', getProfile)

async function deleteTodo(){//delete question
    const todoId = this.parentNode.dataset.id
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

function showAnswerBox(){
  let id = this.parentNode.dataset.id
  if (btnArray.has(id)){
    btnArray.delete(id)  
  }
  btnArray.forEach(i => {
    document.getElementById('qAns'+i).style.display = 'none'
    document.getElementById('saveAns'+i).style.display = 'none'
  })  
  btnArray.add(id)
  document.getElementById('qAns'+id).style.display = ''
  document.getElementById('saveAns'+id).style.display = ''
  document.getElementById('qAns'+id).focus()
}

async function answerTodo(){
    const todoId = this.parentNode.dataset.id
    let txtAreaVal = document.getElementById('qAns'+todoId).value.trim()
    let id = JSON.stringify(this.parentNode.dataset)
    console.log(id)
    if(txtAreaVal){
        try{
            const response = await fetch('todos/answerTodo', {
                method: 'put',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify({
                    //'id': id,
                    'todoIdFromJSFile' : todoId,
                    'respTextArea': txtAreaVal
                })
            })
            console.log(response)
            const data = await response.json()
            console.log(data)
            location.reload()
        }catch(err){
            console.log(err)
        }
    }else{
       document.getElementById('qAns'+todoId).style.display = 'none'
       document.getElementById('saveAns'+todoId).style.display = 'none'
    }
}

 async function getProfile(){
//     const todoId = this.parentNode.dataset.id
//     try{
//         const response = await fetch('todos/getProfile', {
//             method: 'get',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'todoIdFromJSFile': todoId
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
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

// function toggle(x) {
// 	if (document.getElementById(x).style.display == 'none') {
// 		document.getElementById(x).style.display = '';
// 	} else {
// 		document.getElementById(x).style.display = 'none';
// 	}
// }