import React, { useState } from "react";
import gameData from "../assets/gameData.json";

type SymbolKey = "X" | "Y" | "Z";
type SymbolsState = Record<SymbolKey, number | null>;
type SolutionsState = {
  equation1: number | null;
  equation2: number | null;
  equation3: number | null;
};

type ClickedState = {
  X: number | null;
  Y: number | null;
  Z: number | null;
};

const TerminusSolver: React.FC = () => {
  const solverData = gameData.bo6.zombieMaps.find(
    (map) => map.mapSlug === "/map/terminus/"
  )?.mapData.solvers[0].solverData;

  const imgToNum = (img: number): number => {
    switch (img) {
      case 1:
        return 0;
      case 2:
        return 10;
      case 3:
        return 11;
      case 4:
        return 20;
      case 5:
        return 21;
      case 6:
        return 22;
      default:
        return NaN;
    }
  };

  const [symbols, setSymbols] = useState<SymbolsState>({
    X: null,
    Y: null,
    Z: null,
  });
  const [solutions, setSolutions] = useState<SolutionsState>({
    equation1: null,
    equation2: null,
    equation3: null,
  });
  const [clicked, setClicked] = useState<ClickedState>({
    X: null,
    Y: null,
    Z: null,
  });

  const handleClick = (num: number, symbolCount: number): void => {
    const value = imgToNum(num);
    const newSymbols: SymbolsState = { ...symbols };
    const newClicked: ClickedState = { ...clicked };

    if (symbolCount === 1) {
      newSymbols.X = value;
      newClicked.X = num;
    }
    if (symbolCount === 2) {
      newSymbols.Y = value;
      newClicked.Y = num;
    }
    if (symbolCount === 3) {
      newSymbols.Z = value;
      newClicked.Z = num;
    }

    setSymbols(newSymbols);
    setClicked(newClicked);

    if (
      newSymbols.X !== null &&
      newSymbols.Y !== null &&
      newSymbols.Z !== null
    ) {
      const equation1 = 2 * newSymbols.X + 11;
      const equation2 = 2 * newSymbols.Z + newSymbols.Y - 5; // Corrected offset
      const equation3 = newSymbols.Y + newSymbols.Z - newSymbols.X;

      setSolutions({ equation1, equation2, equation3 });
    }
  };

  const getButtonClasses = (num: number, symbolKey: SymbolKey): string => {
    return clicked[symbolKey] === num
      ? "w-10 h-10 border-4 border-red-500 rounded"
      : "w-10 h-10";
  };

  return (
    <main className="flex flex-wrap gap-4 justify-center h-full">
      <div className="p-4 bg-neutral-200 rounded gap-4 grid grid-cols-3">
        <h1 className="col-span-3 text-center">First Symbol</h1>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <button key={`first-${num}`} onClick={() => handleClick(num, 1)}>
            <img
              src={solverData?.images[num - 1] as string}
              alt="Terminus Math Symbol"
              className={getButtonClasses(num, "X")}
            />
          </button>
        ))}
      </div>

      <div className="p-4 bg-neutral-200 rounded gap-4 grid grid-cols-3">
        <h1 className="col-span-3 text-center">Second Symbol</h1>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <button key={`second-${num}`} onClick={() => handleClick(num, 2)}>
            <img
              src={solverData?.images[num - 1] as string}
              alt="Terminus Math Symbol"
              className={getButtonClasses(num, "Y")}
            />
          </button>
        ))}
      </div>

      <div className="p-4 bg-neutral-200 rounded gap-4 grid grid-cols-3">
        <h1 className="col-span-3 text-center">Third Symbol</h1>
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <button key={`third-${num}`} onClick={() => handleClick(num, 3)}>
            <img
              src={solverData?.images[num - 1] as string}
              alt="Terminus Math Symbol"
              className={getButtonClasses(num, "Z")}
            />
          </button>
        ))}
      </div>
      <div className="p-4 bg-neutral-300 rounded w-full max-w-md h-1/3">
        <h2 className="text-center font-bold">Solutions</h2>
        <p className="text-center">
          Equation 1: {solutions.equation1 ?? "Select all symbols"}
        </p>
        <p className="text-center">
          Equation 2: {solutions.equation2 ?? "Select all symbols"}
        </p>
        <p className="text-center">
          Equation 3: {solutions.equation3 ?? "Select all symbols"}
        </p>
      </div>
    </main>
  );
};

export default TerminusSolver;
