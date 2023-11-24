import './bootstrap';
import '../css/app.css';
import 'vue-toastification/dist/index.css';
import 'vuetify/dist/vuetify.min.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy/dist/vue.m';
import { createPinia } from 'pinia';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import Toast, { POSITION } from 'vue-toastification';
import MainLayout from './Layouts/MainLayout.vue';
import i18n from './i18n';

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

const lightTheme = {
  dark: false,
  colors: {
    primary: '#e0dfdf',
    secondary: '#f32b2b',
    accent: '#23a9a7',
    btnFilterColor: '#000000',
  },
};

const darkTheme = {
  dark: true,
  colors: {
    primary: '#1b1b1f',
    secondary: '#8B0000',
    accent: '#23a9a7',
    btnFilterColor: '#FFFFFF',
  },
};

const toastOptions = {
  // You can set your default options here
  position: POSITION.TOP_CENTER,
};

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name => {
    const page = resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue'));
    page.then(module => {
      module.default.layout = module.default.layout || MainLayout;
    });
    return page;
  },
  setup ({ el, App, props, plugin }) {
    const vuetify = createVuetify({
      components,
      directives,
      theme: {
        defaultTheme: 'lightTheme',
        themes: {
          lightTheme,
          darkTheme,
        },
      },
    });
    return createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(vuetify)
      .use(createPinia())
      .use(ZiggyVue, Ziggy)
      .use(Toast, toastOptions)
      .use(i18n)
      .mount(el);
  },
  progress: {
    color: '#4B5563',
  },
});
