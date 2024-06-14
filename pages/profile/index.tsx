import { NavPage } from "../../components/BottomBar";
import RootLayout from "../../components/RootLayout";
import { NextPageWithLayout } from "../_app";

const ProfilePage: NextPageWithLayout = () => {
    return (
        <div>
        <h1>Profile</h1>
        </div>
    );
}
ProfilePage.getLayout = (page) => <RootLayout activePage={NavPage.Profile}>{page}</RootLayout>;

export default ProfilePage;