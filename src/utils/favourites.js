// Get favourites from localStorage
export function getFavourites() {
  const stored = localStorage.getItem('favourites');
  return stored ? JSON.parse(stored) : [];
}

// Save favourites to localStorage
export function saveFavourites(favourites) {
  localStorage.setItem('favourites', JSON.stringify(favourites));
}

// Add a property to favourites (prevents duplicates)
export function addFavourite(propertyId) {
  const favs = getFavourites();

  // Prevent duplicates
  if (!favs.includes(propertyId)) {
    favs.push(propertyId);
    saveFavourites(favs);
  }

  return favs;
}

// Remove a property from favourites
export function removeFavourite(propertyId) {
  const favs = getFavourites().filter(id => id !== propertyId);
  saveFavourites(favs);
  return favs;
}

// Clear all favourites
export function clearAllFavourites() {
  saveFavourites([]);
  return [];
}

// Check if a property is in favourites
export function isFavourite(propertyId) {
  const favs = getFavourites();
  return favs.includes(propertyId);
}
