import React, { type CSSProperties, type FC, useEffect, useRef } from 'react'
import { useKakaoMap } from './KakaoMapProvider'

interface KakaoMapProps {
  lat: number
  lng: number
  level: number
  style?: CSSProperties
}

const KakaoMap: FC<KakaoMapProps> = ({ lat, lng, level, style }) => {
  const kakaoMap = useKakaoMap()
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (kakaoMap === null || ref.current === null) return
    new kakaoMap.Map(ref.current, {
      center: new kakaoMap.LatLng(lat, lng),
      level,
    })
  }, [kakaoMap, lat, level, lng])

  return <div style={style} ref={ref} />
}

export default KakaoMap
