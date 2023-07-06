import React, { CSSProperties, FC, useEffect, useRef } from 'react'

interface KakaoMapProps {
  lat: number
  lng: number
  level: number
  style?: CSSProperties
}

const KakaoMap: FC<KakaoMapProps> = ({ lat, lng, level, style }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (window?.kakao?.maps?.Map && ref.current) {
      new window.kakao.maps.Map(ref.current, {
        center: new window.kakao.maps.LatLng(lat, lng),
        level,
      })
    }
  }, [lat, lng, level])
  return (
    <>
      <div style={style} ref={ref} />
    </>
  )
}

export default KakaoMap
