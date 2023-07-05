
import React from 'react'

import './show-candidate.styles.css'

import ShowData from '../show-data/show-data.component'
import axiosIntance from '../../axiosApi'

import { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'




function ShowCandidate() {
    const [candidates, setCandidates] = useState([])

    const navigate = useNavigate()

    const goToLogin = () => {
        navigate("/login/")
    }

    // const updateCandidate = async (candidate) => {
    //     alert(candidate.id)
    //     navigate(`/update-form/${candidate}`)



    // }




    const deleteCandidate = async (candidate) => {
        const candidate_id = candidate.id
        const academics = candidate.academics
        const experiences = candidate.experiences
        const languages = candidate.languages
        const technologies = candidate.technologies
        const references = candidate.references
        const preferences = candidate.preferences

        try {

            //    const res = await axiosIntance.delete(`http://127.0.0.1:8000/job/candidate/${candidate_id}/`)

            academics.map(async (academic) => {
                const academic_id = academic.id
                console.log("academic id", academic_id)
                // const res = await axiosIntance.delete(`http://127.0.0.1:8000/job/academic/${academic_id}/`)
            })


            experiences.map(async (experience) => {
                const experience_id = experience.id
                console.log("experience id", experience_id)
                // const res = await axiosIntance.delete(`http://127.0.0.1:8000/job/experience/${experience_id}/`)
            })

            languages.map(async (language) => {
                const language_id = language.id
                console.log("language id", language_id)
                // const res = await axiosIntance.delete(`http://127.0.0.1:8000/job/language/${language_id}/`)
            })


            technologies.map(async (technology) => {
                const technology_id = technology.id
                console.log("technology id", technology_id)
                // const res = await axiosIntance.delete(`http://127.0.0.1:8000/job/technology/${technology_id}/`)
            })


            references.map(async (reference) => {
                const reference_id = reference.id
                console.log("reference id", reference_id)
                // const res = await axiosIntance.delete(`http://127.0.0.1:8000/job/reference/${reference_id}/`)
            })

            preferences.map(async (preference) => {
                const preference_id = preference.id
                console.log("preference id", preference_id)
                // const res = await axiosIntance.delete(`http://127.0.0.1:8000/job/preference/${preference_id}/`)
            })
            alert("Successfully Deleted")

        } catch (error) {
            console.log("Error while deleting !!", error);
        }

    }


    useEffect(() => {
        (async () => {
            try {
                if (localStorage.getItem("access_token") && axiosIntance.defaults.headers['Authorization']) {

                    const res = await axiosIntance.get("http://127.0.0.1:8000/job/candidate_all/")
                    console.log("resopnseeee:", res)
                    setCandidates(res.data)
                }
                else {
                    goToLogin()

                }

            } catch (error) {
                console.log("Error", error)
            }
        }
        )()
    }, [])



    return (
        <div>
            {
                candidates.map((candidate) => (
                    <div><ShowData candidate={candidate} /><br /><br />
                        <a href='/show-candidate/' onClick={() => deleteCandidate(candidate)}>Delete </a>
                        <br /><br />
                        <Link to={`/update/${candidate.id}`} >Update link</Link>
                     
                        {/* <a onClick={() => updateCandidate(candidate)}>Update </a> */}
                        <br /><br />

                    </div>
                )
                )

            }

            <hr /> </div>
    )
}

export default ShowCandidate

