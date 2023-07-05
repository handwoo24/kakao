import React, { type ReactNode, createContext, useState } from 'react'
import { type UserCredential, signInWithCustomToken, type Auth } from 'firebase/auth'

const FirebaseContext = createContext<[UserCredential | null, (auth: Auth, customToken: string) => Promise<void>]>([
  null,
  async () => undefined,
])

interface FirebaseProviderProps {
  children?: ReactNode
}

const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const [useCredential, setUserCredential] = useState<UserCredential | null>(null)

  const signIn = (auth: Auth, customToken: string) => signInWithCustomToken(auth, customToken).then(setUserCredential)

  return <FirebaseContext.Provider value={[useCredential, signIn]}>{children}</FirebaseContext.Provider>
}

export default FirebaseProvider
