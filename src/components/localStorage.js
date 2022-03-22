import { fakeToDoNotes } from "./fake-initial-todos";
//localStorage.js contains all functions that do operation on localStorage and their names tell what they do.
//localStorage.js содержит все функции, которые выполняют операции с localStorage, и их имена говорят о том, что они делают.

//function returns/creates an array contains TODO notes in the local storage
//функция возвращает/создает массив, содержащий записи TODO в локальном хранилище

export const getToDoList = ()=> {
    let data = []; 
    if(localStorage.getItem('data') === null){
        //fake todo notes.
        data = fakeToDoNotes;
        localStorage.setItem("data", JSON.stringify(fakeToDoNotes));
    }else {
         data = JSON.parse(localStorage.getItem("data"));
    }
    return data;
}
//functions update (Add/DELETE/EDIT) object of TODO notes in the local storage. operation variable tells which operation shoud perform.
//функции обновляют (добавляют/удаляют/редактируют) объект TODO-заметок в локальном хранилище. переменная операции сообщает, какую операцию следует выполнить.
export const updateToDoNote = ({operation=null, newToDo=null, acitveToDoId=getActiveToDoId()}) => {
    const data = getToDoList();
    if(operation === 'Add'){
        data.push(newToDo);
        localStorage.setItem("data", JSON.stringify(data));
    }else if(operation === 'Edit'){
        let newData = []; 
        for(let i =0; i < data.length; i++){
            if(data[i].id !== acitveToDoId){
                newData.push(data[i]);
            }else {
                newData.push(newToDo);
            }
        }
        localStorage.setItem("data", JSON.stringify(newData));
    }else if(operation === 'Delete'){
        let newData = []; 
        for(let i =0; i < data.length; i++){
            if(data[i].id !== acitveToDoId){
                newData.push(data[i]);
            }
        }
        localStorage.setItem("data", JSON.stringify(newData));
    }
    updateToDoListIds();
}

//function updates TODO NOTE ids, when deletion hapens, some Ids will be missing and this will cause problems, so this function shifts the Ids of objects.
////функция обновляет идентификаторы TODO ПРИМЕЧАНИЕ. Когда происходит удаление, некоторые идентификаторы будут отсутствовать, и это вызовет проблемы, поэтому эта функция сдвигает идентификаторы объектов.
export const updateToDoListIds = ()=> {
    const data = getToDoList();
    let index = 0;
    for(let i = 0; i< data.length; i++){
        data[i].id = index;
        index++;
    }
    localStorage.setItem("data", JSON.stringify(data));
}
//functions returns/creates the id of the active TODO note (currently opened TODO note) in the local storage , 
//функции возвращают/создают id активной заметки TODO (открытой в данный момент заметки TODO) в локальном хранилище,
export const getActiveToDoId = () => {
  const active = parseInt(localStorage.getItem('active')) || localStorage.setItem("active", 0) || 0;
  if(active >= 0){return active;}
  localStorage.setItem("active", 0);
  return 0;
}
//functions returns specific TODO note by Id from local storage.
//функция возвращает конкретную заметку TODO по идентификатору из локального хранилища.
export const getToDoNote = (toDoNoteId) => {
    const data = getToDoList()
    for(let i =0; i < data.length; i++){
        if(data[i].id === toDoNoteId)return data[i];
    }
    return {};
}
//function search for TODO notes by the name and returns an array contains all TODO NOTE objects who contain a specific string.
//функция ищет заметки TODO по названию и возвращает массив, содержащий все объекты ЗАМЕТКИ ЗАДАНИЯ, которые содержат определенную строку. 
export const searchToDoByName = (toDoName)=> {
    const data = getToDoList();
    let result = [];
    for(let i = 0; i < data.length; i++){
        if(data[i].name.includes(toDoName.trim())){
            result.push(data[i]);
        }
    }
    return result;
}