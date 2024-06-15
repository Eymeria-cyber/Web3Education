import { FormEvent } from 'react'
import { useRouter } from 'next/router'

export default function LoginPage() {
  const router = useRouter()

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const phone = formData.get('phone')

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    })

    if (response.ok) {
      const data = await response.json()
      const redirectTo = data.redirectTo || '/'
      router.push(redirectTo)
    } else {
      // Handle errors
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="phone"
        name="phone"
        placeholder="Input your Phone Number"
        required
      />
      <button type="submit">sign in/ sign up</button>
    </form>
  )
}
