import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from "react-top-loading-bar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default class App extends Component {
  pageSize = 10;

  // Multiple API keys from .env.local
  apiKeys = [
    process.env.REACT_APP_NEWS_API_1,
    process.env.REACT_APP_NEWS_API_2,
  ];

  constructor() {
    super();
    this.state = {
      progress: 0,
    };
  }

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };

  render() {
    return (
      <Router>
        <Navbar />
        <LoadingBar
          color="#f11946"
          progress={this.state.progress}
          onLoaderFinished={() => this.setState({ progress: 0 })}
        />
        <Routes>
          <Route
            path="/"
            element={
              <News
                setProgress={this.setProgress}
                apiKeys={this.apiKeys}   // ✅ fix here
                key="general"
                pageSize={this.pageSize}
                category="general"
              />
            }
          />
          <Route
            path="/business"
            element={
              <News
                setProgress={this.setProgress}
                apiKeys={this.apiKeys}   // ✅ fix here
                key="business"
                pageSize={this.pageSize}
                category="business"
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News
                setProgress={this.setProgress}
                apiKeys={this.apiKeys}   // ✅ fix here
                key="entertainment"
                pageSize={this.pageSize}
                category="entertainment"
              />
            }
          />
          <Route
            path="/general"
            element={
              <News
                setProgress={this.setProgress}
                apiKeys={this.apiKeys}   // ✅ fix here
                key="general"
                pageSize={this.pageSize}
                category="general"
              />
            }
          />
          <Route
            path="/health"
            element={
              <News
                setProgress={this.setProgress}
                apiKeys={this.apiKeys}   // ✅ fix here
                key="health"
                pageSize={this.pageSize}
                category="health"
              />
            }
          />
          <Route
            path="/science"
            element={
              <News
                setProgress={this.setProgress}
                apiKeys={this.apiKeys}   // ✅ fix here
                key="science"
                pageSize={this.pageSize}
                category="science"
              />
            }
          />
          <Route
            path="/sports"
            element={
              <News
                setProgress={this.setProgress}
                apiKeys={this.apiKeys}   // ✅ fix here
                key="sports"
                pageSize={this.pageSize}
                category="sports"
              />
            }
          />
          <Route
            path="/technology"
            element={
              <News
                setProgress={this.setProgress}
                apiKeys={this.apiKeys}   // ✅ fix here
                key="technology"
                pageSize={this.pageSize}
                category="technology"
              />
            }
          />
        </Routes>
      </Router>
    );
  }
}
