import { Suspense as PreactSuspense } from 'preact/compat';

export function Idle() {
    return (
        <PreactSuspense fallback={<div>Loading...</div>}>
        </PreactSuspense>
    );
}
