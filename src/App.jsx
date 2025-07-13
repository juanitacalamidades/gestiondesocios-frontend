import './index.css'
import { useState } from 'react'
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import Context from "./Context"
import Home from './Home'
import Register from './Register'
import Login from "./Login"
import Dashboard from './Dashboard'
import Members from "./Members";
import CreateMember from "./CreateMember"
import ByType from './ByType'
import Interested from './Interested'
import MemberDetail from './MemberDetail'
import UnpaidMembership from './UnpaidMembership'


const router = createBrowserRouter([
    {
        path : "/",
        element : <Home />
    },
    {
        path : "/register",
        element : <Register />
    },
    {
        path : "/login",
        element : <Login />
    },
    {
        path : "/dashboard",
        element : <Dashboard />,
        children : [
            {
                path : "members",
                element : <Members />
            },
            {
                path : "by-type",
                element : <ByType />
            },
            {
                path : "members/new",
                element : <CreateMember />
            },
            {
                path : "interested",
                element : <Interested />
            },
            {
                path : "members/:id",
                element : <MemberDetail />
            },
            {
                path : "unpaid",
                element : <UnpaidMembership />
            }
        ]
    },
  
])






function App() {

    let [token, setToken] = useState("")
    let [user, setUser] = useState(null)
    let [member, setMember] = useState(null)
    let [members, setMembers] = useState([])
    let [hasMembers, setHasMembers] = useState(false) //todavía no hay socios
    let [interested, setInterested] = useState([])
    let [loading, setLoading] = useState(true)
    let [msg, setMsg] = useState("")
  
    
  return <Context.Provider value={ {token,setToken,user,setUser,members,setMembers,hasMembers,setHasMembers,loading,setLoading,interested,setInterested,member,setMember,msg,setMsg} }>
            <RouterProvider router={router} />
        </Context.Provider>
}

export default App
