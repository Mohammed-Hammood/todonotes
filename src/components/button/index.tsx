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
    type?: "submit" | "button";
    width?: "fit-content" | "fill";
    className?:string;
}

export const Button: React.FC<Props> = ({ children,className, bg, width, shape,radius,  onClick, ...rest }): JSX.Element => {

    return (
        <button
            onClick={onClick}
            className={clsx(
                cls.button,
                className,
                {
                    [cls.filled]: shape === 'filled',
                    [cls.outline]: shape === 'outline',
                    [cls.transparent]: shape === 'transparent',
                    [cls.danger]: bg === 'danger',
                    [cls.primary]: bg === 'primary',
                    [cls.radius]: radius,
                    [cls.fullWidth]: width === 'fill',
                })}
            {...rest}
        >
            {children}
        </button>
    )
}
