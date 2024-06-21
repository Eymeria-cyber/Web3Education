import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
  Image,
  Button,
} from '@nextui-org/react'
import classname from 'classnames'
import { useRouter } from 'next/router'
import { FC } from 'react'
import styles from './CourseListItem.module.css'
type Props = {
  course: {
    id: string
    title: string
    description: string
    free: boolean
    completed: boolean
    claimed: boolean
  }
}
export const CourseListItem: FC<Props> = (props) => {
  const { course } = props
  const router = useRouter()
  return (
    <Card className={styles.card}>
      <CardHeader className={classname("flex gap-3")}>
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-medium">{course.title}</p>
          <p className="text-small text-gray-700 text-default-500">{course.description}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardFooter className="flex justify-end">
        {course.free && (
          <Button color="primary" variant="solid">
            <Link
              // @ts-ignore
              href={`${router.asPath}/learning?id=${course._id}`}
              className="text-white"
            >
              Free To Learn
            </Link>
          </Button>
        )}
        {/* 链上的课程 */}
        {!course.free && <>
          {!course.completed && !course.claimed && <Button color="secondary" variant="solid">
            <Link
              href={`${router.asPath}/${course.id}/staking`}
              className="text-white"
            >
              Staking To Unlock
            </Link>
          </Button>}
          {/* 是否需要区分是否claimed？还是直接完成？ */}
          {course.completed && !course.claimed && <Button color="secondary" variant="solid">
            <Link
              href={`${router.asPath}/${course.id}/staking`}
              className="text-white"
            >
              Claim
            </Link>
          </Button>}
        </>}
      </CardFooter>
    </Card>
  )
}
