import SearchForm from "./todo-search-form";
import AddEditForm from "./todo-add-edit-form";
import DeleteForm from "./todo-delete-form";

type Props = {
    form: FormsNames;
    props: any;
}
export const Forms = (props: Props) => {

    const _forms: Record<FormsNames, JSX.Element> = {
        "search": <SearchForm {...props.props} />,
        "add-edit": <AddEditForm {...props.props} />,
        "delete": <DeleteForm {...props.props} />,
    }

    return _forms[props.form];
}
