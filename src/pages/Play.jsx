import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RunsTable from '../components/RunsTable';
import { fetchMatch, fetchTeam, updateMatchRuns } from '../services/apiService';

const PlayPage = () => {
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

  const handleBowl = async () => {
    const runOptions = [1, 2, 3, 4, 6];
    const newRun = runOptions[Math.floor(Math.random() * runOptions.length)];
    const updatedRuns = [...runs, newRun];

    try {
      await updateMatchRuns(uuid, updatedRuns);

      setMatchData((prevData) => ({ ...prevData, runs: updatedRuns }));
    } catch (error) {
      console.error('Error updating runs:', error);
    }
  };

  const calculateWinner = () => {
    const team1Runs = runs.slice(0, 6).reduce((total, run) => total + run, 0);
    const team2Runs = runs.slice(6).reduce((total, run) => total + run, 0);

    if (team1Runs > team2Runs) {
      return getTeamName(teamData2.id);
    } else if (team2Runs > team1Runs) {
      return getTeamName(teamData1.id);
    } else {
      return 'Match Draw';
    }
  };

  return (
    <div className='container mx-auto px-4 py-4'>
      <div className='flex flex-col items-center justify-center text-center'>
        <h1 className='text-3xl font-semibold mb-4'>
          {getTeamName(+matchData.team1)} vs {getTeamName(+matchData.team2)}
        </h1>
        <p>
          {getTeamName(firstBowl)} has won the toss and elected to bowl first.
        </p>

        <p>Total Run: {totalRuns}</p>
        {!isMatchFinished && (
          <button
            className='mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg'
            onClick={handleBowl}>
            Bowl
          </button>
        )}
        {isMatchFinished && (
          <div>
            <h2 className='text-2xl font-semibold'>Match Finished</h2>
            <p>Well done!</p>
            <p>Winner: {calculateWinner()}</p>
          </div>
        )}
        <RunsTable runs={runs} />
      </div>
    </div>
  );
};

export default PlayPage;
