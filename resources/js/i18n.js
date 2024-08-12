import { createI18n } from 'vue-i18n';
import en from './Locale/en.json';
import nl from './Locale/nl.json';

const messages = {
  en,
  nl,
};

export default createI18n({
  messages,
  locale: 'nl',
  fallbackLocale: 'en',
  // Inject the $t() function in all components
  globalInjection: true,
});
