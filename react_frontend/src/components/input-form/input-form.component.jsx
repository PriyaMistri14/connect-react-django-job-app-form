
import './input-form.styles.css'

import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'

import * as Yup from "yup"

import React from 'react'


const getCity = (state) => {
    console.log("called with state", state);
    var cities = []
    switch (state) {
        case "gujrat":
            cities = ['ahmedabad', 'surat',
                "rajkot"]
            break


        case "punjab":
            cities = ["amritsar", "abc"]
            break
        default:
            cities = []
    }

    return cities

}








let dateToTmp;
let fromDate;
const allLanguages = ['Hindi', 'Gujrati', 'English']
const allTechnologies = ['PHP', 'Mysql', 'Laravel', 'Oracle']
const allDepartments = ['Development', 'Design', 'Testing', 'HR']
const allPreferLocations = ['Ahmedabad', 'Surat', 'Rajkot']







const InputForm = () => {
    return (
        <div>
            <Formik initialValues={{
                fname: "abc",
                lname: "",
                surname: "",
                designation: "",
                email: "",
                phone: "",
                gender: "",
                state: "",
                cities: [],
                city: "",
                relationshipStatus: "",
                dob: "",
                zipcode: "",

                academics: [
                    {
                        nameOfBoardUniversity: "",
                        passingYear: "",
                        percentage: "",
                    }
                ],

                experiences: [
                    {
                        companyName: "",
                        designation: "",
                        from: "",
                        to: ""
                    }
                ],

                languages: [
                    {
                        languageName: "",
                        read: "",
                        write: "",
                        speak: ""
                    }

                ],

                technologies: [
                    {
                        technologyName: "",
                        rating: ""
                    }
                ],

                references: [
                    {
                        name: "",
                        contactNo: "",
                        ralation: ""
                    },
                    {
                        name: "",
                        contactNo: "",
                        ralation: ""
                    }
                ],


                noticePeriod: "",
                expectedCTC: "",
                currentCTC: "",
                department: "",

                preferLocation: [
                    {
                        location: []
                    }
                ],

                demoLocation:[]



            }}

                // onSubmit={values => console.log(values)}
                onSubmit={(values) => alert(values.demoLocation)
                }

                validationSchema={Yup.object().shape({
                    fname: Yup.string().required("this field is required!!")
                        .max(10, "Maximum characters allowed for this field is 10!!"),

                    lname: Yup.string().required("this field is required!!")
                        .max(10, "Maximum characters allowed for this field is 10!!"),

                    surname: Yup.string().required("this field is required!!")
                        .max(10, "Maximum characters allowed for this field is 10!!"),

                    designation: Yup.string().required("this field is required!!"),


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

                    relationshipStatus: Yup.string().required("this field is required!!!"),

                    dob: Yup.date().required("this field is required!!!")
                        .max('2005-01-01', "your age must be 18 or greater!!")
                        .test('dateToTmp', 'assign value to variable', (value) => {
                            dateToTmp = value;
                            return true;
                        }),

                    zipcode: Yup.number().required("this field is required!!")
                        .integer("Please enter integer values!!")
                        .positive("zip code should be positive!!")
                        .min(100000, "zip code is of 6 digits!!")
                        .max(999999, "zip code is of 6 digits!!"),

                    academics: Yup.array().of(Yup.object().shape(
                        {
                            nameOfBoardUniversity: Yup.string().required("this field is required!!"),


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

                        companyName: Yup.string().required("this field is required!!"),

                        designation: Yup.string().required("this field is required!!"),

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
                        name: Yup.string().required("this field is required!!"),

                        contactNo: Yup.number().required("this field is required!!")
                            .min(1000000000, "Contact no must be of 10 digits!!")
                            .max(10000000000, "Contact no must be of 10 digits!!"),

                        ralation: Yup.string().required("this field is required!!")

                    })),

                    noticePeriod: Yup.number().required("this field is required!!")
                        .min(1, "minimum notice period is 1 !!!")
                        .max(10, "maximum notice period is 10 !!"),

                    expectedCTC: Yup.number().required("this field is required!!"),

                    currentCTC: Yup.number().required("this field is required!!"),

                    department: Yup.string().required("this field is required!!!"),

                    preferLocation: Yup.array().of(Yup.object().shape({
                        location: Yup.array().test('demolocation',"this field is required  !!!",(value)=>{
                    
                            return value.length > 0
                         } )
                    })),

                    demoLocation:Yup.array().test('demolocation',"this field is required  !!!",(value)=>{
                    
                        return value.length > 0
                     } )

                    



                    // languages: Yup.array().of(Yup.object().shape({

                    //     languageName: Yup.string(),
                    //     read: Yup.string(),
                    //     write: Yup.string(),
                    //     speak: Yup.string(),


                    // }))






                })


                }

            >




                {(props) => {
                    const { values, setFieldValue } = props

                    return (<Form ><br /><br />

                        First Name:   <Field type="text" name="fname" id="fname" /><br /><br />
                        <ErrorMessage name="fname" /><br /><br />

                        Last Name:   <Field type="text" name="lname" id="lname" /><br /><br />
                        <ErrorMessage name="lname" className='error' /><br /><br />

                        Surname:   <Field type="text" name="surname" id="surname" /><br /><br />
                        <ErrorMessage name="surname" /><br /><br />

                        Desination :   <Field type="text" name="designation" id="designation" /><br /><br />
                        <ErrorMessage name="designation" /><br /><br />

                        Email :   <Field type="text" name="email" id="email" /><br /><br />
                        <ErrorMessage name="email" /><br /><br />

                        Phone:   <Field type="text" name="phone" id="phone" /><br /><br />
                        <ErrorMessage name="phone" /><br /><br />

                        Gender : <Field type="radio" name="gender" value="male" /> Male
                        <Field type="radio" name="gender" value="female" />  Female
                        <Field type="radio" name="gender" value="other" /> Other
                        <br /><br />
                        <ErrorMessage name="gender" /><br /><br />

                        State : <Field as="select" name="state" onClick={(e) => {
                            console.log("called");
                            const state = e.target.value
                            const cities = getCity(state)
                            console.log("state value", state, "city value", cities);
                            setFieldValue("cities", cities)

                        }}>
                            <option selected hidden >Select State</option>
                            <option value="gujrat">Gujrat</option>
                            <option value="punjab">Punjab</option>
                        </Field><br /><br />
                        <ErrorMessage name="state" /><br /><br />



                        City : <Field as="select" name="city">
                            <option selected hidden>Select city</option>
                            {
                                values.cities.length != 0 ? values.cities.map((city) => <option value={city}>{city}</option>) : null
                            }


                        </Field><br /><br />
                        <ErrorMessage name="city" /><br /><br />



                        Relationship Status : <Field as="select" name="relationshipStatus" id="relationshipStatus" >
                            <option selected hidden> Select Realtionship Status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="wido">Wido</option>

                        </Field><br /><br />
                        <ErrorMessage name="relationshipStatus" /><br /><br />


                        Date of Birth : <Field type="date" name="dob" /><br /><br />
                        <ErrorMessage name="dob" /><br /><br />


                        Zip Code : <Field type="text" name="zipcode" id="zipcode" /><br /><br />
                        <ErrorMessage name="zipcode" /><br /><br />
                        <hr /><br /><br />



                        <FieldArray name='academics' >
                            {
                                ({ insert, push, remove }) => (
                                    <div>

                                        {
                                            values.academics.length > 0 && values.academics.map((academic, index) => (

                                                <div>


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
                                            values.experiences.length > 0 && values.experiences.map((experience, index) => (
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

                                        allLanguages.map((language, index) => (
                                            <div>
                                                <Field name={`languages.${index}.languageName`} type='checkbox' value={language} />{language}
                                                <Field name={`languages.${index}.read`} type='checkbox' />Read
                                                <Field name={`languages.${index}.write`} type='checkbox' />Write
                                                <Field name={`languages.${index}.speak`} type='checkbox' />Speak

                                                <br /><br /></div>
                                        ))

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

                                                    <Field name={`technologies.${index}.technologyName`} value={technology} type='checkbox' />{technology}


                                                    <Field name={`technologies.${index}.rating`}>
                                                        {
                                                            ({ Field, meta, form }) => (
                                                                <div>

                                                                    <input type='radio' name={`technologyRadio${index}`} value='3' {...Field} onClick={() => setFieldValue(`technologies.${index}.rating`, 3)} />Begginer
                                                                    <input type='radio' name={`technologyRadio${index}`} value='6' {...Field} onClick={() => setFieldValue(`technologies.${index}.rating`, 6)} />Mediator
                                                                    <input type='radio' name={`technologyRadio${index}`} value='10' {...Field} onClick={() => setFieldValue(`technologies.${index}.rating`, 10)} />Expert

                                                                </div>

                                                            )
                                                        }

                                                    </Field>
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
                                            values.references.map((reference, index) => (
                                                <div>

                                                    Name : <Field name={`references.${index}.name`} type='text' /><br /><br />
                                                    <ErrorMessage name={`references.${index}.name`} /><br /><br />

                                                    Contact No : <Field name={`references.${index}.contactNo`} type='text' /><br /><br />
                                                    <ErrorMessage name={`references.${index}.contactNo`} /><br /><br />


                                                    Relation : <Field name={`references.${index}.ralation`} type='text' /><br /><br />
                                                    <ErrorMessage name={`references.${index}.ralation`} /><br /><br />

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
                                allDepartments.map((department) => <option value={department}>{department}</option>)
                            }

                        </Field><br /><br />
                        <ErrorMessage name='department' /><br /><br />



                        <FieldArray name="preferLocation" >
                            {
                                () => (
                                    <div><Field as='select' name='preferLocation[0].location' multiple >
                                        {/* <option selected hidden >Select location</option> */}

                                        {
                                            allPreferLocations.map((preferLocation) => (

                                                <option value={preferLocation}>{preferLocation}</option>




                                            ))



                                        }




                                    </Field><br /><br />
                                    <ErrorMessage name='preferLocation[0].location' />
                                    </div>

                                )


                            }



                        </FieldArray><br /><br />
                        <Field as='select' name='demoLocation' multiple >
                                        {/* <option selected hidden >Select location</option> */}

                                        {
                                            allPreferLocations.map((preferLocation) => (

                                                <option value={preferLocation}>{preferLocation}</option>




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

export default InputForm

