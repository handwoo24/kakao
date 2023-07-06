'use client'

import React, { createContext, useContext, type FC, useState, type ReactNode } from 'react'
import Script from 'next/script'
import { type KakaoMap } from './interface'

interface KakaoProviderProps {
  apiKey: string
  children?: ReactNode
}

export const KakaoMapContext = createContext<KakaoMap | null>(null)

export const useKakaoMap = () => useContext(KakaoMapContext)

const KakaoMapProvider: FC<KakaoProviderProps> = ({ apiKey, children }) => {
  const [kakaoMap, setKakaoMap] = useState<KakaoMap | null>(null)

  const handleLoad = () => {
    window.Kakao.init(apiKey)
    setTimeout(() => {
      setKakaoMap(window.kakao.maps)
    }, 100)
  }

  return (
    <KakaoMapContext.Provider value={kakaoMap}>
      <Script
        type='text/javascript'
        src={`https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${apiKey}`}
        onLoad={handleLoad}
      />
      {children}
    </KakaoMapContext.Provider>
  )
}

export default KakaoMapProvider
