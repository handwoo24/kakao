import Script from 'next/script'
import React, { FC } from 'react'

interface KakaoMapProps {
  apiKey: string
}

const KakaoMapScript: FC<KakaoMapProps> = ({ apiKey }) => {
  const handleLoad = () => {
    window.kakao.maps.load()
  }
  return (
    <Script
      type='text/javascript'
      src={`https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${apiKey}`}
      onLoad={handleLoad}
    />
  )
}

export default KakaoMapScript
