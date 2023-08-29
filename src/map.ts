import { type KakaoMapClient } from './interface'

const initKakaoMap = (apiKey: string): Promise<Event> => {
  const script = document.createElement('script')
  const source = 'https://dapi.kakao.com/v2/maps/sdk.js'
  script.src = `${source}?autoload=false&appkey=${apiKey}`
  script.type = 'text/javascript'
  document.body.appendChild(script)
  return new Promise<Event>((resolve, reject) => {
    script.onload = () => {
      window.kakao.maps.load()
      setTimeout(() => {
        resolve(new Event(source))
      }, 100)
    }
    script.onerror = reject
  })
}

export const loadKakaoMap = async (apiKey: string): Promise<KakaoMapClient> => {
  try {
    return window.kakao.maps
  } catch {
    return initKakaoMap(apiKey).then(() => window.kakao.maps)
  }
}
