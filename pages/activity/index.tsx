import { NavPage } from '../../components/BottomBar'
import RootLayout from '../../components/RootLayout'
import { NextPageWithLayout } from '../_app'
import { PrimaryButton } from '../../components/Button'
import { useRouter } from 'next/router'

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
const ActivityPage: NextPageWithLayout = () => {
  const router = useRouter()

  return (
    <div>
      <PrimaryButton>
        <Link href={`${router.asPath}/ai`} className="text-white">
          ChatWithAI
        </Link>
      </PrimaryButton>
    </div>
  )
}
ActivityPage.getLayout = (page) => (
  <RootLayout activePage={NavPage.Activity}>{page}</RootLayout>
)

export default ActivityPage
