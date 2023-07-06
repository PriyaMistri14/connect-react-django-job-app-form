

import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'

import * as Yup from "yup"

import React, { useEffect, useState } from 'react'
import axiosIntance from '../../axiosApi'

import { useParams } from 'react-router-dom'

import { useCallback } from 'react'

import { useMemo } from 'react'


let dateToTmp;
let fromDate;
var acade = []
var expe = []
var lang = []
var tech = []
var refe = []
var pref_loc = []

var main = ""




const course = await axiosIntance.get("http://127.0.0.1:8000/job/select_all/1/")
console.log("Courses", course.data.options)
const allCourses = course.data.options
// setAllCourses(cc)
console.log("COURSESSSSSS:", allCourses);

const language = await axiosIntance.get("http://127.0.0.1:8000/job/select_all/2/")
console.log("allLanguages", language.data.options)
// setAllLanguages(language.data.options)
const allLanguages = language.data.options


const technology = await axiosIntance.get("http://127.0.0.1:8000/job/select_all/3/")
console.log("allTechnology", technology.data.options)
// setAllTechnologies(technology.data.options)
const allTechnologies = technology.data.options



const prefer_location = await axiosIntance.get("http://127.0.0.1:8000/job/select_all/4/")
console.log("allPreferLocation", prefer_location.data.options)
// setAllPreferLocations(prefer_location.data.options)
const allPreferLocations = prefer_location.data.options



const department = await axiosIntance.get("http://127.0.0.1:8000/job/select_all/5/")
console.log("allDepartment", department.data.options)
// setAllDepartments(department.data.options)

const allDepartments = department.data.options


const state = await axiosIntance.get("http://127.0.0.1:8000/job/state/")
console.log("allState", state.data)
// setAllStates(state.data)
const allStates = state.data










const Update = () => {

    const [allData, setAllData] = useState([])

    const { candidate } = useParams()
    console.log("Candidate main |||||||||||||", candidate)

    const fetchCandidate = async () => {

        try {
            const candidate_fetched = await axiosIntance.get(`http://127.0.0.1:8000/job/candidate_all/${candidate}/`)




            // setCandidates(candidate_fetched.data)
            const candidatessss = candidate_fetched.data
            const state = candidatessss.state
            const cities = await getCity(state)
            console.log("CITIESSSSSSSSSSSSSS:", cities);


            const res = fetchAllData(candidatessss, cities)
            console.log("REAPONSE:::", res);
            return res




        } catch (error) {
            console.log("Error while fetching candidate all", error)
        }

    }



    useEffect(() => {
        (async () => {
            const res = await fetchCandidate()
            console.log("REAPONSE  MAIN:::", res);
            setAllData(res)
        }

        )()

    }, [])


    console.log("All data::::::::::::::::::::::::::::::::::::::::::", allData[0]);

    const fetchAllData = (candidates, cities) => {
        console.log("called fetch all data", candidates);
        acade = []
        expe = []
        lang = []
        tech = []
        refe = []
        pref_loc = []

        candidates.academics != undefined && candidates.academics.length != 0 && candidates.academics.map((ac) => {

            const aca_obj = {
                courseName: ac.course_name,
                nameOfBoardUniversity: ac.name_of_board_university,
                passingYear: ac.passing_year,
                percentage: ac.percentage
            }

            acade.push(aca_obj)
            // setAcade([...acade, aca_obj])

        })
        candidates.experiences != undefined && candidates.experiences.length != 0 && candidates.experiences.map((ex) => {
            const ex_obj = {
                companyName: ex.company_name,
                designation: ex.designation,
                from: ex.from_date,
                to: ex.to_date
            }

            expe.push(ex_obj)
            // setExpe([...expe, ex_obj])
        })

        candidates.languages != undefined && candidates.languages.length != 0 && candidates.languages.map((ln) => {
            const ln_obj = {
                languageName: ln.language,
                read: ln.read,
                write: ln.write,
                speak: ln.speak
            }

            lang.push(ln_obj)
            // setLang([...lang, ln_obj])
        })


        candidates.technologies != undefined && candidates.technologies.length != 0 && candidates.technologies.map((tn) => {
            const tn_obj = {
                technologyName: tn.technology,
                rating: tn.ranting,

            }

            tech.push(tn_obj)
            // setTech([...tech, tn_obj])
        })

        candidates.references != undefined && candidates.references.length != 0 && candidates.references.map((rf) => {
            const rf_obj = {
                name: rf.refe_name,
                contactNo: rf.refe_contact_no,
                relation: rf.refe_relation

            }

            refe.push(rf_obj)
            // setRefe([...refe, rf_obj])
        })


        candidates.preferences != undefined && candidates.preferences.length != 0 && candidates.preferences.map((pr) => {

            pref_loc.push(pr.prefer_location)
            // setPrefLoc([...pref_loc, pr.prefer_location])
        })


        console.log("\\\\\\\\\\\\\\\\\\\\\\\\/////////////////////////////acade::", acade, "expe::", expe, "lang:;", lang, "tech ::", tech, "refe::", refe, "pref_loc", pref_loc)


        return [acade, expe, lang, tech, refe, pref_loc, candidates, cities]

    }

    console.log("Drop down All", allStates, allCourses, allTechnologies, allLanguages, allDepartments, allPreferLocations)

    console.log("acade::", allData[0], "expe::", allData[1], "lang:;", allData[2], "tech ::", allData[3], "refe::", allData[4], "pref_loc", allData[5], "candidate_all", allData[6], "CITIES", allData[7])






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







    const initialValues = {
        fname: allData[6] && allData[6].fname,
        lname: allData[6] && allData[6].lname,
        surname: allData[6] && allData[6].surname,

        email: allData[6] && allData[6].email,
        phone: allData[6] && allData[6].contact_no,
        gender: allData[6] && allData[6].gender,
        state: allData[6] && allData[6].state,
        cities: allData[7] && allData[7],
        city: allData[6] && allData[6].city,

        dob: allData[6] && allData[6].dob,

        academics: allData[0] && allData[0],

        experiences: allData[1] && allData[1],

        languages: allData[2] && allData[2],




        technologies: allData[3] && allData[3],

        references: allData[4] && allData[4],



        noticePeriod: allData[6] && allData[6].preferences[0].notice_period,
        expectedCTC: allData[6] && allData[6].preferences[0].expected_ctc,
        currentCTC: allData[6] && allData[6].preferences[0].current_ctc,
        department: allData[6] && allData[6].preferences[0].department,


        demoLocation: allData[5] && allData[5]


    }
    console.log("initial valuaes lname :", initialValues, initialValues.lname);











    return (
        <div>
            <Formik initialValues={initialValues}
                enableReinitialize



                onSubmit={async (values) => {
                    alert("Successfull!!")
                    console.log("Form data : ", values)

                }

                }

                validationSchema={Yup.object().shape({
                    fname: Yup.string().required("this field is required!!")
                        .matches(/^[aA-zZ\s]+$/, "This field should only contains alphabets!! ")
                        .max(10, "Maximum characters allowed for this field is 10!!"),

                    lname: Yup.string().required("this field is required!!")
                        .matches(/^[aA-zZ\s]+$/, "This field should only contains alphabets!! ")
                        .max(10, "Maximum characters allowed for this field is 10!!"),

                    surname: Yup.string().required("this field is required!!")
                        .matches(/^[aA-zZ\s]+$/, "This field should only contains alphabets!! ")
                        .max(10, "Maximum characters allowed for this field is 10!!"),

                    // designation: Yup.string().required("this field is required!!")
                    //     .matches(/^[aA-zZ\s]+$/, "This field should only contains alphabets!! "),


                    email: Yup.string().email("Please enter a valid email address!!")
                        .required("this field is required!!"),


                    phone: Yup.number().required("this field is required!!")
                        .integer("phone no does not containes decimals!!")
                        .positive("phone no can not be negative!!")
                        .max(10000000000, "phone no should be of 10 digit!!")
                        .min(1000000000, "phone no should be of 10 digit!!"),

                    gender: Yup.string().required("this field is required!!!"),

                    state: Yup.string().required("this field is required!!!"),

                    city: Yup.string().required("this field is required!!!"),

                    // relationshipStatus: Yup.string().required("this field is required!!!"),

                    dob: Yup.date().required("this field is required!!!")
                        .max('2005-01-01', "your age must be 18 or greater!!")
                        .test('dateToTmp', 'assign value to variable', (value) => {
                            dateToTmp = value;
                            return true;
                        }),

                    // zipcode: Yup.number().required("this field is required!!")
                    //     .integer("Please enter integer values!!")
                    //     .positive("zip code should be positive!!")
                    //     .min(100000, "zip code is of 6 digits!!")
                    //     .max(999999, "zip code is of 6 digits!!"),

                    academics: Yup.array().of(Yup.object().shape(
                        {
                            courseName: Yup.string().required("this field is required!!"),


                            nameOfBoardUniversity: Yup.string().required("this field is required!!").matches(/^[aA-zZ\s]+$/, "This field should only contains alphabets!! "),


                            passingYear: Yup.number().required("this field is required!!")
                                .max(new Date().getFullYear(), "you can not pass in future!!!")


                                .test('passingYear', 'passing year is greater then dob!!', (value, ctx) => {
                                    const pYear = value
                                    const dob = new Date(dateToTmp).getFullYear()
                                    console.log("passsing year curr", pYear, "dob", dob, "date to tmp", dateToTmp);
                                    return pYear > dob
                                }),

                            percentage: Yup.number().required("this field is required!!")
                                .min(0, "Minimum percentage is 0")
                                .max(100, "maximum percentage is 100")
                        }
                    )),



                    experiences: Yup.array().of(Yup.object().shape({

                        companyName: Yup.string().required("this field is required!!")
                            .matches(/^[aA-zZ\s]+$/, "This field should only contains alphabets!! "),

                        designation: Yup.string().required("this field is required!!")
                            .matches(/^[aA-zZ\s]+$/, "This field should only contains alphabets!! "),

                        from: Yup.date().required("this field is required!!")
                            .max(new Date(), "Not possible")
                            .test('from', 'from date must be greater then dob!!', (value) => {
                                fromDate = value
                                const dob = dateToTmp
                                console.log("from date", fromDate, "dob", dob);
                                return fromDate > dob
                            }),

                        to: Yup.date().required("this field is required!!")
                            .max(new Date(), "Not possible!!!")
                            .test('to', 'To date must be greater than from date!!', (value) => {
                                const to = value
                                const from = fromDate
                                return to > from

                            })


                    })),


                    references: Yup.array().of(Yup.object().shape({
                        name: Yup.string().required("this field is required!!")
                            .matches(/^[aA-zZ\s]+$/, "This field should only contains alphabets!! "),

                        contactNo: Yup.number().required("this field is required!!")
                            .min(1000000000, "Contact no must be of 10 digits!!")
                            .max(10000000000, "Contact no must be of 10 digits!!"),

                        relation: Yup.string().required("this field is required!!")
                            .matches(/^[aA-zZ\s]+$/, "This field should only contains alphabets!! ")

                    })),

                    noticePeriod: Yup.number().required("this field is required!!")
                        .min(1, "minimum notice period is 1 !!!")
                        .max(10, "maximum notice period is 10 !!"),

                    expectedCTC: Yup.number().required("this field is required!!"),

                    currentCTC: Yup.number().required("this field is required!!"),

                    department: Yup.string().required("this field is required!!!"),



                    demoLocation: Yup.array().test('demolocation', "this field is required  !!!", (value) => {

                        return value.length > 0
                    })


                })


                }

            >




                {(props) => {

                    const a = []

                    console.log("props of formik", props);
                    const { values, setFieldValue, setValues } = props
                    //    setValues({

                    //     fname: allData[6] && allData[6].fname,
                    //     lname: allData[6] && allData[6].lname,
                    //     surname: allData[6] && allData[6].surname,

                    //     email: allData[6] && allData[6].email,
                    //     phone: allData[6] && allData[6].contact_no,
                    //     gender: allData[6] && allData[6].gender,
                    //     state: allData[6] && allData[6].state,
                    //     cities: [],
                    //     city: allData[6] && allData[6].city,

                    //     dob: allData[6] && allData[6].dob,

                    //     academics: allData[0] && allData[0],

                    //     experiences: allData[1] && allData[1],

                    //     languages: allData[2] && allCourses[2],

                    //     technologies: allData[3] && allData[3],

                    //     references: allData[4] && allData[4],



                    //     noticePeriod: allData[6] && allData[6].preferences[0].notice_period,
                    //     expectedCTC: allData[6] && allData[6].preferences[0].expected_ctc,
                    //     currentCTC: allData[6] && allData[6].preferences[0].current_ctc,
                    //     department: allData[6] && allData[6].preferences[0].department,


                    //     demoLocation: allData[5] && allData[5]




                    //    })
                    return (<Form ><br /><br />

                        First Name:   <Field type="text" name="fname" id="fname" /><br /><br />
                        <ErrorMessage name="fname" /><br /><br />

                        Last Name:   <Field type="text" name="lname" id="lname" /><br /><br />
                        <ErrorMessage name="lname" className='error' /><br /><br />

                        Surname:   <Field type="text" name="surname" id="surname" /><br /><br />
                        <ErrorMessage name="surname" /><br /><br />

                        {/* Desination :   <Field type="text" name="designation" id="designation" /><br /><br />
                        <ErrorMessage name="designation" /><br /><br /> */}

                        Email :   <Field type="text" name="email" id="email" /><br /><br />
                        <ErrorMessage name="email" /><br /><br />

                        Phone:   <Field type="text" name="phone" id="phone" /><br /><br />
                        <ErrorMessage name="phone" /><br /><br />

                        Gender : <Field type="radio" name="gender" value="Male" /> Male
                        <Field type="radio" name="gender" value="Female" />  Female
                        <Field type="radio" name="gender" value="Other" /> Other
                        <br /><br />
                        <ErrorMessage name="gender" /><br /><br />

                        State : <Field as="select" name="state" onClick={async (e) => {
                            console.log("called");
                            const state = e.target.value
                            const cities = await getCity(state)
                            console.log("state value", state, "city value", cities);
                            setFieldValue("cities", cities)

                        }}>
                            <option selected hidden >Select State</option>

                            {
                                allStates.map((state) => <option value={state.name} >{state.name}</option>)

                            }

                        </Field><br /><br />
                        <ErrorMessage name="state" /><br /><br />



                        City : <Field as="select" name="city">
                            <option selected hidden>Select city</option>
                            {
                                values.cities && values.cities.length != 0 ? values.cities.map((city) => <option value={city.name}>{city.name}</option>) : null
                            }


                        </Field><br /><br />
                        <ErrorMessage name="city" /><br /><br />


                        {/* 
                        Relationship Status : <Field as="select" name="relationshipStatus" id="relationshipStatus" >
                            <option selected hidden> Select Realtionship Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="wido">Wido</option>

                        </Field><br /><br />
                        <ErrorMessage name="relationshipStatus" /><br /><br /> */}


                        Date of Birth : <Field type="date" name="dob" /><br /><br />
                        <ErrorMessage name="dob" /><br /><br />

                        {/* 
                        Zip Code : <Field type="text" name="zipcode" id="zipcode" /><br /><br />
                        <ErrorMessage name="zipcode" /><br /><br />
                        <hr /><br /><br /> */}



                        <FieldArray name='academics' >
                            {
                                ({ insert, push, remove }) => (
                                    <div>

                                        {
                                            values.academics && values.academics.length > 0 && values.academics.map((academic, index) => (

                                                <div>

                                                    Course Name : <Field as="select" name={`academics.${index}.courseName`}>
                                                        <option selected hidden>Select course</option>
                                                        {
                                                            allCourses.map((course) => <option value={course.option_key}>{course.option_key}</option>)
                                                        }


                                                    </Field><br /><br />
                                                    <ErrorMessage name={`academics.${index}.courseName`} /><br /><br />


                                                    Name of board or university : <Field type="text" name={`academics.${index}.nameOfBoardUniversity`} id={`academics.${index}.nameOfBoardUniversity`} /><br /><br />

                                                    <ErrorMessage name={`academics.${index}.nameOfBoardUniversity`} /><br /><br />




                                                    Passing Year : <Field type="text" name={`academics.${index}.passingYear`} id={`academics.${index}.passingYear`} /><br /><br />
                                                    <ErrorMessage name={`academics.${index}.passingYear`} /><br /><br />


                                                    Percentage : <Field type="text" name={`academics.${index}.percentage`} id={`academics.${index}.percentage`} /><br /><br />
                                                    <ErrorMessage name={`academics.${index}.percentage`} /><br /><br />

                                                    {
                                                        index == 0 ? null : <div><button type='button' onClick={() => remove(index)} >-</button><br /><br /></div>
                                                    }



                                                </div>

                                            ))
                                        }
                                        <button type='button' onClick={() => push({ nameOfBoardUniversity: '', passingYear: '', percentage: '' })}>+</button>

                                        <br /><br />

                                    </div>
                                )
                            }
                        </FieldArray> <hr /><br /><br />



                        <FieldArray name='experiences' >
                            {
                                ({ insert, push, remove }) => (
                                    <div>
                                        {
                                            values.experiences && values.experiences.length > 0 && values.experiences.map((experience, index) => (
                                                <div>
                                                    Company Name : <Field type='text' name={`experiences.${index}.companyName`} id={`experiences.${index}.companyName`} /><br /><br />
                                                    <ErrorMessage name={`experiences.${index}.companyName`} /><br /><br />

                                                    Designation : <Field type='text' name={`experiences.${index}.designation`} id={`experiences.${index}.designation`} /><br /><br />
                                                    <ErrorMessage name={`experiences.${index}.designation`} /><br /><br />

                                                    From : <Field type='date' name={`experiences.${index}.from`} id={`experiences.${index}.from`} /><br /><br />
                                                    <ErrorMessage name={`experiences.${index}.from`} /><br /><br />

                                                    To : <Field type='date' name={`experiences.${index}.to`} id={`experiences.${index}.to`} /><br /><br />
                                                    <ErrorMessage name={`experiences.${index}.to`} /><br /><br />
                                                    {
                                                        index == 0 ? null : <div><button type='button' onClick={() => remove(index)}>-</button><br /><br /></div>
                                                    }
                                                </div>
                                            ))


                                        }

                                        <button type='button' onClick={() => push({ companyName: "", designation: "", from: "", to: "" })}>+</button><br /><br />

                                    </div>
                                )


                            }



                        </FieldArray><hr /><br /><br />
                        <FieldArray name='languages' >
                            {
                                () => (
                                    <div>{

                                        allLanguages.map((language, index) => {
                                            // {

                                            //     values.languages && values.languages.length != 0 && values.languages.map((lang) => {
                                            //         lang === language && <div><Field name={`languages.${index}.languageName`} type='checkbox' value={language.option_key} selected />{language.option_key}</div>
                                            //     })

                                            // }


                                            return <div>


                                                {



                                                }
                                                {/* value={language.option_key}  value={technology.option_key}     && values.languages.length != 0 && values.languages.map((lang) => {
                                                        lang === language && <div><Field name={`languages.${index}.languageName`} type='checkbox' value={language.option_key} selected />{language.option_key}</div>
                                                    })*/}

                                                <Field name={`languages.${index}.languageName`} type='checkbox' value={language.option_key} />{language.option_key}
                                                <Field name={`languages.${index}.read`} id={`languages.${index}.read`} type='checkbox' />Read
                                                <Field name={`languages.${index}.write`} id={`languages.${index}.write`} type='checkbox' />Write
                                                <Field name={`languages.${index}.speak`} id={`languages.${index}.speak`} type='checkbox' />Speak

                                                <br /><br /></div>
                                        })

                                    }

                                    </div>
                                )


                            }

                        </FieldArray><hr /><br /><br />

                        <FieldArray name='technologies'>
                            {
                                () => (
                                    <div>
                                        {
                                            allTechnologies.map((technology, index) => (

                                                <div>
                                                    {

                                                        values.technologies && values.technologies.length != 0 && values.technologies.map((tech) => {
                                                            {
                                                                console.log("tech", tech, "technology", technology.option_key);

                                                                if (tech.technologyName === technology.option_key) {
                                                                  
                                                                    return <div><Field name={`technologies.${index}.technologyName`} value={technology.option_key} type='checkbox' checked />{technology.option_key} </div>

                                                                }
                                                                else {
                                                                    a.push(tech.technologyName)
                                                                  


                                                                }
                                                                console.log("aaaa", a);
                                                                 a.map((aa) => 
                                                                       
                                                                        aa === technology.option_key ?   <div> <Field name={`technologies.${index}.technologyName`} value={technology.option_key} type='checkbox' />{technology.option_key} </div>
                                                                         : <p>false</p>
                                                                        // <div> <Field name={`technologies.${index}.technologyName`} value={technology.option_key} type='checkbox' />{technology.option_key} </div>
                                                                    )







                                                            }




                                                            <div>
                                                                {/* {

                                                                    tech.technologyName === technology.option_key ?
                                                                        <div><Field name={`technologies.${index}.technologyName`} value={technology.option_key} type='checkbox' checked />

                                                                            {technology.option_key} </div> : null
                                                                } */}

                                                                {

                                                                    tech.technologyName === technology.option_key && tech.rating === 3 ?

                                                                        <div><Field name={`technologies.${index}.rating`}>
                                                                            {
                                                                                ({ Field, meta, form }) => (
                                                                                    <div>


                                                                                        <input type='radio' name={`technologyRadio${index}`} value='3' {...Field} onClick={() => setFieldValue(`technologies.${index}.rating`, 3)} checked />Begginer
                                                                                        <input type='radio' name={`technologyRadio${index}`} value='6' {...Field} onClick={() => setFieldValue(`technologies.${index}.rating`, 6)} />Mediator
                                                                                        <input type='radio' name={`technologyRadio${index}`} value='10' {...Field} onClick={() => setFieldValue(`technologies.${index}.rating`, 10)} />Expert

                                                                                    </div>

                                                                                )
                                                                            }

                                                                        </Field></div>
                                                                        : null




                                                                }


                                                                {
                                                                    tech.technologyName === technology.option_key && tech.rating === 6 ?

                                                                        <div><Field name={`technologies.${index}.rating`}>
                                                                            {
                                                                                ({ Field, meta, form }) => (
                                                                                    <div>


                                                                                        <input type='radio' name={`technologyRadio${index}`} value='3' {...Field} onClick={() => setFieldValue(`technologies.${index}.rating`, 3)} />Begginer
                                                                                        <input type='radio' name={`technologyRadio${index}`} value='6' {...Field} onClick={() => setFieldValue(`technologies.${index}.rating`, 6)} checked />Mediator
                                                                                        <input type='radio' name={`technologyRadio${index}`} value='10' {...Field} onClick={() => setFieldValue(`technologies.${index}.rating`, 10)} />Expert

                                                                                    </div>

                                                                                )
                                                                            }

                                                                        </Field></div>
                                                                        : null
                                                                }



                                                                {
                                                                    tech.technologyName === technology.option_key && tech.rating === 10 ?

                                                                        <div><Field name={`technologies.${index}.rating`}>
                                                                            {
                                                                                ({ Field, meta, form }) => (
                                                                                    <div>


                                                                                        <input type='radio' name={`technologyRadio${index}`} value='3' {...Field} onClick={() => setFieldValue(`technologies.${index}.rating`, 3)} />Begginer
                                                                                        <input type='radio' name={`technologyRadio${index}`} value='6' {...Field} onClick={() => setFieldValue(`technologies.${index}.rating`, 6)} />Mediator
                                                                                        <input type='radio' name={`technologyRadio${index}`} value='10' {...Field} onClick={() => setFieldValue(`technologies.${index}.rating`, 10)} checked />Expert

                                                                                    </div>

                                                                                )
                                                                            }

                                                                        </Field></div>
                                                                        : null

                                                                }


                                                            </div>


                                                        }
                                                        )






                                                    }

                                                    {/* <Field name={`technologies.${index}.technologyName`} value={technology.option_key} type='checkbox' />{technology.option_key} */}


                                                    {/* <Field name={`technologies.${index}.technologyName`} value={technology.option_key} type='checkbox' />{technology.option_key} */}


                                                    {/* <Field name={`technologies.${index}.rating`}>
                                                        {
                                                            ({ Field, meta, form }) => (
                                                                <div>


                                                                    <input type='radio' name={`technologyRadio${index}`} value='3' {...Field} onClick={() => setFieldValue(`technologies.${index}.rating`, 3)} />Begginer
                                                                    <input type='radio' name={`technologyRadio${index}`} value='6' {...Field} onClick={() => setFieldValue(`technologies.${index}.rating`, 6)} />Mediator
                                                                    <input type='radio' name={`technologyRadio${index}`} value='10' {...Field} onClick={() => setFieldValue(`technologies.${index}.rating`, 10)} />Expert

                                                                </div>

                                                            )
                                                        }

                                                    </Field> */}
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }

                        </FieldArray><hr /><br /><br />
                        <FieldArray name='references'>
                            {
                                () => (
                                    <div>
                                        {
                                            values.references && values.references.map((reference, index) => (
                                                <div>

                                                    Name : <Field name={`references.${index}.name`} type='text' /><br /><br />
                                                    <ErrorMessage name={`references.${index}.name`} /><br /><br />

                                                    Contact No : <Field name={`references.${index}.contactNo`} type='text' /><br /><br />
                                                    <ErrorMessage name={`references.${index}.contactNo`} /><br /><br />


                                                    Relation : <Field name={`references.${index}.relation`} type='text' /><br /><br />
                                                    <ErrorMessage name={`references.${index}.relation`} /><br /><br />

                                                </div>
                                            ))
                                        }
                                    </div>
                                )


                            }



                        </FieldArray><hr /><br /><br />

                        Notice Period :  <Field name='noticePeriod' type='text' /><br /><br />
                        <ErrorMessage name='noticePeriod' /><br /><br />

                        Expected CTC :  <Field name='expectedCTC' type='text' /><br /><br />
                        <ErrorMessage name='expectedCTC' /><br /><br />


                        Current CTC : <Field name='currentCTC' type='text' /><br /><br />
                        <ErrorMessage name='currentCTC' /><br /><br />


                        Departmnet : <Field name='department' as='select'  >
                            <option selected hidden>Select department</option>
                            {
                                allDepartments.map((department) => <option value={department.option_key}>{department.option_key}</option>)
                            }

                        </Field><br /><br />
                        <ErrorMessage name='department' />



                        Prefer Location : <Field as='select' name='demoLocation' multiple >
                            {/* <option selected hidden >Select location</option> */}

                            {
                                allPreferLocations.map((preferLocation) => (

                                    <option value={preferLocation.option_key}>{preferLocation.option_key}</option>

                                ))

                            }




                        </Field><br /><br />
                        <ErrorMessage name='demoLocation' /><br /><br />

                        <button type='submit'>Submit</button>

                    </Form>)
                }}
            </Formik>

        </div>
    )
}





export default Update