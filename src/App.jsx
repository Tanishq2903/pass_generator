import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  //use state tab kaam aata h jab apne ko default value update krke nayi value leni ho

  const [length, setLength] = useState(8); //for length
  const [number, setNumber] = useState(false); //ye length button on off
  const [characters, setCharacters] = useState(false); //ye char button on off
  const [password, setPassword] = useState(""); //ye password change krne k liye

  //ye reference k lie kaam aaya h jisse jab copy kre to text pr select hua dikhe
  const passwordRef = useRef(null);

  //callback isliye use hua h kyuki ye memorise krne k kaam aata h function ko isme [functiom,dependencies]aati h
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "123456789";
    if (characters) str += "!@#$%^&*()";
    for (let i = 1; i <= length; i++) {
      let random = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(random);
    }
    setPassword(pass);
  }, [length, number, characters, setPassword]); //ye dependencies h

  //useeffect baar baar password display me change hone k liye kaam aara h jab bhi length number char yaa khud password chnage hoga toh ye apne aap display me change krega
  useEffect(() => {
    passwordGenerator();
  }, [length, number, characters, passwordGenerator]);
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3">Password generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
        >
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={number}
            id="numberInput"
            onChange={() => {
              setNumber((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={characters}
            id="characterInput"
            onChange={() => {
              setCharacters((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
