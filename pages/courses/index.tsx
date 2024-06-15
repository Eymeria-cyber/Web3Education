import { Listbox, ListboxItem } from "@nextui-org/react";
import { NavPage } from "../../components/BottomBar";
import RootLayout from "../../components/RootLayout";
import { NextPageWithLayout } from "../_app";
import { MockCourseList } from "./mock";
import { CourseCarousel } from "./CourseCarousel";
import { CourseListItem } from "./CourseListItem";

const CoursePage: NextPageWithLayout = () => {
    return (
        <div>
            <CourseCarousel list={MockCourseList} />
            <Listbox
                aria-label="Actions"
                onAction={(key) => alert(key)}
            >
                {MockCourseList.map((lesson, index) => {
                    return <ListboxItem className="overflow-visible" key={index}><CourseListItem course={{...lesson, id: index, unlocked: index === 0}}/></ListboxItem>
                })}
            </Listbox>
        </div>
    );
}
CoursePage.getLayout = (page) => <RootLayout activePage={NavPage.Courses}>{page}</RootLayout>;

export default CoursePage;