import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WorkflowDiagram from "./components/WorkflowDiagram";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
