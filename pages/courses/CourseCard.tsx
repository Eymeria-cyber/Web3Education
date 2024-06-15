import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
} from '@nextui-org/react'
import { FC } from 'react'

type Props = {
  title: string
  description: string
  // image: string;
}
export const CourseCard: FC<Props> = (props) => {
  const { title, description } = props
  return (
    <Card isFooterBlurred>
      <CardBody className="overflow-visible p-0">
        <Image
          alt="Card background"
          removeWrapper
          className="z-0 w-full h-full object-cover"
          src="https://nextui.org/images/hero-card-complete.jpeg"
        />
      </CardBody>
      <CardFooter className="absolute z-10 bottom-0 flex-col !items-start px-6 before:bg-black/100 shadow-small">
        <h4 className="text-white font-medium text-large">{title}</h4>
        <p className="text-tiny text-white/60 uppercase font-bold">
          {description}
        </p>
      </CardFooter>
    </Card>
  )
}
