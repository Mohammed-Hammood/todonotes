import { Modal, ICON, Button } from "components";
import { ThemeContext, TodoContext } from "context";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";


export const Header = (): JSX.Element => {
    const { theme, themeToggle } = useContext(ThemeContext);
    const { activeTodo, order, setOrder } = useContext(TodoContext);
    const [deleteTodo, setDeleteTodo] = useState<null | TodoNote>(null);
    const [editTodo, setEditTodo] = useState<null | TodoNote>(null);
    const [searchModal, setSearchModal] = useState<boolean>(false);
    const [addModal, setAddModal] = useState<boolean>(false);

    return (
        <>
            <header className="navbar-header">
                <nav className='navbar-container'>
                    <div className='navbar-group'>
                        <Link to={"/"}>
                            <ICON name='house-solid' color='white' />
                        </Link>
                        <Button shape={"transparent"} title="Add" onClick={() => setAddModal(true)}>
                            <ICON name='plus-solid' color='white' />
                        </Button>
                        <Button shape={"transparent"} title="Order" onClick={() => setOrder(order === 'id' ? "-id" : "id")}>
                            <ICON name={order === 'id' ? "sort-up-solid" : "sort-down-solid"} color='white' />
                        </Button>
                        {activeTodo && <>
                            <Button
                                shape={"transparent"}
                                title="Edit"
                                onClick={() => setEditTodo(activeTodo)}
                            >
                                <ICON name='pen-to-square-solid' color='white' />
                            </Button>
                            <Button
                                title="Delete"
                                shape={"transparent"}
                                onClick={() => setDeleteTodo(activeTodo)}
                            >
                                <ICON name={'trash-solid'} color='white' />
                            </Button>
                        </>}
                    </div>
                    <div className="navbar-group">
                        <Button
                            shape={"transparent"}
                            onClick={themeToggle}
                            title={theme === 'dark' ? "Light mode": "Dark model"}
                            id={theme === 'dark' ? "light-mode-btn": "dark-mode-btn"}
                        >
                            <ICON
                                name={theme === "dark" ? 'sun-solid' : 'moon-solid'}
                                color={theme === 'dark' ? 'yellow' : 'white'}
                            />
                        </Button>
                        <Button
                            shape={"transparent"}
                            title="Search"
                            onClick={() => setSearchModal(true)}
                        >
                            <ICON name='search' color='white' />
                        </Button>
                    </div>

                </nav>
            </header>
            {<Modal
                isOpen={searchModal}
                close={() => setSearchModal(false)}
                form='search'
                title={"Search"}
            />}
            <Modal
                isOpen={addModal}
                close={() => setAddModal(false)}
                form='add-edit'
                title={"Add new todo"}
            />
            <Modal
                isOpen={editTodo !== null}
                close={() => setEditTodo(null)}
                form='add-edit'
                title={"Edit todo"}
                {...{ todo: activeTodo }}
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