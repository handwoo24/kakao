import { Kakao, KakaoMap } from './interface'

declare global {
  interface Window {
    Kakao: Kakao
    kakao: KakaoMap
  }
}
