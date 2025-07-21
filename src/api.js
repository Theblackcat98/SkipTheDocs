/**
 * @file This file will contain the logic for fetching and processing the 
 * configuration database (configs_db.json).
 */

const DB_URL = 'https://raw.githubusercontent.com/theblackcat98/SkipTheDocs/main/data/configs/configs_db.json';

/**
 * Fetches the configuration database.
 * @returns {Promise<Array<Object>>} A promise that resolves to the array of config objects.
 */
async function getConfigs() {
  try {
    const response = await fetch(DB_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Could not fetch the configuration database:", error);
    return [];
  }
}

/**
 * Searches and filters the configurations.
 * @param {Array<Object>} configs - The array of configuration objects.
 * @param {Object} filters - The filters to apply.
 * @param {string} filters.query - The full-text search query.
 * @param {string} filters.toolName - The tool name to filter by.
 * @param {string} filters.author - The author to filter by.
 * @param {Array<string>} filters.tags - The tags to filter by.
 * @returns {Array<Object>} The filtered array of configurations.
 */
function searchConfigs(configs, { query = '', toolName = '', author = '', tags = [] }) {
  const lowerCaseQuery = query.toLowerCase();

  return configs.filter(config => {
    const matchesQuery = !query || Object.values(config).some(value =>
      String(value).toLowerCase().includes(lowerCaseQuery)
    );
    const matchesTool = !toolName || config.toolName === toolName;
    const matchesAuthor = !author || config.author === author;
    const matchesTags = !tags.length || tags.every(tag => config.tags.includes(tag));

    return matchesQuery && matchesTool && matchesAuthor && matchesTags;
  });
}

// Example Usage:
//
// async function main() {
//   const allConfigs = await getConfigs();
//   
//   const searchResults = searchConfigs(allConfigs, { query: 'terminal' });
//   console.log("Search Results:", searchResults);
//
//   const filterResults = searchConfigs(allConfigs, { toolName: 'alacritty' });
//   console.log("Filter Results:", filterResults);
// }
//
// main();