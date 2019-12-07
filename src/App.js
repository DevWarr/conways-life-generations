import React from "react";
import Generations from "./components/Generations";
import StartForm from "./components/StartForm";
import "./App.css";
import { generationTemplate, generationObjectify } from "./data";
import useLocalStorage from "./hooks/useLocalStorage";
import { generationUpdate } from "./actions";
import getGeneration from "./data/generationFunc";

function App() {
  const [generationArray, setGenerationArray] = useLocalStorage(
    "generationArray", generationTemplate
  );

  const [editable, setEditable] = React.useState(true);

  const updateGenerations = action => {
    if (!editable) return;
    setGenerationArray(  generationUpdate(generationArray, action) );
  };

  const toggleAlive = e => {
    if (!editable) return;
    const idArr = e.target.id.split("-");

    const action = {
      type: "CELL_TOGGLE",
      payload: {
        x: Number(idArr[0]),
        y: Number(idArr[1])
      }
    };
    updateGenerations(action);
  };

  const sizeChange = e => {
    if (!editable) return;
    console.log(e.target.id)
    updateGenerations({ type: e.target.id });
  };

  const startLife = async (generations, speed) => {
    setEditable(false);
    await getGeneration(generationArray, generations, speed, setGenerationArray);
    setEditable(true);
  }

  return (
    <div className="App">
      <Generations
        generationArray={ generationObjectify(generationArray) }
        toggleAlive={toggleAlive}
      />
      <StartForm sizeChange={sizeChange} startLife={startLife} />
    </div>
  );
}

export default App;
