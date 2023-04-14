import React,{useState} from 'react'

const Todo = () => {

    //DATE FUNCTION
    const date = new Date();
    const showTime = date.getDate() 
        + '/' +date.getMonth()
        + '/'+date.getFullYear()
        + ''
        + ' ' + date.getHours()
        + ':' + date.getMinutes();
      
    //Make an Array of Todo,updateTodo and Complete Todo lists respectively
    const[todo,setTodo]=useState([])
    const[updateTodo,setupdateTodo]=useState(" ");
    const[complete,setcomplete]=useState([])

    // When User going to write something/ Change something in field then this function will execute
    const handleNewTodoChange=(event)=>
    {
        setupdateTodo(event.target.value);
    }

    //When User Submit the form this function will execute
    const formsubmit=(events)=>
    {
        events.preventDefault(); //It will not redirect the page
        setTodo([...todo,updateTodo]); //setTodo update the value with last array of all element and updated arrays
    }

    // When user click on delete button this function will execute
    const dele=(index)=>{
        const newTodo=todo.filter((t,i) => i !==index)
        setTodo(newTodo)
    }

    //Clear the input text after one text will submit
    const clear=()=>
    {
        let clear_input=document.getElementById("inputtext")
        if(clear_input.value!==" ")
        {
            clear_input.value=" ";
        }
    }
    

    // Clear all Button will delete all the elements from division
    const clearall=(index)=>
    {
        complete.filter((t,i) => i !==index)
        setcomplete([])
        localStorage.clear()
    }

    //When user click on the checkbox and it will delete from list and add to the completed list as well 
    const comp=(index)=>
    {
        const complete_todo=todo.filter((c,p)=> p===index)    
        setcomplete(complete_todo)
        setcomplete([...complete,complete_todo])
        for(let i=0;i<complete_todo.length;i++){
            localStorage.setItem(`Tasks: `,complete)
        }

        const new_delete=todo.filter((t,i)=>i!==index)
        setTodo(new_delete)
    }
    const complete_delete=(index)=>
    {
        const newdelete=complete.filter((v,i)=> i!==index)
        setcomplete(newdelete)
        localStorage.removeItem(complete)
    }
    return (
        <>
    <form onSubmit={formsubmit}>
    <div className='container' id='first_division'>
        <div className='card'>
            <div className='card-header'>
        <h3>My Day</h3>
        <h5 id='date'>{showTime}</h5>
            </div>
            <div className='card-body' id='inputs'>
        <input type={"text"} placeholder={"Add a Task"} id={"inputtext"} onChange={handleNewTodoChange}/>
        <button id='submit' className='btn btn-primary mt-0 ms-2 pt-1 pb-1' onClick={clear} disabled={!todo}>Add</button>
            </div>
        </div>
    </div>

    </form>

    <div className='container-fluid' id='inner_div' >
        <h4>To Do's</h4>
    </div>
        <div className='container-fluid' id='main_list'>
    {
            todo.map((currentvalue,index)=>
            (
              <div className='card mt-3' id='card_element'>
                <div className='card-header'>
                    <h3>User</h3>
                </div>
                <div className='card-body' id='elements'>
                    <input type={'checkbox'} id="checkbox" className='ms-1 me-3' onClick={()=>comp(index)} data-bs-toggle="tooltip" title='Mark as Completed'/>
                    <label>{currentvalue}</label>
                    <button className='btn btn-dark float-end btn-outline-danger text-light' 
                    onClick={()=>dele(index)}>Delete</button>
                </div>
                </div>
            ))
        }
        </div>
          <div className='container-fluid mt-5' id='complete_div'>
            <h3>Completed To Do's</h3>
            {
                complete.map((currentvalue,index)=>
                (
                    <div className='card mt-3' id='card_element'>
                <div className='card-header'>
                    <h3>User</h3>
                </div>
                <div className='card-body' id='elements'>
                    <label>{currentvalue}</label>
                    <button className='btn btn-dark float-end btn-outline-danger text-light'
                     onClick={()=>complete_delete(index)}data-bs-toggle="tooltip" title='Delete'>Delete</button>
                </div>
                </div>
            ))
        }
        <button className='btn btn-danger text-dark btn-outline-warning' onClick={()=>clearall()}data-bs-toggle="tooltip" title='Clear All Tasks'>Clear All</button>
          </div>
    </>
  )
}
export default Todo