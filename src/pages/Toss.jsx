import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import TeamCard from '../components/TeamCard';
import { fetchTeam, postMatch } from '../services/apiService';

const TossPage = () => {
  const { team1, team2 } = useParams();

  const [teamData1, setTeamData1] = useState(null);
  const [teamData2, setTeamData2] = useState(null);
  const [firstBowl, setFirstBowl] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const team1Data = await fetchTeam(team1);
        const team2Data = await fetchTeam(team2);
        setTeamData1(team1Data);
        setTeamData2(team2Data);
      } catch (error) {
        console.error('Error fetching team data:', error);
      }
    };
    fetchData();
  }, [team1, team2]);

  const handleSelectBowler = (teamId) => {
    setFirstBowl(teamId);
  };

  const handleStartMatch = async () => {
    const matchData = {
      team1: team1,
      team2: team2,
      runs: [],
      firstBowl: firstBowl,
    };

    const res = await postMatch(matchData);
    console.log(res);
    const matchId = res.id;
    navigate(`/play/${matchId}`);
  };

  if (!teamData1 || !teamData2) {
    return <div>Loading teams...</div>;
  }

  const getTeamName = (teamId) => {
    if (teamData1 && teamData1.id === teamId) {
      return teamData1.name;
    } else if (teamData2 && teamData2.id === teamId) {
      return teamData2.name;
    }
    return '';
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-semibold mb-4'>
          Select which team will bowl first
        </h1>
        <div className='grid grid-cols-2 gap-6 justify-center'>
          <TeamCard
            team={teamData1}
            selected={firstBowl === teamData1.id}
            onSelect={handleSelectBowler}
            selectedTeams={[firstBowl]}
          />
          <TeamCard
            team={teamData2}
            selected={firstBowl === teamData2.id}
            onSelect={handleSelectBowler}
            selectedTeams={[firstBowl]}
          />
        </div>
        {firstBowl && (
          <div className='flex flex-col justify-center m-4'>
            <p>
              Selected team for bowling: <b>{getTeamName(firstBowl)}</b>
            </p>
            <button
              className='w-[20vw] mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg'
              onClick={handleStartMatch}>
              Let's Play
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TossPage;
