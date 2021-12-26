import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {

  public locale: string | undefined = 'th' // Static lang

  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  constructor(props: any) {
    super(props)
    //
  }

  render() {
    return (
      <Html lang={this.locale}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
