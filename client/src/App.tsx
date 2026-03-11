import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AgentDashboard from './pages/AgentDashboard'
import NewReportPage from './pages/NewReportPage'
import CSVUploadPage from './pages/CSVUploadPage'
import MyReportsPage from './pages/MyReportsPage'

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
            <Route path='sendReports' element={<NewReportPage />}/>
            <Route path='addCSV' element={<CSVUploadPage />}/>
            <Route path='showReports' element={<MyReportsPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
