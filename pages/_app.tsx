import { ThemeProvider } from 'next-themes'
import type { AppProps } from 'next/app'
import { Provider, useSelector } from 'react-redux'
import { RootState, store } from '../store'
import { appWithTranslation } from 'next-i18next'
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import '../styles/globals.css'
import 'dayjs/locale/th'

// Enable dayjs and relativeTime plugin.
dayjs.extend(relativeTime)
dayjs.locale('th')

function ThemeComponent({ Component, pageProps, router }: AppProps) {
  const props: any = { pageProps, router }
  // console.log(props)
  const theme = useSelector((state: RootState) => state.theme)
  return (
    <ThemeProvider
      forcedTheme={theme.mode}
      enableSystem={false}
      attribute="class"
    >
      <Component {...props} />
    </ThemeProvider>
  )
}

function MyApp(props: AppProps) {
  // const {theme, setTheme} = useTheme()

  return (
    <Provider store={store}>
      <ThemeComponent {...props} />
    </Provider>
  )
}

// MyApp.getInitialProps = async (appContext: any) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext)
//   return { ...appProps }
// }


export default appWithTranslation(MyApp)
