import axios from 'axios'
import { KakaoToken, KakaoTokenOptions, KakaoUser } from './interface'

const kakaoTokenUri = 'https://kauth.kakao.com/oauth/token'

const kakaoUserUri = 'https://kapi.kakao.com/v2/user/me'

export const getKakaoToken = async ({ apiKey, code, redirectUri }: KakaoTokenOptions): Promise<KakaoToken> =>
  axios
    .get(`${kakaoTokenUri}?grant_type=authorization_code&client_id=${apiKey}&code=${code}&redirect_uri=${redirectUri}`)
    .then((response) => response.data)

export const getKakaoUser = async (accessToken: string): Promise<KakaoUser> =>
  axios.get(kakaoUserUri, { headers: { Authorization: `Bearer ${accessToken}` } }).then((response) => response.data)

const authorizeKakaoUser = async ({ code, redirectUri, apiKey }: KakaoTokenOptions) => {
  const { access_token: accessToken } = await getKakaoToken({ code, redirectUri, apiKey })
  return getKakaoUser(accessToken)
}

export default authorizeKakaoUser
