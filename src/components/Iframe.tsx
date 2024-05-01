import "../style.css";
import { Suspense } from "../pages/Suspense";
import { useRef, useState } from "preact/hooks";

interface IframeHeaderProps {
    URL: string;
}

export function Iframe(props: IframeHeaderProps) {
    const { URL } = props;
    const iframeRef: any = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleBack = () => {
        setIsLoading(true);
        iframeRef.current.contentWindow.history.back();
    };

    const handleForward = () => {
        setIsLoading(true);
        iframeRef.current.contentWindow.history.forward();
    };

    const handleRefresh = () => {
        setIsLoading(true);
        iframeRef.current.contentWindow.location.reload();
    };

    const handleFullscreen = () => {
        if (iframeRef.current.requestFullscreen) {
            iframeRef.current.requestFullscreen();
        } else if (iframeRef.current.mozRequestFullScreen) { // Firefox (L)
            iframeRef.current.mozRequestFullScreen();
        } else if (iframeRef.current.webkitRequestFullscreen) {
            iframeRef.current.webkitRequestFullscreen();
        }
    };

    const handleLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className="fixed h-screen w-full">
            <header className="flex items-center justify-between px-4 py-2 bg-base">
                <div className="flex items-center">
                    <img src="/assets/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
                    <h1 className="font-bold text-text">Eclipse</h1>
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={handleBack} className="px-2 py-1 bg-surface2 text-text rounded">
                        <img src="/assets/back-button.png" alt="Back" className="w-6 h-6" />
                    </button>
                    <button onClick={handleForward} className="px-2 py-1 bg-surface2 text-text rounded">
                        <img src="/assets/forward-button.png" alt="Forward" className="w-6 h-6" />
                    </button>
                    <button onClick={handleRefresh} className="px-2 py-1 bg-surface2 text-text rounded">
                        <img src="/assets/refresh-button.png" alt="Refresh" className="w-6 h-6" />
                    </button>
                    <button onClick={handleFullscreen} className="px-2 py-1 bg-surface2 text-text rounded">
                        <img src="/assets/fullscreen-button.png" alt="Fullscreen" className="w-6 h-6" />
                    </button>
                </div>
            </header>
            {isLoading && <Suspense />}
            <iframe
                ref={iframeRef}
                src={URL}
                className="fixed top-50 left-0 w-full h-full border-none overflow-hidden z-50"
                onLoad={handleLoad}
            />
        </div>
    );
}