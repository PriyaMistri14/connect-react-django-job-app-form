
import React from 'react'

import './show-candidate.styles.css'

import axiosIntance from '../../axiosApi'

import { useState, useEffect } from 'react'

import { Link, useNavigate } from 'react-router-dom'



import { axiosDELETE, axiosGET, axiosPOST } from '../../axiosApi'




function ShowCandidate() {
    console.log("RE RENDER");
    const [candidates, setCandidates] = useState([])  // paginated data 
    const [no_of_pages, setNo_of_pages] = useState([])
    const [states, setStates] = useState([])
    const [order, setOrder] = useState('asc')
    const [sort, setSort] = useState("id")
    const [currentPage, setCurrentPage] = useState(1)
    const [search, setSearch] = useState("")
    
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

                const res = await axiosDELETE(`job/candidate/${candidate_id}/`)

                academics.map(async (academic) => {
                    const academic_id = academic.id
                    console.log("academic id", academic_id)
                    const res = await axiosDELETE(`job/academic/${academic_id}/`)
                })


                experiences.map(async (experience) => {
                    const experience_id = experience.id
                    console.log("experience id", experience_id)
                    const res = await axiosDELETE(`job/experience/${experience_id}/`)
                })

                languages.map(async (language) => {
                    const language_id = language.id
                    console.log("language id", language_id)
                    const res = await axiosDELETE(`job/language/${language_id}/`)
                })


                technologies.map(async (technology) => {
                    const technology_id = technology.id
                    console.log("technology id", technology_id)
                    const res = await axiosDELETE(`job/technology/${technology_id}/`)
                })


                references.map(async (reference) => {
                    const reference_id = reference.id
                    console.log("reference id", reference_id)
                    const res = await axiosDELETE(`job/reference/${reference_id}/`)
                })

                preferences.map(async (preference) => {
                    const preference_id = preference.id
                    console.log("preference id", preference_id)
                    const res = await axiosDELETE(`job/preference/${preference_id}/`)
                })
                alert("SUCCESSFULLY DELETED !!!!!!")

            } catch (error) {
                console.log("Error while deleting !!", error);
            }
        }

    }


    const changePage = async (e) => {
        const page_no = e.target.name
        console.log("]]]]]]]]]]]]", page_no,sort, order);
        
        try {

            const p = await axiosGET(`job/pagination/?data_per_page=${data_per_page}&sort=${sort}&order=${order}&search=${search}&page=${page_no}/`)
            console.log("PAGINATAED DATA AFTER PAGE CHANGE ::: ", p.data);
            setCandidates(p.data.slice(0,-1))
         
            setCurrentPage(page_no)

        } catch (error) {
            console.log("Error", error);
        }

    }




    const onSearchChangeHandler = async(e) => {

        const search = e.target.value
        setSearch(search)


        const p = await axiosGET(`job/pagination/?data_per_page=${data_per_page}&sort=${sort}&order=${order}&search=${search}&page=1/`)
        console.log("PAGINATAED DATA AFTER SEARCH::: ", p.data, "no of pages::", no_of_pages);
        setCandidates(p.data.slice(0,-1))     // all elements except last is actual data , and last one is no of pages thats why this slice is used
       
        
     
        const n = p.data.slice(-1)
        var arr = []

        for (var i = 0; i < n; i++) {
            console.log("iii", i);
            arr.push(i + 1)

        }
        setNo_of_pages(arr)
      



// this is for per page search not whole
        // const fCandidate = candidates.filter((candidate) => {

        //     return candidate.fname.includes(search)
        //         || candidate.lname.includes(search)
        //         || candidate.surname.includes(search)
        //         || candidate.contact_no.includes(search)
        //         || candidate.city.includes(search)
        //         || candidate.state.includes(search)
        //         || candidate.email.includes(search)
        // })
        // console.log("filtered Candidates :   ", fCandidate);
        // setFilteredCandidate(fCandidate)



    }




    const filterByState = async(e) => {
        const state = e.target.value

        setSearch(state)


        const p = await axiosGET(`job/pagination/?data_per_page=${data_per_page}&sort=${sort}&order=${order}&search=${state}&page=1/`)
        console.log("PAGINATAED DATA AFTER FILTER::: ", p.data, "no of pages::", no_of_pages);
        setCandidates(p.data.slice(0,-1))     // all elements except last is actual data , and last one is no of pages thats why this slice is used
       
        
     
        const n = p.data.slice(-1)
        var arr = []

        for (var i = 0; i < n; i++) {
            console.log("iii", i);
            arr.push(i + 1)

        }
        setNo_of_pages(arr)




        // const filtered_candidate = candidates.filter((cand) => {
        //     return cand.state.includes(state)
        // })
        // setFilteredCandidate(filtered_candidate)
    }




    const sorting = async (e) => {
        console.log("EEEE", e.target.getAttribute('value'), "order", order, "sort : ", sort, "search :  ", search);
        const field = e.target.getAttribute('value')
     
        switch (field) {
            case 'fname':
                setSort('fname')

                const p_fname = await axiosGET(`job/pagination/?data_per_page=${data_per_page}&sort=fname&order=${order}&search=${search}&page=1/`)
                console.log("PAGINATAED DATA AFTER SORT CHANGE ::: ", p_fname.data);
                setCandidates(p_fname.data.slice(0,-1))
             
                setCurrentPage(1)

                

                // this is for page wise sort, not whole
                // order == 'asc' ? 
                // arr.sort((a, b) => (a.fname.toLowerCase() > b.fname.toLowerCase()) ? 1 : -1)
                // : arr.sort((a, b) => (a.fname.toLowerCase() > b.fname.toLowerCase()) ? -1 : 1)
                // setCandidates([...arr])
                // setFilteredCandidate([...arr])               

                break

            case 'lname':


                setSort('lname')

                const p_lname = await axiosGET(`job/pagination/?data_per_page=${data_per_page}&sort=lname&order=${order}&search=${search}&page=1/`)
                console.log("PAGINATAED DATA AFTER SORT CHANGE ::: ", p_lname.data);
                setCandidates(p_lname.data.slice(0,-1))
            
                setCurrentPage(1)
                break


            case 'surname':


                setSort('surname')

                const p_surname = await axiosGET(`job/pagination/?data_per_page=${data_per_page}&sort=surname&order=${order}&search=${search}&page=1/`)
                console.log("PAGINATAED DATA AFTER SORT CHANGE ::: ", p_surname.data);
                setCandidates(p_surname.data.slice(0,-1))
            
                setCurrentPage(1)

                    
                break


            case 'contact_no':

                setSort('contact_no')

                const p_contact_no = await axiosGET(`job/pagination/?data_per_page=${data_per_page}&sort=contact_no&order=${order}&search=${search}&page=1/`)
                console.log("PAGINATAED DATA AFTER SORT CHANGE ::: ", p_contact_no.data);
                setCandidates(p_contact_no.data.slice(0,-1))
              
                setCurrentPage(1)
            
                break


            case 'email':

                setSort('email')

                const p_email = await axiosGET(`job/pagination/?data_per_page=${data_per_page}&sort=email&order=${order}&search=${search}&page=1/`)
                console.log("PAGINATAED DATA AFTER SORT CHANGE ::: ", p_email.data);
                setCandidates(p_email.data.slice(0,-1))
               
                setCurrentPage(1)
     
                break


            case 'state':

                setSort('state')

                const p_state = await axiosGET(`job/pagination/?data_per_page=${data_per_page}&sort=state&order=${order}&search=${search}&page=1/`)
                console.log("PAGINATAED DATA AFTER SORT CHANGE ::: ", p_state.data);
                setCandidates(p_state.data.slice(0,-1))
            
                setCurrentPage(1)

         
                break

            case 'city':

                setSort('city')

                const p_city = await axiosGET(`job/pagination/?data_per_page=${data_per_page}&sort=city&order=${order}&search=${search}&page=1/`)
                console.log("PAGINATAED DATA AFTER SORT CHANGE ::: ", p_city.data);
                setCandidates(p_city.data.slice(0,-1))
                
                setCurrentPage(1)

                       
                break


            default:
                console.log("No match found for sorting!!")

        }

        order == 'asc' ? setOrder("desc") : setOrder('asc')
    }



    useEffect(() => {
        console.log("use effect is called");
        (async () => {
            try {
                if (localStorage.getItem("access_token") && axiosIntance.defaults.headers['Authorization']) {

                    const state = await axiosGET("job/state/")
                    console.log("allState", state.data)
                    setStates(state.data)


                    const p = await axiosGET(`job/pagination/?data_per_page=${data_per_page}&sort=${sort}&order=${order}&page=1/`)
                    console.log("PAGINATAED DATA ::: ", p.data, "no of pages::", no_of_pages);
                    setCandidates(p.data.slice(0,-1))     // all elements except last is actual data , and last one is no of pages thats why this slice is used
                
                    
                 
                    const n = p.data.slice(-1)
                    var arr = []

                    for (var i = 0; i < n; i++) {
                        console.log("iii", i);
                        arr.push(i + 1)

                    }
                    setNo_of_pages(arr)

                    console.log("no of pages:  ", n, "setNo_of_pages:    ", setNo_of_pages);



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

            <input className='search' type='search' name='search' onChange={(e) => onSearchChangeHandler(e)} placeholder="Search Here!" />


            Filter By : <select onChange={(e) => filterByState(e)}>
                <option selected hidden>Select state</option>
                {
                    states.map(state => <option value={state.name}>{state.name}</option>)
                }
            </select><br /><br /><br /><br />

            <table border='1px' align='center'>
                <tr>
                    <td onClick={(e) => sorting(e)} value='fname' >First Name </td>
                    <td onClick={(e) => sorting(e)} value='lname'>Last Name</td>
                    <td onClick={(e) => sorting(e)} value='surname'>Surname</td>
                    <td onClick={(e) => sorting(e)} value='contact_no'>Contact No</td>
                    <td onClick={(e) => sorting(e)} value='city'>City</td>
                    <td onClick={(e) => sorting(e)} value='state'>State</td>
                    <td onClick={(e) => sorting(e)} value='email'>Email</td>
                    <td >Gender</td>
                    <td >DOB</td>
                    <td >DELETE</td>
                    <td >UPDATE</td>


                </tr>


                {
                    candidates.length != 0 ? candidates.map((candidate) => (
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
                                {/* <td>  <Link to={`/update/${candidate.id}`} >Update</Link></td> */}
                                <td>  <Link to={`/update_form/${candidate.id}`} >Update</Link></td>

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
            <div className='page-numbers'>
                {
                    no_of_pages.map(page =>currentPage == page ? <a className='page' onClick={(e) => changePage(e)} name={page} >{page}</a> :
                    <a style={{color:"red"}} className='page' onClick={(e) => changePage(e)} name={page} >{page}</a> )

                }
            </div>

            <br /> </div>
    )
}

export default ShowCandidate

