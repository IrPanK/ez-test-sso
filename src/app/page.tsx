'use client'

import { AuthContextProvider } from '@/components/contexts/AuthContexts'
import { auth } from '@/components/utils/firebase'
import axios from 'axios'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Link from 'next/link'

export default function Home() {
  async function handleGoogleLogin() {
    const { user: googleUser } = await signInWithPopup(
      auth,
      new GoogleAuthProvider()
    )

    const firebaseToken = await googleUser.getIdToken()

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login/`,
      {
        firebase_token: firebaseToken,
      }
    )

    console.log(response)
  }

  return (
    <AuthContextProvider>
      <section className="flex gap-3">
        <Link href="https://sso.ui.ac.id/cas2/login?service=http://localhost:3000">
          LOGIN SSO UI
        </Link>
        <button onClick={handleGoogleLogin}>LOGIN GOOGLE</button>
      </section>
    </AuthContextProvider>
  )
}
