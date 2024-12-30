import { useState } from "react";
import gameData from "../assets/gameData.json";
interface ImageGridProps {
  images: string[];
}

const ImageGrid: React.FC<ImageGridProps> = ({ images }) => {
  const [clickOrder, setClickOrder] = useState<number[]>([]);
  const [showOrder, setShowOrder] = useState(false);

  const handleClick = (index: number): void => {
    if (clickOrder.length >= 6 || clickOrder.includes(index)) return;
    setClickOrder([...clickOrder, index]);

    // delay to prevent accidental clicks
    if (clickOrder.length === 5) {
      setTimeout(() => setShowOrder(true), 100);
    }
  };

  if (showOrder) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Your Order</h2>
        <div className="flex flex-wrap gap-4 justify-around my-5 gap-y-6">
          {clickOrder.map((index, i) => (
            <div key={i} className="w-28 h-28">
              <span>{i + 1}</span>
              <img
                src={images[index]}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        <a
          href="/solvers/bo6/citadel-symbols/"
          className="fixed bottom-4 left-4 w-full"
        >
          <button className="bg-red-500 rounded p-4 text-white">Back</button>
        </a>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-5 gap-4 p-2">
      {images.map((src, index) => (
        <button
          key={index}
          className={`relative group ${
            clickOrder.includes(index) ? "opacity-50 pointer-events-none" : ""
          }`}
          onClick={() => handleClick(index)}
        >
          <img
            src={src}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {clickOrder.includes(index) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-bold">
              {clickOrder.indexOf(index) + 1}
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const map = gameData.bo6.zombieMaps.find(
    (map: { mapSlug: string }) => map.mapSlug === "/map/citadel/"
  );
  if (!map) {
    return <div>error</div>;
  }
  const solver = map.mapData.solvers.find(
    (solver: { solverSlug: string }) =>
      solver.solverSlug === "/solvers/bo6/citadel-symbols/"
  );
  if (!solver) {
    return <div>error</div>;
  }
  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-4">
        {solver.solverName}
      </h1>
      <ImageGrid images={solver.solverData.images} />
    </div>
  );
};

export default App;
