'use client'

import React, { type CSSProperties } from 'react'
import _JSXStyle from 'styled-jsx/style'
import { type AuthorizeOptions } from './interface'
import { authorizeKakaoAuth } from './authorize'

interface KakaoAuthroizeButtonProps extends AuthorizeOptions {
  apiKey: string
  style?: CSSProperties
}

const KakaoAuthroizeButton = ({ apiKey, redirectUri, scope, style }: KakaoAuthroizeButtonProps) => {
  return (
    <>
      <img
        onClick={() => authorizeKakaoAuth(apiKey, { redirectUri, scope })}
        id='kakao-authorize-btn'
        src='https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg'
        width={222}
        alt='kakao authorize button'
        style={style}
      />
      <_JSXStyle>{`
        #kakao-authorize-btn {
          opacity: 0.85;
          cursor: pointer;
          border-radius: 12px;
          &:hover,
          &:focus {
            opacity: 1;
          }
          &:active {
            scale: 0.98;
          }
        }
      `}</_JSXStyle>
    </>
  )
}

export default KakaoAuthroizeButton
