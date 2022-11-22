import { useState, useEffect } from "react";
import "./App.css";
//import { data } from "./data";
import Menu from "./components/Menu";
import RepoItem from "./components/RepoItem";
import {
  getFavorites,
  addToFavorites,
  deleteFromFavorites,
} from "./shared/favorites";
import RepoDetails from "./components/RepoDetails";

function App() {
  const [favData, setFavData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [allowDelete, setAllowDelete] = useState(true);
  const [repoDetailsId, setRepoDetailsId] = useState(-1);
  //const favData = getFavorites();

  const getDailyRepos = async (period) => {
    const rawData = await fetch(
      `https://localhost:7217/api/Repositories/fetch?period=${period}`
    );
    const reposData = await rawData.json();
    setAllData(reposData.items);
    toggleDisplay(false);
  };
  useEffect(() => {
    setFavData(getFavorites());
  }, []);

  //  ***** Repository Details handling *****
  const openRepoDetails = (id) => {
    setRepoDetailsId(id);
  };

  const closeRepoDetails = () => {
    setRepoDetailsId(-1);
  };

  // Ap.js => mount (return ()) => useEffect =>setFavData(...) => render => return()
  //                                          => getDailyRepos() => setAllRepos(...) =>  render.
  const getRepository = () => {
    if (repoDetailsId === -1) {
      return null;
    } else {
      return selectData().find((r) => r.id === repoDetailsId);
    }
  };

  const toggleDisplay = (state) => {
    setAllowDelete(state);
  };
  const addFav = (repo) => {
    addToFavorites(repo);
    setFavData(getFavorites());
  };

  const deleteFav = (id) => {
    deleteFromFavorites(id);
    setFavData(getFavorites());
  };

  const saveRepo = async (repository) => {
    const rawResponse = await fetch("https://localhost:7217/api/Repositories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(repository),
    });
    console.log("====================================");
    console.log(rawResponse);
    console.log("====================================");
  };

  const selectData = () => {
    if (allowDelete === true) {
      return favData;
    } else {
      return allData;
    }
  };
  return (
    <div className="App">
      <Menu toggleDisplay={toggleDisplay} getDailyRepos={getDailyRepos} />
      {repoDetailsId > -1 && (
        <RepoDetails
          repo={getRepository()}
          onRepoDetailsClick={closeRepoDetails}
          addFav={addFav}
          saveRepo={saveRepo}
          inFavorites={
            favData.findIndex((fav) => fav.id === getRepository().id) > -1
          }
        />
      )}
      <div className="list-of-repo-items">
        <table>
          <tbody>
            {selectData().map((r) => (
              <RepoItem
                onRepoItemClick={
                  repoDetailsId === -1 ? () => openRepoDetails(r.id) : () => {}
                }
                key={r.id}
                repo={r}
                addFav={addFav}
                allowDelete={allowDelete}
                deleteFav={deleteFav}
                inFavorites={favData.findIndex((fav) => fav.id === r.id) > -1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
