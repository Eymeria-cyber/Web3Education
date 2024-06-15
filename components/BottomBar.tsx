import { Button, ButtonGroup } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";

export enum NavPage {
    Lesson,
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
        <Button color='primary' variant={isActive(NavPage.Lesson) ? 'solid' : 'flat'}><Link href={"/lesson"}>Lesson</Link></Button>
        <Button color='primary' variant={isActive(NavPage.Activity) ? 'solid' : 'flat'}><Link href={"/activity"}>Activity</Link></Button>
        <Button color='primary' variant={isActive(NavPage.Profile) ? 'solid' : 'flat'}><Link href={"/profile"}>Profile</Link></Button>
    </div>

}