import { useEffect, useState } from 'react';
import './App.css';
import motokoLogo from './assets/motoko_moving.png';
import motokoShadowLogo from './assets/motoko_shadow.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import { backend } from './declarations/backend';

function App() {
  const [count, setCount] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);

  // Get the current counter value
  const fetchCount = async () => {
    try {
      setLoading(true);
      const count = await backend.get();
      setCount(+count.toString()); // Convert BigInt to number
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const increment = async () => {
    if (loading) return; // Cancel if waiting for a new count
    try {
      setLoading(true);
      await backend.inc(); // Increment the count by 1
      await fetchCount(); // Fetch the new count
    } finally {
      setLoading(false);
    }
  };

  // Fetch the count on page load
  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col items-center justify-center text-center gap-4">
      <h1 className="text-2xl font-bold underline text-red-600 flex justify-center items-center">
      Vite + React + Motoko + Tailwindcss
    </h1>
      <div>
        <button onClick={increment} style={{ opacity: loading ? 0.5 : 1 }} className='bg-red-500 text-white font-bold py-2 px-4 rounded'>
          count is {count}
        </button>
        <p className="text-white mt-10">
          Edit <code>backend/Backend.mo</code> and save to test HMR
        </p>
      </div>
      <p  className="text-white">
        Click on the Vite, React, and Motoko logos to learn more
      </p>
    </div>
  );
}

export default App;
