import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import MatchDetailsPage from './pages/MatchDetails';
import MatchListPage from './pages/Matches';
import PlayPage from './pages/Play';
import TeamSelectionPage from './pages/Teams';
import TossPage from './pages/Toss';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<TeamSelectionPage />} />
          <Route path='/toss/:team1/:team2' element={<TossPage />} />
          <Route path='play/:uuid' element={<PlayPage />} />
          <Route path='matches' element={<MatchListPage />} />
          <Route path='matches/:uuid' element={<MatchDetailsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
