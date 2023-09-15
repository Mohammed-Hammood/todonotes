import React from "react";
import clsx from "clsx";
import cls from "./button.module.scss";


interface Props {
    children?: React.ReactNode;
    onClick?: () => void;
    shape?: ButtonShapes;
    title?: string;
    radius?:boolean;
    bg?:"primary" | "danger";
    type?: "submit" | "button"
}

export const Button: React.FC<Props> = ({ children, bg, shape,radius,  onClick, ...rest }): JSX.Element => {

    return (
        <button
            onClick={onClick}
            className={clsx(
                cls.button,
                {
                    [cls.filled]: shape === 'filled',
                    [cls.outline]: shape === 'outline',
                    [cls.transparent]: shape === 'transparent',
                    [cls.danger]: bg === 'danger',
                    [cls.primary]: bg === 'primary',
                    [cls.radius]: radius,
                })}
            {...rest}
        >
            {children}
        </button>
    )
}
