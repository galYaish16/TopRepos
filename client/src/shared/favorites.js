const FAVORITES_KEY = "favoritesArrayKey";

export const getFavorites = () => {
  const rawData = localStorage.getItem(FAVORITES_KEY);
  let favData = [];
  if (rawData) {
    favData = JSON.parse(rawData);
  }
  return favData;
};

const saveFavorites = (favData) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favData));
};

export const addToFavorites = (repo) => {
  const favData = getFavorites();

  favData.push(repo);
  saveFavorites(favData);
};

export const deleteFromFavorites = (id) => {
  const favData = getFavorites();
  const tmp = favData.filter((repo) => repo.id !== id);
  saveFavorites(tmp);
};
