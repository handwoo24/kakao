'use client'

import React, { type FC } from 'react'
import Script from 'next/script'

interface KakaoProviderProps {
  apiKey: string
}

const KakaohScript: FC<KakaoProviderProps> = ({ apiKey }) => {
  const handleLoad = () => {
    window.Kakao.init(apiKey)
  }

  return (
    <Script
      src='https://t1.kakaocdn.net/kakao_js_sdk/2.2.0/kakao.min.js'
      integrity='sha384-x+WG2i7pOR+oWb6O5GV5f1KN2Ko6N7PTGPS7UlasYWNxZMKQA63Cj/B2lbUmUfuC'
      crossOrigin='anonymous'
      onLoad={handleLoad}
    />
  )
}

export default KakaohScript
