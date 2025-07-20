
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState, useEffect, useCallback, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeChars, setIncludeChars] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) str += "0123456789";
    if (includeChars) str += "!@#$%^&*()_+[]{}|;:',.<>?";

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [length, includeNumbers, includeChars, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 101);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, includeNumbers, includeChars, generatePassword]);

  return (
  <div className="w-full h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
    <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col gap-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center">Password Generator</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-md outline-none"
        />
        <button
          onClick={copyPasswordToClipboard}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition"
        >
          Copy
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center w-full md:w-1/2 gap-2">
          <label htmlFor="length" className="whitespace-nowrap">
            Length: {length}
          </label>
          <input
            id="length"
            type="range"
            min={8}
            max={100}
            value={length}
            className="w-full accent-blue-500"
            onChange={(e) => setLength(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers((prev) => !prev)}
              className="accent-blue-600"
            />
            Numbers
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={includeChars}
              onChange={() => setIncludeChars((prev) => !prev)}
              className="accent-blue-600"
            />
            Characters
          </label>
        </div>
      </div>
    </div>
  </div>
);

}

export default App;
