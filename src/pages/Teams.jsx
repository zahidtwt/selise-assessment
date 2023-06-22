import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import TeamCard from '../components/TeamCard';
import { fetchTeams } from '../services/apiService';

const TeamSelectionPage = () => {
  const [teams, setTeams] = useState([]);
  const [selectedTeams, setSelectedTeams] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsData = await fetchTeams();
        setTeams(teamsData);
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    fetchData();
  }, []);

  const handleTeamSelect = (teamId) => {
    if (selectedTeams.includes(teamId)) {
      setSelectedTeams(selectedTeams.filter((id) => id !== teamId));
    } else {
      if (selectedTeams.length < 2) {
        setSelectedTeams([...selectedTeams, teamId]);
      }
    }
  };

  const handleStartMatch = () => {
    if (selectedTeams.length === 2) {
      const team1 = selectedTeams[0];
      const team2 = selectedTeams[1];
      navigate(`/toss/${team1}/${team2}`);
    } else {
      console.log('Please select two teams before starting the match.');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='text-3xl font-semibold mb-4'>Let's Play Cricket</h1>
      <div className='grid grid-cols-2 gap-2 justify-center'>
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            selected={selectedTeams.includes(team.id)}
            onSelect={handleTeamSelect}
            selectedTeams={selectedTeams}
          />
        ))}
      </div>
      {selectedTeams.length === 2 && (
        <button
          className='mt-4  px-4 py-2 bg-purple-500 text-white rounded-lg'
          onClick={handleStartMatch}>
          Start Match
        </button>
      )}
    </div>
  );
};

export default TeamSelectionPage;
