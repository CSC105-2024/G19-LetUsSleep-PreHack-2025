import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"; 
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx';
import SearchJob from './pages/SearchJob.jsx';
import JobDetails from './pages/JobDetails.jsx';
import FilterBar from './components/FilterBar.jsx';
import EachCompanyJobs from './pages/EachCompanyJobs.jsx';
import RecommendCompany from './components/RecommendCompany.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import UserDetail from './pages/UserDetail.jsx';
import CompanyDashboard from './pages/CompanyDashboard.jsx';
import CompanyProfileForm from './pages/CompanyProfileForm.jsx';
import CompanyJobPostForm from './pages/CompanyJobPostForm.jsx';
import ConfirmPopUp from './components/ConfirmPopUp.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import NotFoundPage from './components/NotFoundPage.jsx';
import JobApplicantLists from './components/JobApplicantLists.jsx';
import EditJobPost from './pages/EditJobPost.jsx';
import EditCoProfile from './pages/EditCoProfile.jsx';

const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />, 
    children: [
            {
                index: true,
                element: <Home/>,
            },
            {
                path: "/SearchJob",
                element: <SearchJob/>,
            },
            {
                path: "/JobDetails",
                element: <JobDetails/>,
            },
            {
                path: "/FilterBar",
                element: <FilterBar/>,
            },
            {
                path: "/EachCJobs",
                element: <EachCompanyJobs/>,
            },
            {
                path: "/RecCompany",
                element: <RecommendCompany/>,
            },
            {
                path: "/Login",
                element: <Login/>,
            },
            {
                path: "/Register",
                element: <Register/>,
            },
            {
                path: "/UserDetail",
                element: <UserDetail/>,
            },
            {
                path: "/CDashboard",
                element: <CompanyDashboard/>,
            },
            {
                path: "/CProfileForm",
                element: <CompanyProfileForm/>,
            },
            {
                path: "/CJobPostForm",
                element: <CompanyJobPostForm/>,
            },
            {
                path: "/EditJobPost/:id",
                element: <EditJobPost/>,
            },
            {
                path: "/EditCoProfile",
                element: <EditCoProfile/>,
            },
            {
                path: "/ConfirmPopUp",
                element: <ConfirmPopUp/>,
            },
            {
                path: "/Navbar",
                element: <Navbar/>,
            },
            {
                path: "/Footer",
                element: <Footer/>,
            },
        ],
    },
    {
        path: "*",
        element: <NotFoundPage/>,
    },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} /> 
  </StrictMode>,
)
