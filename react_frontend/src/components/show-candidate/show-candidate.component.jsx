
import React from 'react'

import './show-candidate.styles.css'

import ShowData from '../show-data/show-data.component'
import axiosIntance from '../../axiosApi'

import { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'




function ShowCandidate() {
    const [candidates, setCandidates] = useState([])  // paginated data
    const [allCandidates, setAllCandidates] = useState([])
    const [filteredCandidate, setFilteredCandidate] = useState([])
    const [no_of_pages, setNo_of_pages] = useState([])
    const [states, setStates] = useState([])


    const data_per_page = 5


    const navigate = useNavigate()

    const goToLogin = () => {
        navigate("/login/")
    }



    const deleteCandidate = async (candidate) => {
        if (window.confirm("Are you sure to delete this record ??")) {
            const candidate_id = candidate.id
            const academics = candidate.academics
            const experiences = candidate.experiences
            const languages = candidate.languages
            const technologies = candidate.technologies
            const references = candidate.references
            const preferences = candidate.preferences

            try {

                const res = await axiosIntance.delete(`http://127.0.0.1:8000/job/candidate/${candidate_id}/`)

                academics.map(async (academic) => {
                    const academic_id = academic.id
                    console.log("academic id", academic_id)
                    const res = await axiosIntance.delete(`http://127.0.0.1:8000/job/academic/${academic_id}/`)
                })


                experiences.map(async (experience) => {
                    const experience_id = experience.id
                    console.log("experience id", experience_id)
                    const res = await axiosIntance.delete(`http://127.0.0.1:8000/job/experience/${experience_id}/`)
                })

                languages.map(async (language) => {
                    const language_id = language.id
                    console.log("language id", language_id)
                    const res = await axiosIntance.delete(`http://127.0.0.1:8000/job/language/${language_id}/`)
                })


                technologies.map(async (technology) => {
                    const technology_id = technology.id
                    console.log("technology id", technology_id)
                    const res = await axiosIntance.delete(`http://127.0.0.1:8000/job/technology/${technology_id}/`)
                })


                references.map(async (reference) => {
                    const reference_id = reference.id
                    console.log("reference id", reference_id)
                    const res = await axiosIntance.delete(`http://127.0.0.1:8000/job/reference/${reference_id}/`)
                })

                preferences.map(async (preference) => {
                    const preference_id = preference.id
                    console.log("preference id", preference_id)
                    const res = await axiosIntance.delete(`http://127.0.0.1:8000/job/preference/${preference_id}/`)
                })
                alert("SUCCESSFULLY DELETED !!!!!!")

            } catch (error) {
                console.log("Error while deleting !!", error);
            }
        }

    }


    const changePage = async (e) => {
        const page_no = e.target.name
        console.log("]]]]]]]]]]]]", page_no);
        try {

            const p = await axiosIntance.get(`http://127.0.0.1:8000/job/pagination/?data_per_page=${data_per_page}&page=${page_no}/`)
            console.log("PAGINATAED DATA AFTER PAGE CHANGE ::: ", p.data);
            setCandidates(p.data)
            setFilteredCandidate(p.data)

        } catch (error) {
            console.log("Error", error);
        }

    }




    const onSearchChangeHandler = (e) => {
        console.log("EEEEEE", e.target.value);
        const search = e.target.value
        const fCandidate = candidates.filter((candidate) => {

            return candidate.fname.includes(search)
                || candidate.lname.includes(search)
                || candidate.surname.includes(search)
                || candidate.contact_no.includes(search)
                || candidate.city.includes(search)
                || candidate.state.includes(search)
                || candidate.email.includes(search)
        })
        console.log("filtered Candidates :   ", fCandidate);
        setFilteredCandidate(fCandidate)



    }




    const filterByState = (e) => {
        const state = e.target.value

        const filtered_candidate = candidates.filter((cand) => {
            return cand.state.includes(state)
        })
        setFilteredCandidate(filtered_candidate)
    }
    



const sorting =(e)=>{
console.log("EEEE", e.target.getAttribute('value'));
const field = e.target.getAttribute('value')
const aa = candidates
switch(field){
    case 'fname':
        aa.sort((a, b) => (a.fname > b.fname) ? 1: -1);
        console.log("sorted!!!!!!!", aa);
          setCandidates(aa)

}
}


console.log("sorted!!!!!!! outside", candidates);

    useEffect(() => {
        (async () => {
            try {
                if (localStorage.getItem("access_token") && axiosIntance.defaults.headers['Authorization']) {

                    const state = await axiosIntance.get("http://127.0.0.1:8000/job/state/")
                    console.log("allState", state.data)
                    setStates(state.data)


                    const res = await axiosIntance.get("http://127.0.0.1:8000/job/candidate_all/")
                    console.log("resopnseeee:", res.data.length)

                    const total_data = res.data.length
                    const n = Math.ceil(total_data / data_per_page)
                    var arr = []

                    for (var i = 0; i < n; i++) {
                        console.log("iii", i);
                        arr.push(i + 1)


                    }
                    setNo_of_pages(arr)




                    setAllCandidates(res.data)
                    // setFilteredCandidate(res.data)
                    const p = await axiosIntance.get(`http://127.0.0.1:8000/job/pagination/?data_per_page=${data_per_page}&page=1/`)
                    console.log("PAGINATAED DATA ::: ", p.data, "no of pages::", no_of_pages);
                    setCandidates(p.data)
                    setFilteredCandidate(p.data)
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

    console.log("no of pages:::::", no_of_pages);

    return (
        <div><br /><br />
            <input type='search' name='search' onChange={(e) => onSearchChangeHandler(e)} placeholder="Search Here!" />


            <select onChange={(e) => filterByState(e)}>
                <option selected hidden>Select state</option>
                {
                    states.map(state => <option value={state.name}>{state.name}</option>)
                }
            </select><br /><br />

            <table border='1px'>
                            <tr>
                                <td onClick={(e)=>sorting(e)} value='fname' >First Name </td>
                                <td onClick={(e)=>sorting(e)} value='lname'>Last Name</td>
                                <td onClick={(e)=>sorting(e)} value='surname'>Surname</td>
                                <td onClick={(e)=>sorting(e)} value='contact_no'>Contact No</td>
                                <td onClick={(e)=>sorting(e)} value='city'>City</td>
                                <td onClick={(e)=>sorting(e)} value='state'>State</td>
                                <td onClick={(e)=>sorting(e)} value='email'>Email</td>
                                <td >Gender</td>
                                <td >DOB</td>
                                <td >DELETE</td>
                                <td >UPDATE</td>


                            </tr>


            {
                filteredCandidate.length != 0 ? filteredCandidate.map((candidate) => (
                    // <div key={candidate.id}>
                        <>                      
                            <tr>
                                <td> {candidate.fname}</td>
                                <td> {candidate.lname}</td>
                                <td>{candidate.surname}</td>
                                <td>{candidate.contact_no}</td>
                                <td>{candidate.city}</td>
                                <td>{candidate.state}</td>
                                <td>{candidate.email}</td>
                                <td>{candidate.gender}</td>
                                <td>{candidate.dob}</td>
                                <td>  <a href='/show-candidate/' onClick={() => deleteCandidate(candidate)}>Delete </a></td>
                                <td>  <Link to={`/update/${candidate.id}`} >Update</Link></td>

                            </tr></>




                           // {/* <ShowData candidate={candidate} /> */}
                      
                     //   {/* <br /><br /> */}
                      //  {/* <a href='/show-candidate/' onClick={() => deleteCandidate(candidate)}>Delete </a>
                     //   <br /><br />
                     //   <Link to={`/update/${candidate.id}`} >Update</Link>
                      //  <br /><br /> */}

                    // </div>
                )
                ) : <h3>NO DATA FOUND!!!</h3>

            }
              </table><br /><br />
            {
                no_of_pages.map(page => <a onClick={(e) => changePage(e)} name={page} >{page}</a>)

            }

            <br /> </div>
    )
}

export default ShowCandidate

