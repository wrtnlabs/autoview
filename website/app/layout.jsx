import { Layout, Navbar } from "nextra-theme-docs";
// Required for theme styles, previously was imported under the hood
import "nextra-theme-docs/style.css";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";

import Footer from "./_components/layout/Footer";
import "./globals.css";

export const metadata = {
  // ... your metadata API
  // https://nextjs.org/docs/app/building-your-application/optimizing/metadata
};

const navbar = (
  <Navbar
    logo={<b>Autoview</b>}
    projectLink="https://github.com/wrtnlabs/autoview"
  />
);

export default async function RootLayout(props) {
  return (
    <html
      // Not required, but good for SEO
      lang="en"
      // Required to be set
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head
      // backgroundColor={{
      //   dark: "rgb(9, 15, 27)",
      //   light: "rgb(250, 250, 250)",
      // }}
      // color={{
      //   hue: { dark: 120, light: 0 },
      //   saturation: { dark: 100, light: 100 },
      // }}
      >
        {/* ICONS */}
        <link rel="manifest" href="/autoview/favicon/site.webmanifest" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/autoview/favicon/apple-touch-icon.png"
        />
        {[16, 32].map((size) => (
          <link
            key={size}
            rel="icon"
            type="image/png"
            sizes={`${size}x${size}`}
            href={`/autoview/favicon/favicon-${size}x${size}.png`}
          />
        ))}
        {/* OG */}
        <meta name="og:type" content="object" />
        <meta name="og:site_name" content="Autoview Guide Documents" />
        <meta name="og:url" content="https://wrtnlabs.io/autoview" />
        <meta name="og:image" content="https://wrtnlabs.io/autoview/og.jpg" />
        <meta name="og:title" content="Autoview Guide Documents" />
        <meta
          name="og:description"
          content="Automated Frontend Component Generator enhanced by TypeScript Compiler"
        />
        {/* TWITTER */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@SamchonGithub" />
        <meta
          name="twitter:image"
          content="https://wrtnlabs.io/autoview/og.jpg"
        />
        <meta name="twitter:title" content="Autoview Guide Documents" />
        <meta
          name="twitter:description"
          content="Automated Frontend Component Generator enhanced by TypeScript Compiler"
        />
      </Head>
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/wrtnlabs/autoview/tree/main/website"
          editLink="Edit this page on GitHub"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          footer={<Footer />}
          nextThemes={{
            defaultTheme: "dark",
          }}
          darkMode={false}
          // ...Your additional theme config options
        >
          {props.children}
        </Layout>
      </body>
    </html>
  );
}
