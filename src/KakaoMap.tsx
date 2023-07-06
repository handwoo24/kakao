import React, { CSSProperties, FC, useEffect, useMemo, useRef } from 'react'

interface KakaoMapProps {
  lat: number
  lng: number
  level: number
  style?: CSSProperties
}

const KakaoMap: FC<KakaoMapProps> = ({ lat, lng, level, style }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  const kakaoMap = useMemo(() => window?.kakao?.maps?.Map, [])

  useEffect(() => {
    if (kakaoMap && ref.current) {
      new kakaoMap(ref.current, {
        center: new window.kakao.maps.LatLng(lat, lng),
        level,
      })
    }
  }, [lat, lng, level, kakaoMap])
  return <div style={style} ref={ref} />
}

export default KakaoMap
