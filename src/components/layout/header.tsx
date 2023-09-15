import { Modal } from "components";
import { ICON } from "components";
import { TodoContext } from "context";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";


export const Header = () => {
    const { todos, activeTodo } = useContext(TodoContext);
    const [deleteTodo, setDeleteTodo] = useState<null | TodoNote>(null);
    const [editTodo, setEditTodo] = useState<null | TodoNote>(null);
    const [searchModal, setSearchModal] = useState<boolean>(false);
    const [addModal, setAddModal] = useState<boolean>(false);

    return (
        <>
            <header>
                <nav className='navbar-container'>
                    <div className='left-buttons-container'>
                        <Link to={"/"}>
                            Home
                        </Link>
                        <div className='icon-container' title="Add" onClick={() => setAddModal(true)}>
                            <ICON class='navbar-buttons' name='plus-solid' color='white' />
                        </div>
                        {activeTodo && <>
                            <div className='icon-container' title="Edit" onClick={() => setEditTodo(activeTodo)}>
                                <ICON
                                    class='navbar-buttons'
                                    name='pen-to-square-solid'
                                    color='white'
                                />
                            </div>
                            <div className='icon-container' title="Delete" onClick={() => setDeleteTodo(activeTodo)}>
                                <ICON
                                    class='navbar-buttons'
                                    name={'trash-solid'}
                                    color='white'
                                />
                            </div>
                        </>}
                    </div>
                    {todos.length > 0 && <>
                        <button
                            className='icon-container'
                            title="Search"
                            onClick={() => setSearchModal(true)}
                        >
                            <ICON name='search' color='white' class="navbar-buttons" />
                        </button>
                    </>}
                </nav>
            </header>
            {<Modal
                isOpen={searchModal}
                close={() => setSearchModal(false)}
                form='search'
                title={<span>Search</span>}
            />}
            <Modal
                isOpen={addModal}
                close={() => setAddModal(false)}
                form='add-edit'
                title={<span>Add new todo</span>}
            />
            <Modal
                isOpen={editTodo !== null}
                close={() => setEditTodo(null)}
                form='add-edit'
                title={<span>Edit todo</span>}
            />

            <Modal
                isOpen={deleteTodo !== null}
                close={() => setDeleteTodo(null)}
                form='delete'
                title={"Delete todo"}
            />
        </>
    )
}