import * as React from 'react'
import App, { Container } from 'next/app'
//
import withDynamicRouter from './../hocs/withDynamicRouter'

export default withDynamicRouter(
  class extends App {
    static async getInitialProps({ Component, ctx }) {
      let pageProps = {}
  
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx)
      }
  
      return { pageProps }
    }
  
    render () {
      const { Component, pageProps } = this.props
  
      return (
        <Container>
          <Component {...pageProps} />
        </Container>
      )
    }
  }
)