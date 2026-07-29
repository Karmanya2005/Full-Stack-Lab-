import React from "react";
import Header from "./components/Header";
import ComposePost from "./components/ComposePost";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import DraftList from "./components/DraftList";

import "./styles/app.css";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <ComposePost />

        <SearchBar />

        <FilterBar />

        <DraftList />
      </main>
    </div>
  );
}

export default App;