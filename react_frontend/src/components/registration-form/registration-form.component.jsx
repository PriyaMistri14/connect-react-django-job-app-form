import React from 'react'

import './registration-form.styles.css'

import { Formik, Form, Field, ErrorMessage } from 'formik'

import * as Yup from 'yup'

import axiosIntance from '../../axiosApi'

const RegistrationForm = () => {
 const initialValues = {
    username:"",
    email:"",
    password:"",
    password2:""
 }

 const validationSchema = Yup.object().shape({
  username: Yup.string().required("Required!!"),
  email: Yup.string().email("Invalid email formate!!").required("Required!!"),
  password: Yup.string().min(8, "Minimum 8 characters are required!!").required("Required!!"),
  password2: Yup.string().oneOf([Yup.ref('password'), ''],"Passwords must match!!").required("Required!!")

})


const onSubmit = async (values, form) => {
  console.log("form data:", values)
  console.log("abc" , form)
try{

  const res = await axiosIntance.post("http://127.0.0.1:8000/register/",{
    username:values.username,
    email:values.email,
    password:values.password,
    password2:values.password2
  })

  console.log("register response :" , res)

}catch(error){
  console.log("Error", error.response.data.username)
  if(error.response.data.username == "A user with that username already exists.")
  {
    // alert("User already exists !!!")
    form.setFieldError("username","User name already exists!!")
  }
}

}


  return (
    <div>
      <Formik initialValues={initialValues}
       validationSchema= {validationSchema}
        onSubmit={onSubmit}  
         >
        <Form><br /><br />
       Username :  <Field name= 'username' id='username' type='text' /><br /><br />
        <ErrorMessage name= 'username' /><br /><br />
       Email :  <Field name="email" id="email" type="email" /><br /><br />
        <ErrorMessage  name='email' /><br /><br />
      Password :  <Field name='password' id='passsword' type='password'  /><br /><br />
        <ErrorMessage name='password' /><br /><br />
       Password2 :   <Field name='password2' id='passsword2' type='password'  /><br /><br />
        <ErrorMessage name='password2' /><br /><br />

        <button type='submit'>Register</button><br /><br />



        </Form>



      </Formik>
      
    </div>
  )
}

export default RegistrationForm
