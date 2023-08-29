import axios from 'axios'
import type { AuthorizeOptions, KakaoToken, KakaoTokenOptions, KakaoUser } from './interface'

const kakaoTokenUri = 'https://kauth.kakao.com/oauth/token'

const kakaoUserUri = 'https://kapi.kakao.com/v2/user/me'

export const getKakaoToken = async ({ apiKey, code, redirectUri }: KakaoTokenOptions): Promise<KakaoToken> =>
  axios
    .get(`${kakaoTokenUri}?grant_type=authorization_code&client_id=${apiKey}&code=${code}&redirect_uri=${redirectUri}`)
    .then((response) => response.data)

export const getKakaoUser = async (accessToken: string): Promise<KakaoUser> =>
  axios.get(kakaoUserUri, { headers: { Authorization: `Bearer ${accessToken}` } }).then((response) => response.data)

export const initKakaoAuth = (apiKey: string): Promise<Event> => {
  const script = document.createElement('script')
  script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.2.0/kakao.min.js'
  script.type = 'text/javascript'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.integrity = 'sha384-x+WG2i7pOR+oWb6O5GV5f1KN2Ko6N7PTGPS7UlasYWNxZMKQA63Cj/B2lbUmUfuC'
  document.body.appendChild(script)
  return new Promise<Event>((resolve, reject) => {
    script.onload = () => {
      window.Kakao.init(apiKey)
      resolve(new Event(script.src))
    }
    script.onerror = reject
  })
}

export const authorizeKakaoAuth = async (apiKey: string, { redirectUri, scope }: AuthorizeOptions): Promise<void> => {
  try {
    window.Kakao.Auth.authorize({ redirectUri, scope })
  } catch {
    return initKakaoAuth(apiKey).then(() => window.Kakao.Auth.authorize({ redirectUri, scope }))
  }
}

export const setKakaoAccessToken = async (apiKey: string, token: string): Promise<void> => {
  try {
    window.Kakao.Auth.setAccessToken(token)
  } catch {
    return initKakaoAuth(apiKey).then(() => window.Kakao.Auth.setAccessToken(token))
  }
}

export const logoutKakao = async (apiKey: string): Promise<void> => {
  try {
    window.Kakao.Auth.logout()
  } catch {
    return initKakaoAuth(apiKey).then(() => window.Kakao.Auth.logout())
  }
}
