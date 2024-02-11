"use client";

import React, { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState<number | string>('');
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCalculate = () => {
    const inputNumber = parseFloat(inputValue as string);
    const totalPieces = 1570.37; // Total pieces produced in 8 hours
    const targetPieces = totalPieces * 1.06; // Target number of pieces (106% of production)

    if (inputNumber <= totalPieces) {
      const piecesRemaining = targetPieces - inputNumber;
      const piecesPerMinute = totalPieces / (8 * 60); // Average pieces produced per minute
      const minutesRemaining = Math.ceil(piecesRemaining / piecesPerMinute); // Round up to nearest whole number
      setRemainingTime(minutesRemaining);
    } else {
      alert('You have already exceeded 106% in 8 hours.');
      setRemainingTime(0);
    }
  };

  return (
    <main className="flex justify-center items-center min-h-screen">
      <div className="container mx-4 w-full md:w-1/2 shadow-lg shadow-black rounded-lg bg-black">
        <h1 className='text-3xl text-center mt-2'>Leistungsgradrechner</h1>
        <h1 className=" text-lg italic text-center mt-2">(Wartezeiten um 106% in 8 Stunden zu erreichen)</h1>
        <div className="mt-4 flex justify-center">
          <div className="flex mx-5">
            <input
              type="number"
              className="border border-gray-300 text-black rounded-md px-3 py-2 mr-2"
              placeholder="Stückzahl"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCalculate}
            >
              Berechnen
            </button>
          </div>
        </div>
        <h2 className='text-center my-4 text-white'>Wartezeiten</h2>

        {/* Centered Table with 2 columns and 3 rows */}
        <div className="my-4 flex justify-center">
          <table className="border border-white">
            <thead>
              <tr>
                <th className="border border-white"></th>
                <th className="border border-white px-2">Wartezeit</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-white px-2">Technisch (ungepl.)</td>
                <td className="border border-white font-bold text-right px-2">{remainingTime ? `${remainingTime} min` : null}</td>
              </tr>
              <tr>
                <td className="border border-white px-2">Technisch (geplant)</td>
                <td className="border border-white font-bold text-right px-2">~</td>
              </tr>
              <tr>
                <td className="border border-white px-2">Qualität</td>
                <td className="border border-white font-bold text-right px-2">~</td>
              </tr>
            </tbody>
          </table>
        </div>

        {remainingTime !== null && (
          <div className="text-center my-4">
            {remainingTime > 0 ? (
              <p>Wartezeit um 106% in 8 Stunden zu erreichen: {remainingTime} Minuten</p>
            ) : (
              <p>You have already reached or exceeded 106% in 8 hours.</p>
            )}
          </div>
        )}


      </div>
    </main>
  );
}
