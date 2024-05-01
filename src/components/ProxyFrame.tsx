import { SearchUtil } from '../util/SearchUtil';
import { Iframe } from "./Iframe";

declare global {
  interface Window {
    __uv$config: any;
  }
}

export function ProxyFrame(URL: any) {
      const url: string = SearchUtil(URL, "https://google.com/?q=%s");
      const proxiedUrl: string = window.__uv$config.prefix + window.__uv$config.encodeUrl(url);
      return <Iframe URL={proxiedUrl} />;
};