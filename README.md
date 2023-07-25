### A Kakao API for nextjs

### Auth Example

```ts
"authorize-page.tsx"

export default function Page() {
  return <KakaoAuthorizeButton apiKey="your api key" />
}

```


```ts
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
  const { access_token } = await getKakaoToken({code, redirectUri, apiKey})
  const kakaoUser = await getKakaoUser(access_token)
  return ...
}
```

### Map Example

```ts
const Map = () => {
  return (
      <KakaoMap apiKey="your api key" lat={33.450701} lng={126.570667} level={3} style={{ width: 500, height: 500 }} />
    )
}
```
