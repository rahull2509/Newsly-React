import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import "./App.css";

const App: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  
 
  const apiKeys: string[] = [
    "pub_638281c2db34bf06ad97e5cb29ed4c05cec2f",
    
  ];

  return (
    <Router>
      <div>
        <Navbar />
        <LoadingBar color="#f11946" progress={progress} height={3} />
        
        <Routes>
          <Route
            path="/"
            element={
              <News
                key="general"
                apiKeys={apiKeys}
                setProgress={setProgress}
                category="general"
              />
            }
          />
          <Route
            path="/business"
            element={
              <News
                key="business"
                apiKeys={apiKeys}
                setProgress={setProgress}
                category="business"
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News
                key="entertainment"
                apiKeys={apiKeys}
                setProgress={setProgress}
                category="entertainment"
              />
            }
          />
          <Route
            path="/general"
            element={
              <News
                key="general2"
                apiKeys={apiKeys}
                setProgress={setProgress}
                category="general"
              />
            }
          />
          <Route
            path="/health"
            element={
              <News
                key="health"
                apiKeys={apiKeys}
                setProgress={setProgress}
                category="health"
              />
            }
          />
          <Route
            path="/science"
            element={
              <News
                key="science"
                apiKeys={apiKeys}
                setProgress={setProgress}
                category="science"
              />
            }
          />
          <Route
            path="/sports"
            element={
              <News
                key="sports"
                apiKeys={apiKeys}
                setProgress={setProgress}
                category="sports"
              />
            }
          />
          <Route
            path="/technology"
            element={
              <News
                key="technology"
                apiKeys={apiKeys}
                setProgress={setProgress}
                category="technology"
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
