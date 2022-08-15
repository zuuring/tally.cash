import { Footer } from "features/Footer";
import { Header } from "features/Header";
import { css } from "linaria";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import SEO from "shared/seo";
import { sectionBackgroundOffWhite } from "shared/styles/colors";
import { sectionNarrowWidth } from "shared/styles/lengths";
import { tileBoxShadow } from "shared/styles/shadows";
import { ManifestoBody } from "./ManifestoBody";
import { ManifestoHeaderCta } from "./ManifestoHeaderCta";
import { ManifestoPanel } from "./ManifestoPanel";

const queryClient = new QueryClient();

export function Manifesto() {
  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={css`
          display: flex;
          flex-flow: column;
        `}
      >
        <SEO title="Dear web3, what do you believe in?" />

        <Header />

        <div
          className={css`
            display: flex;
            flex-flow: column;
            width: ${sectionNarrowWidth};
            margin: 0 auto;
          `}
        >
          <div
            className={css`
              height: 24rem;
              margin: 0 -4rem -5.5rem;
              background: bottom 4rem center / contain no-repeat url(./bg.png);
            `}
          />
          <div
            className={css`
              position: sticky;
              top: 1.5rem;
              z-index: 1;
              margin: 1.5rem -4rem 24rem;
            `}
          >
            <ManifestoHeaderCta />
          </div>
          <div
            className={css`
              box-shadow: ${tileBoxShadow};
              padding: 6rem 6rem 0;
              margin: -28rem 0 0;
            `}
          >
            <ManifestoBody />
          </div>
        </div>
        <div
          className={css`
            width: ${sectionNarrowWidth};
            margin: 0 auto 24rem;
            border-radius: 0 0 1rem 1rem;
            background: ${sectionBackgroundOffWhite};
          `}
          id="sign"
        >
          <ManifestoPanel />
        </div>

        <Footer />
      </div>
    </QueryClientProvider>
  );
}