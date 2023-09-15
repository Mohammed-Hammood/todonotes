import Forms from "components/forms";
import { ICON } from "components";
import Portal from "components/portal";

type Props = {
    form: FormsNames;
    title?: string | JSX.Element;
    isOpen: boolean;
    close: () => void;
}

export const Modal = (props: Props): JSX.Element | null => {

    const { form, title, isOpen, close } = props;

    return (
        isOpen ?
            <Portal>
                <div className='content'>
                    <div className="header">
                        <div className='title'>
                            {title}
                        </div>
                        <button className="close" onClick={() => close()}>
                            <ICON name={"xmark-solid"} color="#fff" />
                        </button>
                    </div>
                    <div className='body'>
                        {Forms({ form, ...{ props, close } })}
                    </div>
                </div>
            </Portal>
            : null
    )
}