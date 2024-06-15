import { Card, CardBody, CardFooter, CardHeader, Divider, Link, Image, Button } from "@nextui-org/react";
import { FC } from "react";
type Props = {
    course: {
        id: number
        title: string
        description: string
        unlocked: boolean
    }
}
export const CourseListItem: FC<Props> = (props) => {
    const { course } = props

    return <Card >
        <CardHeader className="flex gap-3">
            <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                width={40}
            />
            <div className="flex flex-col">
                <p className="text-medium">{course.title}</p>
                <p className="text-small text-default-500">{course.description}</p>
            </div>
        </CardHeader>
        <Divider />
        <CardFooter className="flex justify-end">
            {course.unlocked && <Button color="primary" variant="solid">Free To Learn</Button>}
            {!course.unlocked && <Button color="secondary" variant="solid">Staking To Unlock</Button>}

        </CardFooter>
    </Card>
}