import React, { type CSSProperties, type FC, useEffect, useRef } from 'react'
import { loadKakaoMap } from './map'

interface KakaoMapProps {
  apiKey: string
  lat: number
  lng: number
  level: number
  style?: CSSProperties
}

const KakaoMap: FC<KakaoMapProps> = ({ apiKey, lat, lng, level, style }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    loadKakaoMap(apiKey).then((map) => {
      new map.Map(ref.current, {
        center: new map.LatLng(lat, lng),
        level,
      })
    })
  }, [apiKey, lat, level, lng])

  return <div style={style} ref={ref} />
}

export default KakaoMap
