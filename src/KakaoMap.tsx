import React, { CSSProperties, FC, useRef } from 'react'
import Script from 'next/script'

interface KakaoMapProps {
  apiKey: string
  lat: number
  lng: number
  level: number
  style?: CSSProperties
}

const KakaoMap: FC<KakaoMapProps> = ({ apiKey, lat, lng, level, style }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const handleLoad = () => {
    window.kakao.maps.load()
    setTimeout(() => {
      new window.kakao.maps.Map(ref.current, {
        center: new window.kakao.maps.LatLng(lat, lng),
        level,
      })
    }, 100)
  }

  return (
    <>
      <Script
        type='text/javascript'
        src={`https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${apiKey}`}
        onLoad={handleLoad}
      />
      <div style={style} ref={ref} />
    </>
  )
}

export default KakaoMap
