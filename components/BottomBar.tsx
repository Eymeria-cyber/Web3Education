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
// from: https://flowbite.com/docs/components/bottom-navigation/
export default function BottomBar(props: Props) {
    const { activePage } = props;
    const isActive = (page: NavPage) => page === activePage;
    return <div className="flex justify-around bg-slate-500">
        <Button color={isActive(NavPage.Lesson) ? 'primary' : 'default'}><Link href={"/lesson"}>Lesson</Link></Button>
        <Button color={isActive(NavPage.Activity) ? 'primary' : 'default'}><Link href={"/activity"}>Activity</Link></Button>
        <Button color={isActive(NavPage.Profile) ? 'primary' : 'default'}><Link href={"/profile"}>Profile</Link></Button>
    </div>

}