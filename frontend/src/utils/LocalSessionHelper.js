// Utility functions for managing session storage operations (save, retrieve, remove, and clear).

// Save a key-value pair to session storage
export const saveToSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value)); // Convert value to JSON and store it
};

// Retrieve a value from session storage by key
export const getFromSessionStorage = (key) => {
  const data = sessionStorage.getItem(key); // Get the item from session storage
  return data ? JSON.parse(data) : null; // Parse JSON if data exists, otherwise return null
};

// Remove a specific key-value pair from session storage
export const removeFromSessionStorage = (key) => {
  sessionStorage.removeItem(key); // Remove the item by key
};

// Clear all data from session storage
export const clearSessionStorage = () => {
  sessionStorage.clear(); // Completely clear the session storage
};
