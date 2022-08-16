import { Provider } from 'react-redux'
import store from '../stores/store'
import '../styles/globals.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';
const theme = createTheme();


function MyApp({ Component, pageProps }) {


  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp
