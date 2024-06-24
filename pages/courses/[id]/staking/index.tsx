import { NextPage } from "next";
import styles from '../../../../styles/Home.module.css'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "@nextui-org/react";
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

const { Address: StakeContractAddress, Contract, StakeValueEther } = StakeContractConstant
const StakingPage: NextPage = () => {
  const router = useRouter()
  const courseId = router.query.id as string;
  const pid = router.query.pid as string;
  const { isConnected } = useAccount()
  const { data: hash, writeContract, isPending, error } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed, data } =
    useWaitForTransactionReceipt({
      hash,
    })
  return <div className={styles.container}>
    {/* back button */}
    <div className={classNames("fixed top-2 left-2 flex items-center justify-center w-10 h-10 rounded-full", btnStyles.button, btnStyles.active)} onClick={() => {
      router.back()
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </div>

    <main className={styles.main}>
      <ConnectButton />
      {isConnected && <Button disabled={isPending} color='secondary' onClick={() => {
        writeContract({
          address: StakeContractAddress,
          gasPrice: parseEther('0.000000001'),
          abi: parseAbi([Contract.stakeAndUnlockProject.signatures]),
          args: [BigInt(pid!)],
          functionName: Contract.stakeAndUnlockProject.functionName,
          value: parseEther(StakeValueEther),
        })
      }}>{isPending ? 'Staking...' : 'Stake'}</Button>}
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </main>
  </div>
}

export default StakingPage