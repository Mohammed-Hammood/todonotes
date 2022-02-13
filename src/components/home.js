import './styling/home.scss';
import { getActiveToDoId, getToDoList, updateToDoNote, getToDoNote, searchToDoByName } from './localStorage';
import { useState } from 'react';
import { getFullDate, modalToggle, mouseDown } from './DOM';
import SVG from './SVG';

export default function Home (){
    const [todolist, setToDoList] = useState(getToDoList());
    const [activeToDoId, setActiveDoDoId] = useState(getActiveToDoId());
    const [searchResult, setSearchResult] = useState([]);
    //to change the todo note when click on the todo note
    //чтобы изменить заметку TODO при нажатии на заметку TODO
    const changeToDoList = (activeId)=> {
        localStorage.setItem("active", activeId);
        setActiveDoDoId(activeId);
    }
    //when user clikcs on save/delete/add/confirm, this functions handles the changes
    //когда пользователь нажимает /save/add/confirm/search, эта функция обрабатывает изменения
    const handleToDoList = (event)=> {
        event.preventDefault();
        const name = document.getElementById("name-input");
        const description = document.getElementById("description-textarea");
        const operation = document.getElementById("operation-name").innerText;
        let processStatus = 'waiting';
       
        //when user clicks on search button, this will search in the localStorage and show result
        ////когда пользователь нажимает кнопку поиска, это будет выполнять поиск в локальном хранилище и показывать результат
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
        //when user clicks on confirm DELETION, THIS will handle all the changes
        //когда пользователь нажимает «Подтвердить УДАЛЕНИЕ», ЭТО будет обрабатывать все изменения
        else if(operation === 'Delete'){
            updateToDoNote({activeToDoId:activeToDoId, operation:operation});
            modalToggle({operation:operation, activeToDoId:activeToDoId});
            if(activeToDoId >= getToDoList().length){localStorage.setItem("active", getToDoList().length -1)}
            setToDoList(() => getToDoList() );
            setActiveDoDoId(getActiveToDoId);
        }
        //this when the user adds/edits TODO notes
        //это когда пользователь добавляет/редактирует заметки TODO
        else if(name.value.trim().length > 0){
            const checkedStatus = document.querySelector("input[name='process-status']:checked").value;
            if(['in-process', 'waiting', 'completed'].includes(checkedStatus)){processStatus = checkedStatus;}
            //new ToDo object that will be save in localstorage
            //Объект ToDo note, который будет сохранен в локальном хранилище 
            const newToDo = {
                name: name.value,
                id:getToDoList().length,
                date: getFullDate(),
                description:description.value.trim(),
                processStatus:processStatus
            };
            updateToDoNote({newToDo:newToDo, operation:operation, activeToDoId:activeToDoId});
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
                    {/* If there's no TODO note in the localStorage, then do not show the DELETE/EDIT/SEARCH icons in the navbar*/}
                    {/* Если в localStorage нет примечания TODO, не отображать значки УДАЛИТЬ/РЕДАКТИРОВАТЬ/ПОИСК на панели навигации. */}
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
                    {/*todolist is an array contains all the object "TODO notes" */}
                    {/*todolist - это массив, содержащий все объекты "заметки TODO" */}
                    { todolist.map((item, key)=> {
                        return <button className={(getActiveToDoId() === key)?`todolist  ${item.processStatus}`:`${item.processStatus}-hover todolist`} id={key} key={key} onClick={()=> changeToDoList(key)}>{item.name}</button>
                    })}
                </div>
                {/*the center-container div is the resizer */}
                {/*the center-container div - это изменение размера */}
                <div className='center-container' id='center-container' onMouseDown={(event)=> mouseDown(event) } ></div>
                <div className='right-container' id='right-container'>
                    <div className={`header-container ${getToDoNote(getActiveToDoId()).processStatus}`} id='header-container'>
                        <div>Name: {getToDoNote(getActiveToDoId()).name}</div>
                        <div>Process Status: {getToDoNote(getActiveToDoId()).processStatus}</div>
                        <div>Date added: {getToDoNote(getActiveToDoId()).date }</div>
                    </div>
                    <div className='description-container'>{getToDoNote(getActiveToDoId()).description}</div>
                </div>
            </div>
                {/* this modal "popup window" all in one, DELETE/SEARCH/EDIT/ADD  */}
                {/* это модальное "всплывающее окно" все в одном, УДАЛИТЬ/ПОИСК/РЕДАКТИРОВАТЬ/ДОБАВИТЬ  */}
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
                                            document.getElementById(item.id).scrollIntoView();
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
                                <p>Do you want to delete "{getToDoNote(activeToDoId).name}"?</p>
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