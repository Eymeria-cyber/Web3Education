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
    <Card className="flex gap-3 p-2">
      <CardHeader className={classname("flex gap-3")}>
        <Image
          alt="nextui logo"
          height={48}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={48}
        />
        <div className="flex flex-col">
          <p className="text-large">{course.title}</p>
          <p className="text-small text-gray-700 text-default-500">{course.description}</p>
        </div>
      </CardHeader>
      <Divider className='mb-0 mx-3 w-auto'/>
      <CardFooter className="flex justify-end item-center pt-0">
        {course.free && (
          <SecondButton onClick={() => router.push(`${router.asPath}/learning?id=${course.id}`)}>
            <Link
              // @ts-ignore
              href={`${router.asPath}/learning?id=${course._id}`}
              className="text-white"
            >
              Free To Learn
            </Link>
          </SecondButton>
        )}
        
        {/* 链上的课程 */}
        {!course.free && <>
          {!course.completed && !course.claimed && <ThirdButton>
            <Link
              href={`${router.asPath}/${course.id}/staking`}
              className="text-white"
            >
              Staking To Unlock
            </Link>
          </ThirdButton>}
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
