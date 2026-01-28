import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    // min-h-screen and bg-gray-900 gives you a nice dark background for testing
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank">
          <img
            src={viteLogo}
            className="h-24 w-24 transition-transform hover:scale-110"
            alt="Vite logo"
          />
        </a>
        <a href="https://react.dev" target="_blank">
          <img
            src={reactLogo}
            className="h-24 w-24 transition-transform hover:scale-110 animate-[spin_20s_linear_infinite]"
            alt="React logo"
          />
        </a>
      </div>

      <h1 className="text-5xl font-extrabold mb-8 tracking-tight">
        Vite + <span className="text-cyan-400">React</span>
      </h1>

      <div className="bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700">
        <button
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium transition-colors mb-4"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <p className="text-slate-400">
          Edit <code className="text-pink-400 font-mono">src/App.tsx</code> and
          save to test HMR
        </p>
      </div>

      <p className="mt-8 text-slate-500 italic">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
