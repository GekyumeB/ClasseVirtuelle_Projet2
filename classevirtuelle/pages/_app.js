import '../styles/globals.css';
import Layout from '../components/Layout';
import { StoreProvider } from '../utils/Store';
import { SnackbarProvider } from 'notistack';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function MyApp({ Component, pageProps }) {
  //Contenue total de l'application contenant le provider de paypal, un notif snackbar et le layout.
  return (
    <PayPalScriptProvider
      options={{
        'client-id':
          'AQsNc56v_ryRDuo5zb5igxyvsUqd85ZzXStpzwl85Cw2Id3d4eDBX0dO_FcV-uaTF5-EV50MJfQxD-IO',
      }}
    >
      <SnackbarProvider
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <StoreProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StoreProvider>
      </SnackbarProvider>
    </PayPalScriptProvider>
  );
}

export default MyApp;
