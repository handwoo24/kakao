import axios from 'axios'

export interface KakaoTokenOptions {
  apiKey: string
  code: string
  redirectUri: string
}

type KakaoToken = {
  access_token: string
}

export interface KakaoUser {
  id: string
  properties: {
    nickname: string
    profile_image: string
    thumbnail_image: string
  }
  kakao_account: {
    profile_nickname_needs_agreement: boolean
    profile_image_needs_agreement: boolean
    profile: {
      nickname: string
      thumbnail_image_url: string
      profile_image_url: string
      is_default_image: boolean
    }
    has_email: boolean
    email_needs_agreement: boolean
    is_email_valid: boolean
    is_email_verified: boolean
    email: string
  }
}

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
