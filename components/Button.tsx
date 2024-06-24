import { Button } from "@nextui-org/react"
import classNames from "classnames"
import styles from './Button.module.css'
import { FC } from "react";

type Props = {
    active?: boolean;
    onClick?: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
    className?: string;
}
export const PrimaryButton: FC<Props> = (props) => {
    const { active = false, onClick, children, disabled, className } = props
    return <Button onClick={onClick} disabled={disabled} className={classNames(styles.button, className, {
        [styles.active]: active
    })}>{children}</Button>
}

export const SecondButton: FC<Props> = (props) => {
    const { active = false, onClick, children, disabled, className } = props
    return <Button onClick={onClick} disabled={disabled} className={classNames(styles.button, styles.secondary, className, {
        [styles.active]: active
    })}>{children}</Button>
}

export const ThirdButton: FC<Props> = (props) => {
    const { active = false, onClick, children, disabled } = props
    return <Button onClick={onClick} disabled={disabled} className={classNames(styles.button, styles.third, {
        [styles.active]: active
    })}>{children}</Button>
}