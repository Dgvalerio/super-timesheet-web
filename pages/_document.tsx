import { ReactElement } from 'react';

import Document, {
  Html,
  DocumentContext,
  DocumentInitialProps,
  Head,
  Main,
  NextScript,
} from 'next/document';

import { ServerStyleSheet } from 'styled-components';

/**
 * @class MyDocument
 * @description Page composition
 * */
export default class MyDocument extends Document {
  /**
   * @function getInitialProps
   * @param {DocumentInitialProps} ctx
   * */
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = ():
        | DocumentInitialProps
        | Promise<DocumentInitialProps> =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: [
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>,
        ],
      };
    } finally {
      sheet.seal();
    }
  }

  /**
   * @function render
   * @return {ReactElement}
   * */
  render(): ReactElement {
    return (
      <Html lang="pt-br">
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
