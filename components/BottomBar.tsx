import { Button } from "@nextui-org/react";
import classNames from "classnames";
import Link from "next/link";
import styles from './Button.module.css'

export enum NavPage {
    Courses,
    Activity,
    Profile,
}
type Props = {
    activePage: NavPage;
}
export default function BottomBar(props: Props) {
    const { activePage } = props;
    const isActive = (page: NavPage) => page === activePage;
    return <div className="flex justify-around mb-1">
        <Button className={classNames(styles.button, {
            [styles.active]: isActive(NavPage.Courses)
        })}><Link href={"/courses"}>Courses</Link></Button>
        <Button className={classNames(styles.button, {
            [styles.active]: isActive(NavPage.Activity)
        })}><Link href={"/activity"}>Activity</Link></Button>
        <Button className={classNames(styles.button, {
            [styles.active]: isActive(NavPage.Profile)
        })}><Link href={"/profile"}>Profile</Link></Button>
    </div>

}