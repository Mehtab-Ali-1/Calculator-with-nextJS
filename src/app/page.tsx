"use client";
import { useEffect, useState } from "react";

export default function Calculator () {

  const arr : any = [
    `C`, `x`, ``, ``,   // First row with "C" and "x" only
    `7`, `8`, `9`, `/`, // Second row starts with numbers and operator
    `4`, `5`, `6`, `*`,
    `1`, `2`, `3`, `-`,
    `0`, `.`, `=`, `+`
  ];
const [value, setValue] = useState(``);

const submitHandle = (e?:any) => {
  e?.preventDefault();
  try {
    const ans = eval(value);
    setValue(ans.toString());
  } catch (err) {
    alert("Invalid Inputs");
  }
}

const handleClick = (e:any) => {
  const id = e.target.id;
  if(id === `C`) {
    setValue(``);
  } else if (id === `x`) {
    setValue((val) => val.slice(0, -1));
  } else if (id === `=`) {
      submitHandle();
    //produce a result
  } else {
    setValue((val) => val + id);
  }
}

const handleKeyDown = (e: KeyboardEvent) => {
  const key = e.key;
  if (key === "Enter") {
    submitHandle();
  } else if (key === "Backspace") {
    setValue((val) => val.slice(0, -1));
  } else if (key === "Escape") {
    setValue(``);
  } else if (/^[0-9+\-*/.]$/.test(key)) {
    setValue((val) => val + key);
  }
};

useEffect(() => {
  window.addEventListener("keydown", handleKeyDown);
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, []);

const handleChange = (e:any) => {
  setValue(e.target.value);
}

  return (
    <main className="h-screen w-screen flex flex-col space-y-12 justify-center items-center bg-gradient-to-r from-yellow-200 to-orange-400">
      <h1 className="md:text-4xl text-3xl text-slate-800 font-bold mt-10 ">
        Calculator
      </h1>
      {/* input & button container */}
      <div className="flex flex-col justify-center items-center">
        {/* input  */}
        <form onSubmit={(e) => e.preventDefault()}>
          <input
          value={value}
          onChange={handleChange}
          className="bg-transparent h-12 w-64 border-none outline-none text-2xl md:text-3xl" type="text" placeholder="0" />
        </form>
        {/* buttons */}
        <div
          onClick={handleClick}
          className=" grid grid-cols-4 text-2xl md:text-3xl gap-12 rounded-2xl  bg-slate-800 text-white px-7 py-4 mb-7">
        {
          arr.map((item:any, idx:any) => (
            <button
            className=""
            id={item}
            key={idx}
            >{item}</button>
          ))
        }
        </div>
      </div>
    </main>
  )
}
