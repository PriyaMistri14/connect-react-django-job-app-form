
import axios from 'axios'

const baseURL = "http://127.0.0.1:8000/"


const axiosIntance = axios.create({
    baseURL: baseURL,
    timeout:5000,
    headers:{
        'Authorization': 'JWT ' + localStorage.getItem("access_token"),
        'Content-Type':'application/json',
        'accept': 'application/json'
    }
})


export const axiosGET = async(url)=>{
    const res = await axiosIntance.get(baseURL + url)
    console.log("URL:  ", url, "whole url :  ", baseURL+url, "resss:  ", res, "in get");
    return res

}


export const axiosPOST = async (url, payload)=>{
    const res = await axiosIntance.post(baseURL +url, payload)
    console.log("URL:  ", url, "whole url :  ", baseURL+url, "resss:  ", res, "Payload: ", payload, "in post");
    return res

}



export const axiosDELETE = async (url) =>{
    const res = await axiosIntance.delete(baseURL + url)
    console.log("URL:  ", url, "whole url :  ", baseURL+url, "resss:  ", res,  "in delete");
    return res
}




export const axiosPUT = async (url, payload)=>{
    const res = await axiosIntance.put(baseURL +url, payload)
    console.log("URL:  ", url, "whole url :  ", baseURL+url, "resss:  ", res, "Payload: ", payload, "in post");
    return res

}




// ..........................
// import axios from 'axios'

// const axiosInstance = axios.create({
//     baseURL: 'http://127.0.0.1:8000/api/',
//     timeout: 5000,
//     headers: {
//         'Authorization': "JWT " + localStorage.getItem('access_token'),
//         'Content-Type': 'application/json',
//         'accept': 'application/json'
//     }
// });


// ......................


export default axiosIntance
