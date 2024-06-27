import React from 'react'

const SvgComponent = (isRecording: boolean) => {
  if (!isRecording) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 768 1024"
      >
        <path
          fill="#0ea5e9"
          d="M448 826v70h128q26 0 45 18.5t19 45t-18.5 45.5t-45.5 19H192q-27 0-45.5-19T128 959.5t18.5-45T192 896h128v-70Q183 803 91.5 696.5T0 448q0-26 18.5-45T64 384t45.5 19t18.5 45q0 106 75 181t181 75t181-75t75-181q0-26 19-45t45.5-19t45 19t18.5 45q0 142-91.5 248.5T448 826zm-64-186q-80 0-136-56t-56-136V192q0-80 56-136T384 0t136 56t56 136v256q0 80-56 136t-136 56z"
        />
      </svg>
    )
  } else {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
      >
        <g fill="none" stroke="#ef4444" stroke-linecap="round" stroke-width="2">
          <rect width="4" height="14" x="6" y="5" rx="1" />
          <rect width="4" height="14" x="14" y="5" rx="1" />
        </g>
      </svg>
    )
  }
}

export default SvgComponent
