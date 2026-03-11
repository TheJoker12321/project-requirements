import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AgentDashboard from './pages/AgentDashboard'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='dashboard'>
            <Route path='admin' />
            <Route path='agent' element={<AgentDashboard />}/>
          </Route>
          <Route path='agent'>
            <Route path='sendReports' />
            <Route path='addCSV'/>
            <Route path='showReports' />
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
