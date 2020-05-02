import React, { useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from 'yup';
import { login } from './../../store/action'
import { AuthContext, stateContext } from './../../App'
import ReactNotification from 'react-notifications-component'
import { Redirect, useLocation } from 'react-router-dom'
import { notification } from "./../../store/Notification"


const validationSchema = yup.object().shape({
    password: yup.string().required(),
    email: yup.string().email().required()
})



function Login() {

    const logContext = useContext(AuthContext);
    const state = useContext(stateContext)
    const PATH = "/PhoneShop_wtthout_redux"
    let location = useLocation()

    useEffect(() => {
        document.body.style.background = "linear-gradient(-45deg,#EE7752,#E73C7E,#23A6D5,#23D5AB)";
        document.body.style.backgroundSize = "400% 400%";
        if(location.state){
            notification("Login",location.state.message,"info")
            state.dispatchCart({ type:"Redirect", payload:false })
            location.state = undefined;
        }
    }, [logContext.Authen])

    if (logContext.Authen.isAuth === "yes") return (
        
            <Redirect  to={{ pathname: `${PATH}/Home`, state: { status: "Login Success" } }} />
       
    )

    return (
        <div>
            <ReactNotification />
           
            <div className="mx-auto shadow-lg p-3 mb-5 bg-white rounded" style={{ width:"30%", marginTop:"15%"}} >
            <span style={{ fontSize:"50px", color:'red', marginLeft:"50%" ,marginBottom:"25px"}}><i className="fa fa-lock"></i></span>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={(data, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        login(data, logContext.dispatchAuth)
                        setSubmitting(false);
                        resetForm({})
                    }}
                    validationSchema={validationSchema}
                    
                >
                    {
                        ({ errors, isSubmitting }) => (
                            <Form style={{ width:"50%", margin:'auto' }}>

                                <div className="form-group">
                                    <Field type="email" placeholder="Email" name="email" className="form-control" />
                                    <small className="form-text" style={{ color: 'red' }}> {errors.email}  </small>
                                </div>

                                <div className="form-group">
                                    <Field type="password" placeholder="Password" name="password" className="form-control" />
                                    <small className="form-text" style={{ color: 'red' }}> {errors.password}  </small>
                                </div>
                                <div>
                                    <button className="btn btn-primary" style={{ marginLeft:"45%",marginTop:"30px" }} disabled={isSubmitting} type="submit">
                                        Login
                                    </button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )

}

export default Login;