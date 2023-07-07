'use client'

import React, { useCallback, type CSSProperties } from 'react'
import _JSXStyle from 'styled-jsx/style'
import { useKakaoAuth } from './KakaoAuthProvider'
import type { AuthorizeOptions } from './interface'

interface KakaoAuthroizeButtonProps extends AuthorizeOptions {
  style?: CSSProperties
}

const KakaoAuthroizeButton = ({ redirectUri, scope, style }: KakaoAuthroizeButtonProps) => {
  const kakao = useKakaoAuth()

  const handleClick = useCallback(() => kakao?.authorize({ redirectUri, scope }), [kakao, redirectUri, scope])

  return (
    <>
      <img
        onClick={handleClick}
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
