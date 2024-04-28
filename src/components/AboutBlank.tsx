import { useEffect } from 'preact/hooks';
import { Iframe } from "./Iframe";
import ReactDOM from 'react-dom';

export function AboutBlank(props: { url: string }) {
    useEffect(() => {
        var tab = window.open("about:blank");

        if (tab) {
            ReactDOM.render(<Iframe url={props.url} />, tab.document.body);
        }
    }, [props.url]);

    return null;
};