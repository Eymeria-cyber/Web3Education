export const StakeContractConstant = {
    Address: '0x07b255FC3481d70f8AdA5AdcD8c8324DeaFa4d4b',
    StakeValueEther: '0.01',
    Contract: {
        stakeAndUnlockProject: {
            signatures: 'function stakeAndUnlockProject(uint256 _projectId) payable',
            functionName: 'stakeAndUnlockProject'
        },
        getAllProjects: {
            signatures: "function getAllProjects() view returns ((uint256 id, string name, string description, uint256 requiredStake, address creator, bool completed, address[] participants)[])",
            functionName: 'getAllProjects'
        },
        getProjectDetails: {
            signatures: 'function getProjectDetails(uint256 _projectId) view returns ((uint256 id, string name, string description, uint256 requiredStake, address creator, bool completed, address[] participants))',
            functionName: 'getProjectDetails'
        },
        getUserProjects: {
            signatures: 'function getUserProjects(address _user) view returns (uint256[])',
            functionName: 'getUserProjects'
        }
    } as const satisfies Record<string, ContractMethod>
} as const

type ContractMethod = {
    signatures: string,
    functionName: string
}