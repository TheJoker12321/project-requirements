import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AgentDashboard from './pages/AgentDashboard'
import NewReportPage from './pages/NewReportPage'
import CSVUploadPage from './pages/CSVUploadPage'
import MyReportsPage from './pages/MyReportsPage'
import AdminDashboard from './pages/AdminDashboard'
import AdminUsersPage from './pages/AdminUsersPage'
import AdminReportsPage from './pages/AdminReportsPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='dashboard'>
            <Route path='admin' element={<AdminDashboard />}/>
            <Route path='agent' element={<AgentDashboard />}/>
          </Route>
          <Route path='agent'>
            <Route path='sendReports' element={<NewReportPage />}/>
            <Route path='addCSV' element={<CSVUploadPage />}/>
            <Route path='showReports' element={<MyReportsPage />}/>
          </Route>
          <Route path='admin'>
            <Route path='createUsers' element={<AdminUsersPage />}/>
            <Route path='searchReports' element={<AdminReportsPage />}/>
          </Route>
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
