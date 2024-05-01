import { Proxy } from "../util/Proxy";
import "../style.css"

export function Home() {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const form = event.target;
    const url = form.url.value;
    Proxy(url);
  };
  
  return (
    <div className="h-screen flex items-center justify-center bg-crust">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input type="text" name="url" className="mb-4 text-text bg-base rounded text-lg p-2" />
        <button type="submit" className="bg-mantle text-pink font-bold py-2 px-4 rounded text-lg">
          Submit
        </button>
      </form>
    </div>
  );
}