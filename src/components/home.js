import './styling/home.scss';
import { getActiveToDoId, getToDoList, updateToDoList, getToDo, searchToDoByName } from './localStorage';
import { useState } from 'react';
import { modalToggle, mouseDown } from './DOM';

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
        const newToDo = {
            name: name.value,
            id:getToDoList().length,
            date: new Date(),
            description:description.value.trim(),
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
                <button className='add-button' onClick={()=>modalToggle({operation:"Add", activeToDoId:activeToDoId})}>
                    Add
                </button>  
                <button className='add-button' onClick={()=> modalToggle({operation:"Edit", activeToDoId:activeToDoId})}>
                    Edit
                </button>
                <button className='add-button' onClick={()=> modalToggle({operation:"Delete", activeToDoId:activeToDoId})}>
                    Delete
                </button>
                <button className='add-button' onClick={()=> modalToggle({operation:"Search", activeToDoId:activeToDoId})}>
                    Search
                </button>
            </div>
            <div className='content-container'>
                <div className='left-container' id='left-container'>
                    { todolist.map((item, key)=> {
                        return <button className={(getActiveToDoId() === key)?'todolist active':'todolist'} id={key} key={key} onClick={()=> changeToDoList(key)}>{item.name}</button>
                    })}
                </div>
                <div className='center-container' id='center-container' onMouseDown={(event)=> mouseDown(event) } ></div>
                <div className='right-container' id='right-container'>
                { todolist.map((item, key)=> {
                    if(getActiveToDoId() === key){
                        return <div key={key} >{item.description}</div>
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