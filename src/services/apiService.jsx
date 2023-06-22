import axios from 'axios';
const API_BASE_URL = 'http://localhost:3001';
const fetchTeams = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teams`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};
const fetchTeam = async (teamId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/teams/${teamId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team:', error);
    throw error;
  }
};

const fetchMatches = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/matches`);
    return response.data;
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error;
  }
};

const fetchMatch = async (matchId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/matches/${matchId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching match:', error);
    throw error;
  }
};

const removeMatch = async (matchId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/matches/${matchId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting match:', error);
    throw error;
  }
};

const postMatch = async (matchData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/matches`, matchData);
    return response.data;
  } catch (error) {
    console.error('Error posting match:', error);
    throw error;
  }
};
const updateMatchRuns = async (uuid, updatedRuns) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/matches/${uuid}`, {
      runs: updatedRuns,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating runs:', error);
    throw error;
  }
};

export {
  fetchTeams,
  fetchTeam,
  fetchMatches,
  fetchMatch,
  postMatch,
  updateMatchRuns,
  removeMatch,
};
