import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todosData",
    initialState: {
        todos: [] as string[],
        text: ""
    },
    reducers: {
        addTodo(state:any){
            state.todos = [...state.todos, {title: state.text, completed: false, id: Date.now()}];
            state.text = "";
        }, 
        submitTodoText(state:any, action:any){
            state.text = action.payload;
        },
        setCompleted(state:any, action:any){
            state.todos = state.todos.map((todo:any) => {
                if(todo.id === action.payload){
                    return {...todo, completed: true}
                }
                return todo;
            });
        }, 
        setIncomplete(state:any, action:any){
            state.todos = state.todos.map((todo:any) => {
                if(todo.id === action.payload){
                    return {...todo, completed: false}
                }
                return todo;
            })
        },
        deleteTodo(state:any, action:any){
            state.todos = state.todos.filter((todo:any) => todo.id !== action.payload);
        }
    }
});

export const { addTodo, submitTodoText, setCompleted, setIncomplete, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;