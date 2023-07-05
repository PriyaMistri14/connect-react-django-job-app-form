

import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'

import * as Yup from "yup"

import React, { useEffect, useState } from 'react'
import axiosIntance from '../../axiosApi'

import { useParams } from 'react-router-dom'


let dateToTmp;
let fromDate;
// var acade = []
// var expe = []
// var lang = []
// var tech = []
// var refe = []
// var pref_loc = []




const Update = () => {

    const [candidates, setCandidates] = useState({})
    const [allCourses, setAllCourses] = useState([])
    const [allLanguages, setAllLanguages] = useState([])
    const [allDepartments, setAllDepartments] = useState([])
    const [allStates, setAllStates] = useState([])
    const [allTechnologies, setAllTechnologies] = useState([])
    const [allPreferLocations, setAllPreferLocations] = useState([])

    const [acade, setAcade] = useState([])
    const [expe, setExpe] = useState([])
    const [lang, setLang] = useState([])
    const [tech, setTech] = useState([])
    const [refe, setRefe] = useState([])
    const [pref_loc, setPrefLoc] = useState([])



    const { candidate } = useParams()
    console.log("Candidate main |||||||||||||", candidate)

    useEffect(() => {
        const fetchCandidateAll = async () => {
            try {
                const candidate_fetched = await axiosIntance.get(`http://127.0.0.1:8000/job/candidate_all/${candidate}/`)
              
                console.log("Candidate alllllll in use effect:", candidate_fetched.data)
               
                
                setCandidates(candidate_fetched.data)
                console.log("after seting :::::: ", candidates);



                const course = await axiosIntance.get("http://127.0.0.1:8000/job/select_all/1/")
                console.log("Courses", course.data.options)
                const cc = course.data.options
                setAllCourses(cc)
                console.log("COURSESSSSSS:", allCourses);

                const language = await axiosIntance.get("http://127.0.0.1:8000/job/select_all/2/")
                console.log("allLanguages", language.data.options)
                setAllLanguages(language.data.options)


                const technology = await axiosIntance.get("http://127.0.0.1:8000/job/select_all/3/")
                console.log("allTechnology", technology.data.options)
                setAllTechnologies(technology.data.options)



                const prefer_location = await axiosIntance.get("http://127.0.0.1:8000/job/select_all/4/")
                console.log("allPreferLocation", prefer_location.data.options)
                setAllPreferLocations(prefer_location.data.options)



                const department = await axiosIntance.get("http://127.0.0.1:8000/job/select_all/5/")
                console.log("allDepartment", department.data.options)
                setAllDepartments(department.data.options)


                const state = await axiosIntance.get("http://127.0.0.1:8000/job/state/")
                console.log("allState", state.data)
                setAllStates(state.data)



            } catch (error) {
                console.log("Error while fetching candidate all", error)
            }

        }
    
        fetchCandidateAll()


    }, [])

    useEffect(()=>{
        candidates.academics != undefined && candidates.academics.length != 0 && candidates.academics.map((ac) => {
            console.log("Academic obj ::::;", ac)
            const aca_obj = {
                courseName: ac.course_name,
                nameOfBoardUniversity: ac.name_of_board_university,
                passingYear: ac.paasing_year,
                percentage: ac.percentage
            }

            // acade.push(aca_obj)
            setAcade([...acade, aca_obj])
            console.log("after set acd:::::", acade);
        })

   candidates.experiences != undefined && candidates.experiences.length != 0 && candidates.experiences.map((ex) => {
            const ex_obj = {
                companyName: ex.company_name,
                designation: ex.designation,
                from: ex.from_date,
                to: ex.to_date
            }

            // expe.push(ex_obj)
            setExpe([...expe, ex_obj])
        })




      candidates.languages != undefined &&  candidates.languages.length != 0 && candidates.languages.map((ln) => {
            const ln_obj = {
                languageName: ln.language,
                read: ln.read,
                write: ln.write,
                speak: ln.speak
            }

            // lang.push(ln_obj)
            setLang([...lang, ln_obj])
        })




     candidates.technologies != undefined &&  candidates.technologies.map((tn) => {
            const tn_obj = {
                technologyName: tn.technology,
                rating: tn.ranting,

            }

            // tech.push(tn_obj)
            setTech([...tech, tn_obj])
        })



      candidates.references != undefined && candidates.references.length != 0 && candidates.references.map((rf) => {
            const rf_obj = {
                name: rf.refe_name,
                contactNo: rf.refe_contact_no,
                relation: rf.refe_relation

            }

            // refe.push(rf_obj)
            setRefe([...refe, rf_obj])
        })



       candidates.preferences != undefined && candidates.preferences.length != 0 && candidates.preferences.map((pr) => {

            // pref_loc.push(pr.prefer_location)
            setPrefLoc([...pref_loc, pr.prefer_location])
        })




        console.log("Candidates updated!!///////////////////////////]]]]]]]]]]", candidates)
    },[candidates])


    console.log("Candidate All", candidates, allStates, allCourses, allTechnologies, allLanguages, allDepartments, allPreferLocations)
    console.log("???//////////////////////////////\\\\\\\\\\\\\\\\\\", candidates.academics);
    console.log("acade::", acade, "expe::", expe, "lang:;", lang, "tech ::", tech, "refe::", refe, "pref_loc", pref_loc)

   





    const getCity = async (state) => {
        console.log("called with state", state);
        var cities = []

        try {
            const citiessss = await axiosIntance.post("http://127.0.0.1:8000/job/getCities/", {
                state: state
            })
            console.log("cities in front end::", citiessss.data.fetched_cities)
            cities = citiessss.data.fetched_cities



        } catch (error) {
            console.log("Error while fetching cities in front end", error)

        }


        return cities

    }





    return (
        <div>
        
            <p>Update form</p>
        </div>
    )

}



export default Update