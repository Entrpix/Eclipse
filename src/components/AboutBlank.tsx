import { Iframe } from "./Iframe";
import ReactDOM from 'react-dom';


export function AboutBlank(props: { url: string }) {
    var tab = window.open("about:blank");

    if (tab) {
        ReactDOM.render(<Iframe url={props.url} />, tab.document.body);
    }
};