import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MatchRow from '../components/MatchRow';
import { fetchMatches, removeMatch } from '../services/apiService';

const MatchListPage = () => {
  const [matches, setMatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMatches, setTotalMatches] = useState(0);
  const matchesPerPage = 10;

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const data = await fetchMatches();
        setMatches(data);
        setTotalMatches(data.length);
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };

    fetchMatchData();
  }, []);

  const handleDeleteMatch = async (matchId) => {
    try {
      await removeMatch(matchId);
      const updatedMatches = matches.filter((match) => match.id !== matchId);
      setMatches(updatedMatches);
      setTotalMatches((prevTotal) => prevTotal - 1);
    } catch (error) {
      console.error('Error deleting match:', error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastMatch = currentPage * matchesPerPage;
  const indexOfFirstMatch = indexOfLastMatch - matchesPerPage;
  const currentMatches = matches.slice(indexOfFirstMatch, indexOfLastMatch);

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-semibold mb-4'>Match List</h1>
      <table className='min-w-full text-center'>
        <thead>
          <tr>
            <th className='p-2 border'>Match Name</th>
            <th className='p-2 border'>View Details</th>
            <th className='p-2 border'>Delete Match</th>
          </tr>
        </thead>
        <tbody>
          {currentMatches.map((match) => (
            <MatchRow
              key={match.id}
              match={match}
              handleDeleteMatch={handleDeleteMatch}
            />
          ))}
        </tbody>
      </table>
      {matches.length > 0 && (
        <div className='mt-4 flex items-center justify-between'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? 'bg-gray-300'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}>
            Previous
          </button>
          <p className='text-lg'>
            Page {currentPage} of {Math.ceil(totalMatches / matchesPerPage)}
          </p>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(totalMatches / matchesPerPage)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === Math.ceil(totalMatches / matchesPerPage)
                ? 'bg-gray-300'
                : 'bg-purple-500 hover:bg-purple-600 text-white'
            }`}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MatchListPage;
