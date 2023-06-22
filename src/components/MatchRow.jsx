import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTeam } from '../services/apiService';

const MatchRow = ({ match, handleDeleteMatch }) => {
  const [team1Name, setTeam1Name] = useState('');
  const [team2Name, setTeam2Name] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const team1Name = await fetchTeamName(match.team1);
        const team2Name = await fetchTeamName(match.team2);
        setTeam1Name(team1Name);
        setTeam2Name(team2Name);
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };
    fetchData();
  }, [match.team1, match.team2]);

  const fetchTeamName = async (teamId) => {
    const teamData = await fetchTeam(teamId);
    return teamData.name;
  };
  return (
    <tr>
      <td className='p-2 border'>{`${team1Name} vs ${team2Name}`}</td>
      <td className='p-2 border'>
        <Link
          to={`/matches/${match.id}`}
          className='text-purple-500 hover:underline'>
          View Details
        </Link>
      </td>
      <td className='p-2 border'>
        <button
          onClick={() => handleDeleteMatch(match.id)}
          className='text-red-500 hover:underline'>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default MatchRow;
