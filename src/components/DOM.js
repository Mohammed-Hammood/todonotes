import { getActiveToDoId, getToDo } from "./localStorage";
var initialWindowWidth = window.innerWidth;

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
            const toDo = getToDo(activeToDoId);
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
        }
    }else{
        container.classList.add("hidden");
        document.getElementById("name-input").value = '';
        document.getElementById("description-textarea").value = '';       
    }
}

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
            left.style.width = rectLeft.width - newX + "px";
           right.style.width= rectRight.width + newX + "px";
        }
        else {
             window.removeEventListener("mousemove", mouseMove);
             right.style.width = "8%";
             left.style.width =  "92%";
             center.style.left = "92%";
        }
        prevX = event.clientX;
        let leftOfCenterDiv = center.style.left.split(".");
        if(parseInt(leftOfCenterDiv[0]) < left.clientWidth){resetWindow(true);}
    }
    if(window.getSelection || document.selection){
        (window.getSelection ? window.getSelection() : document.selection).empty()
    }
    function mouseUp(event){
        window.removeEventListener("mousemove", mouseMove);    
    }
}
window.addEventListener("resize", resetWindow);
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