import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NavPage } from "../../components/BottomBar";
import RootLayout from "../../components/RootLayout";
import { NextPageWithLayout } from "../_app";

const ProfilePage: NextPageWithLayout = () => {
    return (
        <div className="p-10">
            <ConnectButton />
        </div>
    );
}
ProfilePage.getLayout = (page) => <RootLayout activePage={NavPage.Profile}>{page}</RootLayout>;

export default ProfilePage;