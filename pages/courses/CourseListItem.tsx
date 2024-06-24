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
import { SecondButton, ThirdButton } from '../../components/Button'
type Props = {
  course: {
    _id: string
    title: string
    description: string
    free: boolean
    staked: boolean
    completed: boolean
    claimed: boolean
    pid: string
  }
}
export const CourseListItem: FC<Props> = (props) => {
  const { course } = props
  const { pid } = course
  const router = useRouter()
  return (
    <Card className="flex gap-3 p-2">
      <CardHeader className={classname("flex gap-3")}>
        <Image
          alt="nextui logo"
          height={48}
          radius="sm"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={100}
        />
        <div className="flex flex-col">
          <p className="text-large">{course.title}</p>
          <p className="text-small text-gray-700 text-default-500">{course.description}</p>
        </div>
      </CardHeader>
      <Divider className='mb-0 mx-3 w-auto'/>
      <CardFooter className="flex justify-end item-center pt-0">
        {course.free && (
          <Button onClick={() => router.push(`${router.asPath}/learning?id=${course._id}`)} color='success'>
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
          {!course.staked && <ThirdButton>
            <Link
              href={`${router.asPath}/${course._id}/staking?pid=${pid}`}
              className="text-white"
            >
              Staking To Unlock
            </Link>
          </ThirdButton>}
          {/* 是否需要区分是否claimed？还是直接完成？ */}
          {course.staked && !course.completed && <Button color="warning" variant="solid">
            <Link
              href={`${router.asPath}/learning?id=${course._id}&pid=${pid}`}
              className="text-white"
            >
              Continue
            </Link>
          </Button>}
        </>}
      </CardFooter>
    </Card>
  )
}
