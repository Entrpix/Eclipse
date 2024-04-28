import { useEffect, useState } from 'preact/hooks';
import { useLocation } from 'preact-iso/router';

import { RammerheadEncode } from '../util/RammerheadEncoder';
import { searchUtil } from '../util/SearchUtil';

import { Iframe } from '../components/Iframe';
import { Idle } from '../components/Suspense';
import Cloaker from '../components/Cloaker';

declare global {
  interface Window {
    __uv$config: any;
  }
}

export function ProxyFrame() {
  const [proxiedUrl, setProxiedUrl] = useState<string | null>(null);
  const location = useLocation();

  let proxyMode: string | null = null;

  useEffect(() => {
    const proxy = localStorage.getItem("proxy") || "ultraviolet";
    proxyMode = localStorage.getItem("proxyMode") || "embed";
    const searchEngine = localStorage.getItem("searchEngine") || "https://google.com/?q=%s";

    const url = searchUtil(location.path.toString(), searchEngine);

    const uvEncode = window.__uv$config.prefix + window.__uv$config.encodeUrl(url);

    async function getRhEncode(url: string): Promise<string> {
      return await RammerheadEncode(url) as string;
    }

    async function selectProxy() {
      const rhEncode = await getRhEncode(url);
      if (proxy === "ultraviolet") {
        return uvEncode;
      } else if (localStorage.getItem("rammerhead")) {
        return rhEncode;
      };
    }

    selectProxy().then((url) => {
      if (url) {
        setProxiedUrl(url);
        if (proxyMode === "direct") {
          window.location.href = url;
        } else if (proxyMode === "aboutblank") {
          location.url = "/ab/" + encodeURIComponent(url);
        }
      }
    });
  }, [location]);

  if (proxyMode === "embed") {
    history.pushState({}, "", "/");
  }

  return (
    <div>
        <Cloaker/>
        {proxyMode === "direct" && <Idle />}
        {proxyMode === "aboutblank" && <Idle />}
        {proxyMode === "embed" && proxiedUrl && <Iframe url={proxiedUrl} />}
    </div>
  );
}