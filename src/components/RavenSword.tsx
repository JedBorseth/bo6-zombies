import { useState } from "react";
import gameData from "../assets/gameData.json";
export const RavenSword: React.FC = () => {
  const [clicked, setClicked] = useState("");
  const map = gameData.bo6.zombieMaps.find(
    (map: { mapSlug: string }) => map.mapSlug === "/map/citadel/"
  );
  if (!map) {
    return <div>error</div>;
  }
  const solver = map.mapData.solvers.find(
    (solver: { solverSlug: string }) =>
      solver.solverSlug === "/solvers/bo6/raven-sword/"
  ) as {
    solverName: string;
    solverImage: string;
    solverSlug: string;
    solverData: {
      images: { src: string; name: string }[];
    };
  };
  if (!solver) {
    return <div>error</div>;
  }
  const handleClick = (name: string): void => {
    setClicked(name);
  };
  const GetSolution = () => {
    const statue = clicked;
    switch (statue) {
      case "Jaws":
        return (
          <div className="grid place-items-center h-screen">
            <img src="/solvers/raven-jaw.jpg" alt="jaws" className="w-3/4" />
          </div>
        );
        break;
      case "2 Bird Skulls":
        return (
          <div className="grid place-items-center h-screen">
            <img src="/solvers/raven-skulls.jpg" alt="jaws" className="w-3/4" />
          </div>
        );
        break;
      case "Scorpion":
        return (
          <div className="grid place-items-center h-screen">
            <img
              src="/solvers/raven-scorpion.jpg"
              alt="jaws"
              className="w-3/4"
            />
          </div>
        );
        break;
      case "Fish":
        return (
          <div className="grid place-items-center h-screen">
            <img src="/solvers/raven-fish.jpg" alt="jaws" className="w-3/4" />
          </div>
        );
        break;
      case "Horn":
        return (
          <div className="grid place-items-center h-screen">
            <img src="/solvers/raven-horn.jpg" alt="jaws" className="w-3/4" />
          </div>
        );
        break;
      default:
        return <div>error</div>;
    }
  };
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold text-center my-4">
          {solver.solverName}
        </h1>
      </div>
      {!clicked ? (
        <div className="flex flex-wrap gap-4 justify-around my-5 gap-y-6">
          {solver.solverData.images.map((img, index) => (
            <div
              key={index}
              className="w-28 h-28"
              onClick={() => {
                handleClick(img.name);
              }}
            >
              {/* @ts-ignore */}
              <span>{img.name}</span>
              <img
                // @ts-ignore
                src={img.src}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <GetSolution />
          <a href="./">
            <button className="bg-red-500 rounded p-4 text-white fixed bottom-4 left-4">
              Back
            </button>
          </a>
        </div>
      )}
    </>
  );
};

export default RavenSword;
