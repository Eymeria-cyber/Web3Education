import { Button } from "@nextui-org/react";
import classNames from "classnames";
import Link from "next/link";
import styles from './Button.module.css'
import { PrimaryButton } from "./Button";

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
        <PrimaryButton className="text-white" active={isActive(NavPage.Courses)}><Link href={"/courses"}>Courses</Link></PrimaryButton>
        <PrimaryButton className="text-white" active={isActive(NavPage.Activity)}><Link href={"/activity"}>Activity</Link></PrimaryButton>
        <PrimaryButton className="text-white" active={isActive(NavPage.Profile)}><Link href={"/profile"}>Profile</Link></PrimaryButton>
    </div>

}