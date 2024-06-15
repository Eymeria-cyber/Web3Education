import { FC } from "react";
import BottomBar, { NavPage } from "./BottomBar";
type Props = {
    children: React.ReactNode;
    activePage: NavPage;
}
const RootLayout: FC<Props> = (props) => {
    const { children, activePage } = props;
    return (
        <div className="h-screen flex flex-col gap-1">
            <div className="flex-1 overflow-scroll">{children}</div>
            <BottomBar activePage={activePage} />
        </div>
    )
}

export default RootLayout