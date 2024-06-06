import { useState } from "react";
import DFS from "./components/DFS";
import BFS from "./components/BFS";
import Dijkstra from "./components/Djikstra";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
function App() {
  const [algo, setAlgo] = useState("Dijkstra");

  const algorithm = () => {
    switch (algo) {
      case "Dijkstra":
        return <Dijkstra />;
      case "BFS":
        return <BFS />;
      case "DFS":
        return <DFS />;
      default:
        return <Dijkstra />;
    }
  };

  return (
    <div>
      <Header algo={algo} setAlgo={setAlgo} />
      {algorithm()}
      <ToastContainer />
    </div>
  );
}

export default App;
