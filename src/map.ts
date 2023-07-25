import { KakaoMap } from './interface'

const initKakaoMap = (apiKey: string): Promise<KakaoMap> => {
  const script = document.createElement('script')
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${apiKey}`
  script.type = 'text/javascript'
  document.body.appendChild(script)
  return new Promise<KakaoMap>((resolve, reject) => {
    script.onload = () => {
      window.kakao.maps.load()
      setTimeout(() => {
        resolve(window.kakao.maps)
      }, 100)
    }
    script.onerror = reject
  })
}

export const loadKakaoMap = async (apiKey: string): Promise<KakaoMap> => {
  try {
    return window.kakao.maps
  } catch {
    return initKakaoMap(apiKey)
  }
}
