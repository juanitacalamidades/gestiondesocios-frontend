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
            }
        ]
    },
  
])






function App() {

    const [token, setToken] = useState("")
    const [user, setUser] = useState(null)
    const [member, setMember] = useState(null)
    const [members, setMembers] = useState([])
    const [interested, setInterested] = useState([])
    const [hasMembers, setHasMembers] = useState(false) //todavía no hay socios
    const [loading, setLoading] = useState(true)
  

  return <Context.Provider value={ {token,setToken,user,setUser,members,setMembers,hasMembers,setHasMembers,loading,setLoading,interested,setInterested,member,setMember} }>
            <RouterProvider router={router} />
        </Context.Provider>
}

export default App
