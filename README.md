### A Kakao API for nextjs

### Example

```ts
layout.tsx

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body>
        <FirebaseAuthProvider>
          <Layout>{children}</Layout>
        </FirebaseAuthProvider>
      </body>
    </html>
  )
}

redirect-page.tsx

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
