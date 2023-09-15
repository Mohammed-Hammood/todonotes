import { Button, ICON, Portal, Forms } from "components";
import { useCallback, useEffect } from "react";

type Props = {
    form: FormsNames;
    title?: string | JSX.Element;
    isOpen: boolean;
    close: () => void;
}

export const Modal = (props: Props): JSX.Element | null => {
    const { form, title, isOpen } = props;

    const close = useCallback(() => {
        const content = document.getElementById("content") as HTMLDivElement
        content.classList.replace("modalOpening", "modalClosing");

        let interval = setInterval(() => {
            clearInterval(interval);
            props.close();

        }, 990);
    }, [props])

    useEffect(() => {
        const handleClick = (e: MouseEvent): void => {

            const target = e.target as HTMLDivElement;

            if (target.className.toString() === "modal") close();

        }

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        }
    }, [close]);

    return (
        isOpen ?
            <Portal>
                <div className='content modalOpening' id="content">
                    <div className="header">
                        <div className='title'>
                            {title}
                        </div>
                        <Button className="close" onClick={() => close()}>
                            <ICON name={"xmark-solid"} color="#fff" />
                        </Button>
                    </div>
                    <div className='body'>
                        {Forms({ form, ...{ props, close } })}
                    </div>
                </div>
            </Portal>
            : null
    )
}