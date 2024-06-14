import { NavPage } from "../../components/BottomBar";
import RootLayout from "../../components/RootLayout";
import { NextPageWithLayout } from "../_app";

const ActivityPage: NextPageWithLayout = () => {
    return (
        <div>
        <h1>Activity</h1>
        </div>
    );
}
ActivityPage.getLayout = (page) => <RootLayout activePage={NavPage.Activity}>{page}</RootLayout>;

export default ActivityPage;