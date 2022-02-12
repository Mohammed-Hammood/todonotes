export const getToDoList = ()=> {
    const data = JSON.parse(localStorage.getItem("data")) || localStorage.setItem("data", JSON.stringify([])) || [];
    return data;
}

export const updateToDoList = ({operation=null, newToDo=null, acitveToDoId=getActiveToDoId()}) => {
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
export const updateActiveToDo = (newTodoList) => {
    const data = getToDoList();
    data.push(newTodoList);
    localStorage.setItem("data", JSON.stringify(data));
}
export const updateToDoListIds = ()=> {
    const data = getToDoList();
    let index = 0;
    for(let i = 0; i< data.length; i++){
        data[i].id = index;
        index++;
    }
    localStorage.setItem("data", JSON.stringify(data));
}
export const getActiveToDoId = () => {
  const active = parseInt(localStorage.getItem('active')) || localStorage.setItem("active", 0) || 0;
  if(active >= 0){return active;}
  localStorage.setItem("active", 0);
  return 0;
}
export const getToDo = (toDoId) => {
    const data = getToDoList()
    for(let i =0; i < data.length; i++){
        if(data[i].id === toDoId)return data[i];
    }
    return {};
}
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