import { Button } from "@nextui-org/react"
import classNames from "classnames"
import styles from './Button.module.css'
import { FC } from "react";

type Props = {
    active?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
}
export const PrimaryButton: FC<Props> = (props) => {
    const { active = false, onClick, children } = props
    return <Button onClick={onClick} className={classNames(styles.button, {
        [styles.active]: active
    })}>{children}</Button>
}

export const SecondButton: FC<Props> = (props) => {
    const { active = false, onClick, children } = props
    return <Button onClick={onClick} className={classNames(styles.button, styles.secondary, {
        [styles.active]: active
    })}>{children}</Button>
}

export const ThirdButton: FC<Props> = (props) => {
    const { active = false, onClick, children } = props
    return <Button onClick={onClick} className={classNames(styles.button, styles.third, {
        [styles.active]: active
    })}>{children}</Button>
}