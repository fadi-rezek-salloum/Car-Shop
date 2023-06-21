import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider, useTranslation } from 'react-i18next';
import i18n from './i18n';
import App from './App';
import 'mapbox-gl/dist/mapbox-gl.css';

function Root() {
  const { i18n } = useTranslation();

  if (i18n.language === 'ar') {
    import('./AppAr.css');
  }

  return <App />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Root />
    </I18nextProvider>
  </React.StrictMode>
);