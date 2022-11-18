import React ,{useState,useRef,useEffect} from 'react'
import {Todo} from '../model'
import { AiFillEdit,AiFillDelete } from "react-icons/ai";
import { IoMdDoneAll } from "react-icons/io";
import './styles.css';

type Props ={
    todo:Todo ;
    todos:Todo[] ;
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;

}
const SingleTodo:React.FC<Props> = ({todo,todos,setTodos})=>{
   
   const[edit,setEdit]= useState<boolean>(false)
   const[editTodo,setEditTodo]=useState<string>(todo.todo)
    const handleDone = (id:number)=>{
        setTodos(todos.map((todo)=> todo.id===id?{...todo,isDone:!todo.isDone}:todo))
   }
   const handleEdit = (e:React.FormEvent,id:number)=>{
    e.preventDefault();
    setTodos(todos.map((todo)=>(
        todo.id===id?{...todo, todo:editTodo}:todo
    )));
    setEdit(false);
   }
   const handleDelete= (id:number)=>{
    setTodos(todos.filter((todo)=>todo.id !==id))
   }
   useEffect(()=>{

    inputRef.current?.focus();
   },[edit])
   const inputRef = useRef<HTMLInputElement>(null)
    return(
        <form className="todos__single" onSubmit={(e)=>handleEdit(e,todo.id)} >
            {
                edit ? (
                    <input className="todos__single--text" ref={inputRef} value={editTodo} onChange={(e)=>setEditTodo(e.target.value)} />
                ):todo.isDone?(
                    <s className='todos__single--text'>{todo.todo}</s>
                ):(
                    <span className='todos__single--text'>{todo.todo}</span>
                )
            }

            {/* {
                todo.isDone ?(
                    <s className="todos__single--text">
                    {todo.todo}
                 </s>
                ):(
                    <span className="todos__single--text">
                    {todo.todo}
                 </span>
                )
            } */}
           
             <div>
                <span className="icon" onClick={ ()=>
                   { if (!edit && !todo.isDone){
                        setEdit(!edit)
                    }}
                } >
                    <AiFillEdit/>
                    
                </span>
                <span className="icon" onClick={()=>handleDelete(todo.id)}>
                    
                    <AiFillDelete/>
                    
                </span>
                <span className="icon" onClick={()=>handleDone(todo.id)} >
                    <IoMdDoneAll/>
                </span>
             </div>
        </form>
    )
}

export default SingleTodo