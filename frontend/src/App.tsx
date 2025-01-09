import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import ItemPage from './pages/ItemPage';
import MainLayout from './layouts/main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/items" element={<ListPage />} />
          <Route path="/items/:id" element={<ItemPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
