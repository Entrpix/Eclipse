import { SearchUtil } from './SearchUtil';

declare global {
  interface Window {
    __uv$config: any;
  }
}

export function Proxy(URL: string) {
  const url: string = SearchUtil(URL, "https://google.com/?q=%s");
  const proxiedUrl: string = window.__uv$config.prefix + window.__uv$config.encodeUrl(url);
  window.location.href = proxiedUrl;
};