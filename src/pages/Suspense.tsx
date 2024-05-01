import "../style.css"

export function Suspense() {
    return (
        <div className="w-full h-screen bg-crust flex justify-center items-center">
            <h1 className="text-pink text-4xl font-bold">Loading...</h1>    
        </div>
    );
}