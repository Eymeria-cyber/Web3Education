
import { FC, useState } from "react";
import Flicking, { MoveEvent, WillChangeEvent } from "@egjs/react-flicking";
import "@egjs/react-flicking/dist/flicking.css";
import { CourseCard } from "./CourseCard";
type Props = {
    list: { title: string, description: string }[];
}
export const CourseCarousel: FC<Props> = (props) => {
    const { list } = props;
    return <Flicking hideBeforeInit={true} align="center" circular>
        {list.map((item, index) => <div className="w-full mx-5 h-auto" key={index}>
            <CourseCard title={item.title} description={item.description} />
        </div>)}
    </Flicking>
}
