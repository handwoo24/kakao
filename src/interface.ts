export type AuthorizeOptions = {
  redirectUri: string
  scope?: string
}

export type KakaoAuth = {
  authorize: ({ redirectUri }: AuthorizeOptions) => void
  setAccessToken: (accessToken: string) => void
  getAccessToken: () => string
  logout: () => Promise<void>
}

export type Kakao = {
  init: (key: string) => void
  Auth: KakaoAuth
}

export type KakaoMap = {
  load: () => void
  LatLng: new (lat: number, lng: number) => { La: number; Ma: number }
  Map?: new (element: HTMLElement, options: { center: { La: number; Ma: number }; level: number }) => unknown
}

export interface KakaoTokenOptions {
  apiKey: string
  code: string
  redirectUri: string
}

export type KakaoToken = {
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
