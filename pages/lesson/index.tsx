import { Listbox, ListboxItem } from "@nextui-org/react";
import { NavPage } from "../../components/BottomBar";
import RootLayout from "../../components/RootLayout";
import { NextPageWithLayout } from "../_app";
import { MockLesson } from "./mock";
import { LessonSegmentCard } from "./LessonSegmentCard";

const LessonPage: NextPageWithLayout = () => {
    return (
        <div className="m-auto">
            <Listbox
                onAction={(key) => alert(key)}
                className="p-4"
            >
                {MockLesson.segments.map((segment, index) => <ListboxItem key={index}>{<LessonSegmentCard title={segment.title} description={segment.audioUrl}/>}</ListboxItem>)}
            </Listbox>
        </div>
    );
}
LessonPage.getLayout = (page) => <RootLayout activePage={NavPage.Lesson}>{page}</RootLayout>;

export default LessonPage;