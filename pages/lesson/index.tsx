import { NavPage } from "../../components/BottomBar";
import RootLayout from "../../components/RootLayout";
import { NextPageWithLayout } from "../_app";

const LessonPage: NextPageWithLayout = () => {
    return (
        <div>
        <h1>Lesson</h1>
        </div>
    );
}
LessonPage.getLayout = (page) => <RootLayout activePage={NavPage.Lesson}>{page}</RootLayout>;

export default LessonPage;