import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import RunsTable from '../components/RunsTable';
import { fetchMatch, fetchTeam } from '../services/apiService';

const MatchDetailsPage = () => {
  const { uuid } = useParams();
  const [matchData, setMatchData] = useState(null);
  const [teamData1, setTeamData1] = useState(null);
  const [teamData2, setTeamData2] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matchData = await fetchMatch(uuid);
        setMatchData(matchData);

        const team1Data = await fetchTeam(matchData.team1);
        const team2Data = await fetchTeam(matchData.team2);
        setTeamData1(team1Data);
        setTeamData2(team2Data);
      } catch (error) {
        console.error('Error fetching match data:', error);
      }
    };
    fetchData();
  }, [uuid]);

  if (!matchData || !teamData1 || !teamData2) {
    return <div>Loading match data...</div>;
  }

  const { runs, firstBowl } = matchData;
  const totalRuns = runs.reduce((total, run) => total + run, 0);
  const isMatchFinished = runs.length === 12;

  const getTeamName = (teamId) => {
    if (teamData1 && teamData1.id === teamId) {
      return teamData1.name;
    } else if (teamData2 && teamData2.id === teamId) {
      return teamData2.name;
    }
    return '';
  };

  const calculateWinner = () => {
    const team1Runs = runs.slice(0, 6).reduce((total, run) => total + run, 0);
    const team2Runs = runs.slice(6).reduce((total, run) => total + run, 0);

    if (team1Runs > team2Runs) {
      return getTeamName(+matchData.team1);
    } else if (team2Runs > team1Runs) {
      return getTeamName(+matchData.team2);
    } else {
      return 'Match Draw';
    }
  };

  return (
    <div className='container mx-auto px-4 py-4'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-3xl font-semibold mb-4'>
          {getTeamName(+matchData.team1)} vs {getTeamName(+matchData.team2)}
        </h1>
        <p>
          {getTeamName(firstBowl)} has won the toss and elected to bowl first.
        </p>

        <p>Total Run: {totalRuns}</p>

        {isMatchFinished && (
          <div>
            <h2 className='text-2xl font-semibold'>
              Winner: {calculateWinner()}
            </h2>
          </div>
        )}
        <RunsTable runs={runs} />
      </div>
    </div>
  );
};

export default MatchDetailsPage;
