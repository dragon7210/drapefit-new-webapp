import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import * as serviceWorker from 'serviceWorker';
import App from 'App';
import store from 'store.js';
import config from './config';
import 'react-datepicker/dist/react-datepicker.css';
import 'assets/scss/style.scss';

const container = document.getElementById('root');
const root = createRoot(container); //-- createRoot(container!) if `TypeScript`
root.render(
  <Provider store={store}>
    <BrowserRouter basename={config.basename}>
      <App />
    </BrowserRouter>
  </Provider>
);

/**
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
serviceWorker.unregister();
