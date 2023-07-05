'use client'

import React, { createContext, useContext, type FC, type ReactNode, useState } from 'react'
import Script from 'next/script'

type AuthorizeOptions = {
  redirectUri: string
}

type KakaoAuth = {
  authorize: ({ redirectUri }: AuthorizeOptions) => void
}

type Kakao = {
  init: (key: string) => void
  Auth: KakaoAuth
}

declare global {
  interface Window {
    Kakao: Kakao
  }
}

interface KakaoProviderProps {
  apiKey: string
  children?: ReactNode
}

const KakaoContext = createContext<Kakao | null>(null)

export const useKakao = () => useContext(KakaoContext)

const KakaoProvider: FC<KakaoProviderProps> = ({ apiKey, children }) => {
  const [kakao, setKakao] = useState<Kakao | null>(null)

  const handleLoad = () => {
    window.Kakao.init(apiKey)
    setKakao(window.Kakao)
  }

  return (
    <KakaoContext.Provider value={kakao}>
      <Script
        src='https://t1.kakaocdn.net/kakao_js_sdk/2.2.0/kakao.min.js'
        integrity='sha384-x+WG2i7pOR+oWb6O5GV5f1KN2Ko6N7PTGPS7UlasYWNxZMKQA63Cj/B2lbUmUfuC'
        crossOrigin='anonymous'
        onLoad={handleLoad}
      />
      {children}
    </KakaoContext.Provider>
  )
}

export default KakaoProvider
