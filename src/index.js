import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import configureStore from './store';

import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import common_ar from "./translations/ar/common.json";
import common_en from "./translations/en/common.json";

i18next.init({
    interpolation: { escapeValue: false },  
    lng: 'en',                              
    resources: {
        en: {
            common: common_en             
        },
        ar: {
            common: common_ar
        },
    },
});
ReactDOM.render(
    <Provider store={configureStore()} >
        <I18nextProvider i18n={i18next}>
            <App />
        </I18nextProvider>
    </Provider>,
    document.getElementById('root')
   );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

