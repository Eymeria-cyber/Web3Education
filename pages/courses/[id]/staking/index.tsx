import { NextPage } from "next";
import styles from '../../../../styles/Home.module.css'
import { ConnectButton, lightTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@nextui-org/react";
import { useRouter } from "next/router";
import {
  useAccount,
  type BaseError, useWriteContract,
  useWaitForTransactionReceipt
} from "wagmi";
import { parseAbi, parseEther } from "viem";
import { StakeContractConstant } from "@/contract";
import btnStyles from './Button.module.css'
import classNames from "classnames";
import { useEffect, useState } from "react";
import { CourseType } from "@/models/course";
import { PrimaryButton } from "../../../../components/Button";

const { Address: StakeContractAddress, Contract, StakeValueEther } = StakeContractConstant
const StakingPage: NextPage = () => {
  const router = useRouter()
  const courseId = router.query.id as string;
  const [courseDetail, setCourseDetail] = useState<CourseType | null>(null);
  useEffect(() => {
    if (!courseId) return
    fetch(`/api/course/${courseId}/detail`).then(res => res.json()).then((res: CourseType) => {
      setCourseDetail(res)
      console.log(res)
    })
  }, [courseId])
  const pid = router.query.pid as string;
  const { isConnected } = useAccount()
  const { data: hash, writeContract, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed, data } =
    useWaitForTransactionReceipt({
      hash,
    })

  useEffect(() => {
    if (!isConfirmed) return
    const timerId = window.setTimeout(() => {
      router.push(`/courses/${courseId}/learning?pid=${pid}`)
    }, 3000)
    return () => {
      window.clearTimeout(timerId)
    }
  }, [isConfirmed, pid, courseId])
  return <div className={styles.container}>
    {/* back button */}
    <div className={classNames("fixed top-2 left-2 flex items-center justify-center w-10 h-10 rounded-full", btnStyles.button, btnStyles.active)} onClick={() => {
      router.back()
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </div>

    <main className={classNames(styles.main, 'flex flex-col gap-3')}>
      {courseDetail &&
        <Card className="w-full h-32">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">{courseDetail.title}</p>
              <p className="text-small text-default-500">{courseDetail.author}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>{courseDetail.description}</p>
          </CardBody>
        </Card>}

      <RainbowKitProvider theme={lightTheme({
        accentColor: '#e6aaff',
        accentColorForeground: '#444444',
        
      })}>
        <ConnectButton label="Connect Wallet to Stake" />
      </RainbowKitProvider>
      {isConnected && <PrimaryButton disabled={isPending} className="w-full" onClick={() => {
        writeContract({
          address: StakeContractAddress,
          gasPrice: parseEther('0.000000001'),
          abi: parseAbi([Contract.stakeAndUnlockProject.signatures]),
          args: [BigInt(pid!)],
          functionName: Contract.stakeAndUnlockProject.functionName,
          value: parseEther(StakeValueEther),
        })
      }}>{isPending ? 'Staking...' : 'Stake to Unlock'}</PrimaryButton>}
      <div className="min-h-32">

        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed. Will be redirected to learning page in 3 second.</div>}
        {error && (
          <div>Error: {(error as BaseError).shortMessage || error.message}</div>
        )}
      </div>
    </main>
  </div>
}

export default StakingPage