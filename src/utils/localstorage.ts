import { InitialDoNotes } from "./initial-todos";
const _name_:string = "todonotes";


export class LocalStorage {
    
    todos:TodoNote[]  = JSON.parse(localStorage.getItem(_name_) || JSON.stringify(InitialDoNotes));

    get():TodoNote[]{
        return this.todos;
    }
    set(todos:TodoNote[]):void{
        this.todos = todos;
        localStorage.setItem(_name_, JSON.stringify(this.todos));
    }
}