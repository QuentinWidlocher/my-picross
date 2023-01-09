// @refresh reload
import { Suspense } from 'solid-js'
import {
  useLocation,
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
  Link,
} from 'solid-start'
import './root.css'

export default function Root() {
  return (
    <Html lang="en" class="h-full">
      <Head>
        <Title>My Picross</Title>
        <Meta charset="utf-8" />
        <Meta
          name="description"
          content="Create and share your picross puzzles"
        />
        <Meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <Link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <Link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <Link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <Link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <Meta name="msapplication-TileColor" content="#ffffff" />
        <Meta name="theme-color" content="#ffffff" />
      </Head>
      <Body class="h-full">
        <Suspense>
          <ErrorBoundary>
            <Routes>
              <FileRoutes />
            </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}
