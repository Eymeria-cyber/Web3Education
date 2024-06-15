import { Button } from "@nextui-org/react";
import Link from "next/link";

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
        <Button color='primary' variant={isActive(NavPage.Courses) ? 'solid' : 'flat'}><Link href={"/courses"}>Courses</Link></Button>
        <Button color='primary' variant={isActive(NavPage.Activity) ? 'solid' : 'flat'}><Link href={"/activity"}>Activity</Link></Button>
        <Button color='primary' variant={isActive(NavPage.Profile) ? 'solid' : 'flat'}><Link href={"/profile"}>Profile</Link></Button>
    </div>

}