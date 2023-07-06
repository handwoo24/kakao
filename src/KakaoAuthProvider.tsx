'use client'

import React, { createContext, useContext, type FC, useState } from 'react'
import Script from 'next/script'
import { KakaoAuth } from './interface'

interface KakaoProviderProps {
  apiKey: string
}

const KakaoAuthContext = createContext<KakaoAuth | null>(null)

export const useKakaoAuth = () => useContext(KakaoAuthContext)

const KakaoAuthProvider: FC<KakaoProviderProps> = ({ apiKey }) => {
  const [kakaoAuth, setKakaoAuth] = useState<KakaoAuth | null>(null)

  const handleLoad = () => {
    window.Kakao.init(apiKey)
    setKakaoAuth(window.Kakao.Auth)
  }

  return (
    <KakaoAuthContext.Provider value={kakaoAuth}>
      <Script
        src='https://t1.kakaocdn.net/kakao_js_sdk/2.2.0/kakao.min.js'
        integrity='sha384-x+WG2i7pOR+oWb6O5GV5f1KN2Ko6N7PTGPS7UlasYWNxZMKQA63Cj/B2lbUmUfuC'
        crossOrigin='anonymous'
        onLoad={handleLoad}
      />
    </KakaoAuthContext.Provider>
  )
}

export default KakaoAuthProvider
