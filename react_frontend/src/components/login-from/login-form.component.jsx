
import './login-form.styles.css'

import React from 'react'

import { Formik, Field, Form, ErrorMessage } from 'formik'

import * as Yup from 'yup'
import axiosIntance from '../../axiosApi'

import axios from 'axios'

import { useState } from 'react'

import { useNavigate } from 'react-router-dom'



function LoginForm() {

    const navigate = useNavigate()




    const initialValues = {
        username: "",
        password: ""
    }


    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Required!!"),
        password: Yup.string().required('Required!!')
    })


    const onSubmit = async (values) => {
        console.log('form values::', values)
        const res = await axiosIntance.post('http://127.0.0.1:8000/login/', {
            username: values.username,
            password: values.password
        })
        console.log(' response tokens:', res)

        axiosIntance.defaults.headers['Authorization'] = 'JWT ' + res.data.access
        localStorage.setItem("access_token", res.data.access)
        localStorage.setItem("refresh_token", res.data.refresh)
        console.log('local storage values:  access token', localStorage.getItem("access_token"), "refresh token : ", localStorage.getItem("refresh_token"))
         navigate("/input-form/")
        // console.log('comparision: ', res.data.access == localStorage.getItem("access_token"))
        // const candidates = await axiosIntance.get("http://127.0.0.1:8000/job/candidate/")/
        // const candidate_all = await axiosIntance.get("http://127.0.0.1:8000/job/candidate_all/")
        

        // axios.defaults.headers['Authorization'] ='JWT ' + localStorage.getItem("access_token")

        // console.log("only candidate:",candidates)
        // console.log("candidate_all::",candidate_all)
    }




    return (
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} >
                <Form><br /><br />



                    Username :  <Field name='username' id='username' type='text' /><br /><br />
                    <ErrorMessage name='username' /><br /><br />
                    Password :  <Field name='password' id='password' type='password' /><br /><br />
                    <ErrorMessage name='password' /><br /><br />
                    <button type='submit' >Login</button>




                </Form>
            </Formik>

        </div>
    )
}

export default LoginForm








