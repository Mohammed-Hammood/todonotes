  const ToDoDeleteForm = (props:any) => {
    return (
        <>
            <div className='search-container' id='search-container'>
                <div className='count-container' id='count-container'></div>
                <div className='search-result-container' id='search-result-container'>
                    {/* {searchResult.map((item) => {
                        return <div className='todos' key={item.id} onClick={() => {
                            // document.getElementById(item.id).scrollIntoView();
                            // localStorage.setItem('active', item.id);
                            modalToggle({ activeToDoId: item.id });
                            // setActiveDoDoId(parseInt(item.id));
                        }}>{item.name}</div>
                    })} */}
                </div>
                <label htmlFor='search-input'>Search ToDo by the name:
                    <input name='search' type='text' placeholder='Search..' id='search-input' />
                </label>
            </div>
            <div className='buttons-container'>
                <button type='submit' className='save-button'
                // onClick={(event)=> handleToDoList(event)}
                >
                   Search
                </button>
                
            </div>
        </>
    )
}

export default ToDoDeleteForm;