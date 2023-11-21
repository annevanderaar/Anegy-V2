import { createI18n } from 'vue-i18n';
import en from './Locale/en.json';
import nl from './Locale/nl.json';

const messages = {
  en,
  nl,
};

export default createI18n({
  // Messages contains all the translations
  messages,
  // Set up basic locale settings based on .env
  locale: import.meta.env.VITE_I18N_LOCALE || 'nl',
  fallbackLocale: import.meta.env.VITE_I18N_FALLBACK_LOCALE || 'nl',
  // Inject the $t() function in all components
  globalInjection: true,
});
