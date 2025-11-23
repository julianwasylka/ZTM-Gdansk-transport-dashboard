import type { App } from 'vue';

export const MyLogger = {
  install(app: App) {
    app.config.globalProperties.$log = (msg: string) => {
      console.log(`[ZTM App]: ${msg}`);
    };
    
    app.provide('logger', (msg: string) => {
      console.log(`[ZTM App Provided]: ${msg}`);
    });
  }
};