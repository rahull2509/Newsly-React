import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import "./App.css";

const App: React.FC = () => {
  const apiKeys: string[] = [
    process.env.REACT_APP_NEWS_API_1,
    process.env.REACT_APP_NEWS_API_2,
    process.env.REACT_APP_NEWS_API_3,
    process.env.REACT_APP_NEWS_API_4,
    process.env.REACT_APP_NEWS_API_5,
  ].filter((key): key is string => key !== undefined);

  const [progress, setProgress] = useState<number>(0);

  return (
    <Router>
      <Navbar />
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Routes>
        <Route
          path="/"
          element={
            <News
              setProgress={setProgress}
              apiKeys={apiKeys}
              key="general"
              category="general"
            />
          }
        />
        <Route
          path="/business"
          element={
            <News
              setProgress={setProgress}
              apiKeys={apiKeys}
              key="business"
              category="business"
            />
          }
        />
        <Route
          path="/entertainment"
          element={
            <News
              setProgress={setProgress}
              apiKeys={apiKeys}
              key="entertainment"
              category="entertainment"
            />
          }
        />
        <Route
          path="/general"
          element={
            <News
              setProgress={setProgress}
              apiKeys={apiKeys}
              key="general2"
              category="general"
            />
          }
        />
        <Route
          path="/health"
          element={
            <News
              setProgress={setProgress}
              apiKeys={apiKeys}
              key="health"
              category="health"
            />
          }
        />
        <Route
          path="/science"
          element={
            <News
              setProgress={setProgress}
              apiKeys={apiKeys}
              key="science"
              category="science"
            />
          }
        />
        <Route
          path="/sports"
          element={
            <News
              setProgress={setProgress}
              apiKeys={apiKeys}
              key="sports"
              category="sports"
            />
          }
        />
        <Route
          path="/technology"
          element={
            <News
              setProgress={setProgress}
              apiKeys={apiKeys}
              key="technology"
              category="technology"
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
