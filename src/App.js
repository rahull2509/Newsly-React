import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  const pageSize = 10;

  // Multiple API keys from .env.local
  const apiKeys = [
    process.env.REACT_APP_NEWS_API_1,
    process.env.REACT_APP_NEWS_API_2,
    process.env.REACT_APP_NEWS_API_3,
    process.env.REACT_APP_NEWS_API_4,
    process.env.REACT_APP_NEWS_API_5,
  ];

  const [progress, setProgress] = useState(0);

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
              pageSize={pageSize}
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
              pageSize={pageSize}
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
              pageSize={pageSize}
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
              pageSize={pageSize}
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
              pageSize={pageSize}
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
              pageSize={pageSize}
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
              pageSize={pageSize}
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
              pageSize={pageSize}
              category="technology"
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
