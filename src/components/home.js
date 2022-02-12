import './styling/home.scss';
import { getActiveToDoId, getToDoList, updateToDoList, getToDo, searchToDoByName } from './localStorage';
import { useState } from 'react';
import { getFullDate, modalToggle, mouseDown } from './DOM';
import SVG from './SVG';

export default function Home (){
    const [todolist, setToDoList] = useState(getToDoList());
    const [activeToDoId, setActiveDoDoId] = useState(getActiveToDoId());
    const [searchResult, setSearchResult] = useState([]);
    const changeToDoList = (activeId)=> {
        localStorage.setItem("active", activeId);
        setActiveDoDoId(activeId);
    }
    const handleToDoList = (event)=> {
        event.preventDefault();
        const name = document.getElementById("name-input");
        const description = document.getElementById("description-textarea");
        const operation = document.getElementById("operation-name").innerText;
        let processStatus = 'waiting';
        const checkedStatus = document.querySelector("input[name='process-status']:checked").value;
        if(['in-process', 'waiting', 'completed'].includes(checkedStatus)){processStatus = checkedStatus;}
        const newToDo = {
            name: name.value,
            id:getToDoList().length,
            date: getFullDate(),
            description:description.value.trim(),
            processStatus:processStatus
        };
        if(operation === 'Search'){
           const search = document.getElementById("search-input");
           const resultContainer = document.getElementById("search-result-container");
           const countContainer = document.getElementById("count-container");
           if(search.value.trim().length > 0){
               const result = searchToDoByName(search.value.trim());
               resultContainer.classList.remove("hidden");
               countContainer.innerText = `Result: ${result.length}`;
               setSearchResult(() => result);
           }
        }
        else if(operation === 'Delete'){
            updateToDoList({activeToDoId:activeToDoId, operation:operation});
            modalToggle({operation:operation, activeToDoId:activeToDoId});
            if(activeToDoId >= getToDoList().length){localStorage.setItem("active", getToDoList().length -1)}
            setToDoList(() => getToDoList() );
            setActiveDoDoId(getActiveToDoId);
        }
        else if(name.value.trim().length > 0){
            updateToDoList({newToDo:newToDo, operation:operation, activeToDoId:activeToDoId});
            modalToggle({operation:operation, activeToDoId:activeToDoId});
            name.value = "";
            description.value = "";
            setToDoList(() => getToDoList() );
        }
    }

    return (<div className="main-content-container">
            <div className='navbar-container'>
                <div className='left-buttons-container'>
                    <div className='icon-container' title="Add" onClick={()=>modalToggle({operation:"Add", activeToDoId:activeToDoId})}>
                        <SVG class='navbar-buttons' name='plus' color='white' />
                    </div>
                    {(getToDoList().length > 0 )?<>                  
                        <div className='icon-container' title="Edit" onClick={()=> modalToggle({operation:"Edit", activeToDoId:activeToDoId})}>
                            <SVG class='navbar-buttons' name='edit' color='white' />
                        </div>
                        <div className='icon-container' title="Delete" onClick={()=> modalToggle({operation:"Delete", activeToDoId:activeToDoId})}>
                            <SVG class='navbar-buttons' name='trash' color='white' />
                        </div>
                    </>:""}
                </div>
                {(getToDoList().length > 0 )?<>     
                    <div className='icon-container' title="Search" onClick={()=> modalToggle({operation:"Search", activeToDoId:activeToDoId})}>
                        <SVG name='search' color='white' class="navbar-buttons" />
                    </div>
                </>:""}
            </div>
            <div className='content-container'>
                <div className='left-container' id='left-container'>
                    { todolist.map((item, key)=> {
                        return <button className={(getActiveToDoId() === key)?`todolist  ${item.processStatus}`:`${item.processStatus}-hover todolist`} id={key} key={key} onClick={()=> changeToDoList(key)}>{item.name}</button>
                    })}
                </div>
                <div className='center-container' id='center-container' onMouseDown={(event)=> mouseDown(event) } ></div>
                <div className='right-container' id='right-container'>
                { todolist.map((item, key)=> {
                    if(getActiveToDoId() === key){
                        return <div key={key} >
                                    <div className={`header-container ${item.processStatus}`} id='header-container'>
                                        <div>Name: {item.name}</div>
                                        <div>Process Status: {item.processStatus}</div>
                                        <div>Date added: {item.date }</div>
                                    </div>
                                    <div className='description-container'>{item.description}</div>
                            </div>
                    }
                    return null;
                    })}
                </div>
            </div>
            <div className='modal-container hidden' id='modal-container'>
                <div className='modal-content-container'>
                    <div className='shadow' onClick={()=> modalToggle({activeToDoId:activeToDoId})}></div>
                    <div className='body'>
                        <div className='operation-name-container'>
                            <span className='operation-name' id='operation-name'></span>
                        </div>

                            <div className='inputs-container' id='inputs-container'>
                                <label htmlFor='name-input'>Name: 
                                    <input name='name' type='text' placeholder='Name..' id='name-input' required />
                                </label>
                                <label htmlFor='description-textarea'>Description: 
                                    <textarea name='description' placeholder='Note..' id='description-textarea' ></textarea>
                                </label> 
                                <div className='process-status-container'>
                                    <div>Process Status:</div>
                                    <div>
                                        <input type="radio" id="completed" name="process-status" value="completed"></input>
                                        <label htmlFor="completed">Completed</label> 
                                    </div>
                                    <div>
                                        <input type="radio" id="in-process" name="process-status" value="in-process"></input>
                                        <label htmlFor="in-process">In process</label> 
                                    </div>
                                    <div>
                                        <input type="radio" id="waiting" name="process-status" value="waiting"></input>
                                        <label htmlFor="waiting">Waiting</label> 
                                    </div>
                                </div>
                                
                            </div>
                            <div className='search-container' id='search-container'>
                                <div className='count-container' id='count-container'></div>
                                <div className='search-result-container' id='search-result-container'>
                                    {searchResult.map((item, key)=> {
                                        return <div className='todos' key={key} id={item.id} onClick={()=>{
                                            localStorage.setItem('active', item.id);
                                            modalToggle({activeToDoId:item.id});
                                            setActiveDoDoId(parseInt(item.id));
                                        }}>{item.name}</div>
                                    })}
                                </div>
                                <label htmlFor='search-input'>Search ToDo by the name:
                                    <input name='search' type='text' placeholder='Search..' id='search-input' />
                                </label>
                            </div>
                            <div className='text-container' id='text-container'>
                                <p>Do you want to delete "{getToDo(activeToDoId).name}"?</p>
                            </div>
                            <div className='buttons-container'>
                                    <button type='submit' className='save-button' onClick={(event)=> handleToDoList(event)}>
                                        <span id='submit-button'></span>
                                    </button>
                                    <button className='button' type='button' onClick={()=>  modalToggle({activeToDoId:activeToDoId})}>
                                        <span>Close</span>
                                    </button>
                            </div>
                        
                    </div>
                </div>
            </div>
        </div>)
}