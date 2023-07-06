import Script from 'next/script'
import React, { FC } from 'react'

interface KakaoMapProps {
  apiKey: string
}

const KakaoMapScript: FC<KakaoMapProps> = ({ apiKey }) => {
  const handleLoad = () => {
    window.kakao.load()
  }
  return (
    <Script
      type='text/javascript'
      src={`https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${apiKey}`}
      async
      onLoad={handleLoad}
    />
  )
}

export default KakaoMapScript
