import axios from 'axios'
import { AuthorizeOptions, Kakao, KakaoToken, KakaoTokenOptions, KakaoUser } from './interface'

const kakaoTokenUri = 'https://kauth.kakao.com/oauth/token'

const kakaoUserUri = 'https://kapi.kakao.com/v2/user/me'

export const getKakaoToken = async ({ apiKey, code, redirectUri }: KakaoTokenOptions): Promise<KakaoToken> =>
  axios
    .get(`${kakaoTokenUri}?grant_type=authorization_code&client_id=${apiKey}&code=${code}&redirect_uri=${redirectUri}`)
    .then((response) => response.data)

export const getKakaoUser = async (accessToken: string): Promise<KakaoUser> =>
  axios.get(kakaoUserUri, { headers: { Authorization: `Bearer ${accessToken}` } }).then((response) => response.data)

export const initKakaoAuth = (apiKey: string) => {
  const script = document.createElement('script')
  script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.2.0/kakao.min.js'
  script.type = 'text/javascript'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.integrity = 'sha384-x+WG2i7pOR+oWb6O5GV5f1KN2Ko6N7PTGPS7UlasYWNxZMKQA63Cj/B2lbUmUfuC'
  document.body.appendChild(script)
  return new Promise<Kakao>((resolve, reject) => {
    script.onload = () => {
      window.Kakao.init(apiKey)
      resolve(window.Kakao)
    }
    script.onerror = reject
  })
}

export const authorizeKakaoAuth = async (apiKey: string, { redirectUri, scope }: AuthorizeOptions): Promise<void> => {
  try {
    window.Kakao.Auth.authorize({ redirectUri, scope })
  } catch {
    const kakao = await initKakaoAuth(apiKey)
    kakao.Auth.authorize({ redirectUri, scope })
  }
}
