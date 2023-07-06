### A Kakao API for nextjs

### Auth Example

```ts
"layout.tsx"

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body>
        <KakaoAuthProvider apikey="your api key">
          <Layout>{children}</Layout>
        </KakaoAuthProvider>
      </body>
    </html>
  )
}


"SomeAuthComponent.tsx"

export default function SomeAuthComponent({ ... }: Props) {
  ...
  const kakaoAuth = useKakaoAuth()
  ...
}


"redirect-page.tsx"

interface PageProps {
  searchParams?: {
    code?: string
  }
}

const redirectUri = "your redirect uri"
const apiKey = "your kakao js client api key"

export default async function Page({ searchParams: { code } }: PageProps) {
  if (typeof code !== 'string') return redirect('/')
  const accessToken = await authorizeKakaoUser({code, redirectUri, apiKey})
  return ...
}
```

### Map Example

```ts
const Map = () => {
  return <KakaoMap apiKey="your api key" lat={33.450701} lng={126.570667} level={3} style={{ width:500, height: 500 } />
}
```
