import { getActiveToDoId, getToDoNote } from "./localStorage";
//a varialbe saves the original width of the window, so when the user changes the window size "not the divs", resetWindow Function will be called
//переменная сохраняет исходную ширину окна, поэтому, когда пользователь изменяет размер окна "не div", будет вызываться функция сброса окна
var initialWindowWidth = window.innerWidth;

//function shows the specific content "DELETE/ADD/SEARCH/EDIT" in the popup window or hides. operation variable tells which operation should perform DELETE/ADD/...
//функция показывает конкретное содержимое "УДАЛИТЬ/ДОБАВИТЬ/ПОИСК/РЕДАКТИРОВАТЬ" во всплывающем окне или скрывает. переменная операции сообщает, какая операция должна выполнять DELETE/ADD/...
export const modalToggle = ({operation='', activeToDoId=getActiveToDoId()})=> {
    const container = document.getElementById("modal-container");
    if(container.className.includes("hidden")){
        container.classList.remove("hidden");      
        const operationName = document.getElementById("operation-name"); 
        const submitBtn = document.getElementById("submit-button"); 
        const inputsContainer = document.getElementById("inputs-container");
        const textContainer = document.getElementById("text-container");
        const searchContainer = document.getElementById("search-container");
        const processStatusButton = document.querySelectorAll("input[name='process-status']");
        operationName.innerText = operation;
        operationName.classList = operation;
        if(operation === 'Search'){
            document.getElementById("count-container").innerText = '';
            document.getElementById("search-result-container").classList.add("hidden");
            submitBtn.innerText = "Search";
            inputsContainer.classList.add("hidden");
            textContainer.classList.add("hidden");
            searchContainer.classList.remove("hidden");
            document.getElementById("search-input").value = '';            
        }
        else if(operation === 'Edit'){
            submitBtn.innerText = "Save";
            inputsContainer.classList.remove("hidden");
            searchContainer.classList.add("hidden");
            textContainer.classList.add("hidden");
            const name = document.getElementById("name-input");
            const description = document.getElementById("description-textarea");
            const toDo = getToDoNote(activeToDoId);
            name.value = toDo.name;
            description.value = toDo.description;
            for(let i =0; i<processStatusButton.length; i++){
                if(processStatusButton[i].value === toDo.processStatus){
                    processStatusButton[i].checked = true;
                }else {
                    processStatusButton[i].checked = false;
                }
            }
        }else if(operation === 'Delete'){
            submitBtn.innerText = "Confirm";
            searchContainer.classList.add("hidden");
            inputsContainer.classList.add("hidden");
            textContainer.classList.remove("hidden");
            
        }else if (operation === 'Add'){
            submitBtn.innerText = "Add";
            searchContainer.classList.add("hidden");
            textContainer.classList.add("hidden");
            inputsContainer.classList.remove("hidden");
            document.querySelectorAll("input[name='process-status']")[2].checked = true;
        }
    }else{
        container.classList.add("hidden");
        document.getElementById("name-input").value = '';
        document.getElementById("description-textarea").value = '';       
    }
}
//function changes/resizes the width of the left column "div which contains all TODO notes names".
//функция изменяет/изменяет ширину левого столбца "div, который содержит имена всех заметок TODO".
export function mouseDown(event){
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
    const left = document.getElementById("left-container");
    const center = document.getElementById("center-container");
    const right = document.getElementById("right-container");
    let prevX = event.clientX;

    function mouseMove(event){
        let newX = prevX - event.clientX;
        const rectCenter = center.getBoundingClientRect();
        const rectLeft = left.getBoundingClientRect();
        const rectRight = right.getBoundingClientRect();
       
        if(right.clientWidth >= 50){
            center.style.left = rectCenter.left - newX + "px";
            left.style.width  = rectLeft.width - newX + "px";
            right.style.width = rectRight.width + newX + "px";
        }
        else {
             window.removeEventListener("mousemove", mouseMove);
             right.style.width = "8%";
             left.style.width =  "92%";
             center.style.left = "92%";
        }
        prevX = event.clientX;
        //a code resets the width of all "3 divs, center, left and right" divs when a deformation in the dimensions happens. 
        // код сбрасывает ширину всех "3 div, центр, левый и правый" div, когда происходит деформация размеров.
        let leftOfCenterDiv = center.style.left.split(".");
        if(parseInt(leftOfCenterDiv[0])+3 < left.clientWidth){resetWindow(true);}
    }
    function mouseUp(){
        window.removeEventListener("mousemove", mouseMove);    
    }
}
window.addEventListener("resize", resetWindow);
//functions reset the size of all the divs when called
//функции сбрасывают размер всех div при вызове
function resetWindow (reset=false){
    if(initialWindowWidth !== window.innerWidth || reset){
        const left = document.getElementById("left-container");
        const center = document.getElementById("center-container");
        const right = document.getElementById("right-container");
         initialWindowWidth = window.innerWidth;
         right.style.width = "70%";
         left.style.width =  "30%";
         center.style.left = "30%";
     }
}
//function creates date object by specific formats.
//функция создает объект даты по заданным форматам.
export const getFullDate = ()=> {
    const date = new Date();
    const year=  date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const display = (number)=> {return ((number < 10)?'0'+number:number);}
    const fullDate = year + '/' + display(month) + '/' + display(day) + ', '+ display(hours) + ':' + display(minutes);
    return fullDate; 
}