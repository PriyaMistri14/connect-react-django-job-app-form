
import React from 'react'

import './show-candidate.styles.css'

import ShowData from '../show-data/show-data.component'
import axiosIntance from '../../axiosApi'

import { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

function ShowCandidate() {
    const [candidates, setCandidates] = useState([])

    const navigate = useNavigate()

    const goToLogin = ()=>{
        navigate("/login/")
    }

    useEffect(() => {
        (async () => {
            try{
                if(localStorage.getItem("access_token")){

                    const res = await axiosIntance.get("http://127.0.0.1:8000/job/candidate_all/")
                    console.log("resopnseeee:", res)
                    setCandidates(res.data)
                }
                else{
                    goToLogin()

                }

            }catch(error)
            {
                console.log("Error", error)
            }
        }
        )()
    }, [])



    return (
        <div>
            {
                candidates.map((candidate) => <ShowData candidate={candidate} />)
            }

            <hr /> </div>
    )
}

export default ShowCandidate

