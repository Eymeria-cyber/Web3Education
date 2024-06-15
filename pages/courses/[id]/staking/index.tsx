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
const STAKE_CONTRACT_ADDRESS = '0x07b255FC3481d70f8AdA5AdcD8c8324DeaFa4d4b'
const ABI = {
  stakeAndUnlockProject: 'function stakeAndUnlockProject(uint256 _projectId) payable'
}
const StakingPage: NextPage = () => {
  const router = useRouter()
  const courseId = router.query.id as string;
  const { isConnected } = useAccount()
  const { data: hash, writeContract, isPending ,error } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })
  return <div className={styles.container}>
    {/* back button */}
    <Button color="primary" variant="solid" className="fixed top-1 left-1 z-10" onClick={() => {
      router.back()
    }}>Back</Button>

    <main className={styles.main}>
      <ConnectButton />
      {isConnected && <Button disabled={isPending} onClick={() => {
        writeContract({
          address: STAKE_CONTRACT_ADDRESS,
          gasPrice: parseEther('0.000000001'),
          abi: parseAbi([ABI.stakeAndUnlockProject]),
          args: [BigInt(courseId!)],
          functionName: 'stakeAndUnlockProject',
          value: parseEther('0.01'),
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