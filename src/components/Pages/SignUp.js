import React, { useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from 'yup';
import { actionSignup } from './../../store/action'
import { AuthContext } from './../../App'
import ReactNotification, { store } from 'react-notifications-component'
import { Redirect } from 'react-router-dom'

const validationSchema = yup.object().shape({
    firstName: yup.string().min(5).max(30).required().matches(/^[a-zA-Z\s.]*$/g, "Digit is not allowed"),
    lastName: yup.string().min(5).max(30).required().matches(/^[a-zA-Z\s.]*$/g, "Digit is not allowed"),
    password: yup.string().min(5).max(30).required().matches(/[A-Za-z0-9\s.%]+/g),
    email: yup.string().email().min(5).max(50).required(),
    Contact: yup.string().required().min(15, "you've to input 9 digit").max(15).matches(/[+\s0-9]+/, "Chart are not allowed"),
    address: yup.string().required().max(50),
    rePassword:yup.string().oneOf([yup.ref('password'),null],"Incorrect password")
})




function SignUp() {

    const singction = useContext(AuthContext);

    useEffect(()=>{
        document.body.style.background = "linear-gradient(-45deg,#EE7752,#E73C7E,#23A6D5,#23D5AB)";
        document.body.style.backgroundSize = "400% 400%";
        if (singction.Authen.error) {
            store.addNotification({
                title: "Error",
                message: singction.Authen.message,
                type: singction.Authen.variant,
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true,
                    showIcon: true
                }
            })
        }
    },[singction.Authen])

    if (singction.Authen.isAuth === "yes") return (
        <Redirect from='/SignUp' to={{ pathname: '/', state: { status: "Register Success" } }} />
    )

    return (
        <div>
            <ReactNotification />
            <div className="mx-auto shadow-lg p-3 mb-5 bg-white rounded" style={{ width:"30%", marginTop:"10%", padding: '10%' }}>
            <span style={{ fontSize:"50px", color:'red', marginLeft:"45%" ,marginBottom:"25px"}}><i className="fa fa-users"></i></span>
                <Formik
                    initialValues={{ firstName: '', lastName: '', email: '', address: '', Contact: '+88 0', gender: 'Male', password: '', rePassword: '' }}
                    onSubmit={(data, { setSubmitting, resetForm }) => {
                        setSubmitting(true);
                        actionSignup(data, singction.dispatchAuth);
                        setSubmitting(false);
                        resetForm({})
                        store.addNotification({
                            title: "Sign Up on Queue",
                            message: "please wait a mintue",
                            type: "info",
                            insert: "top",
                            container: "top-right",
                            animationIn: ["animated", "fadeIn"],
                            animationOut: ["animated", "fadeOut"],
                            dismiss: {
                                duration: 2000,
                                onScreen: true,
                                showIcon: true
                            }
                        })
                    }}
                    validationSchema={validationSchema}

                >
                    {
                        ({ errors, isSubmitting }) => (
                            <Form style={{ width:"50%", margin:'auto' }}>
                                <div className="form-group">
                                    <Field type="input" placeholder="First Name" name="firstName" className="form-control" />
                                    <small className="form-text" style={{ color: 'red' }}> {errors.firstName}  </small>
                                </div>
                                <div className="form-group">
                                    <Field type="input" placeholder="Last Name" name="lastName" className="form-control" />
                                    <small className="form-text" style={{ color: 'red' }}> {errors.lastName} </small>
                                </div>
                                <div className="form-group">
                                    <Field type="email" placeholder="Email" name="email" className="form-control" />
                                    <small className="form-text" style={{ color: 'red' }}> {errors.email}  </small>
                                </div>
                                <div className="form-group">
                                    <Field type="input" placeholder="Address" name="address" className="form-control" />
                                    <small className="form-text" style={{ color: 'red' }}> {errors.address}  </small>
                                </div>
                                <div className="form-group">
                                    <Field type="input" placeholder="Contact" name="Contact" className="form-control" />
                                    <small className="form-text" style={{ color: 'red' }}> {errors.Contact}  </small>
                                </div>
                                <div className="form-group">
                                    <Field className="form-control" as="select" name="gender">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </Field>
                                </div>
                                <div className="form-group">
                                    <Field type="password" placeholder="Password" name="password" className="form-control" />
                                    <small className="form-text" style={{ color: 'red' }}> {errors.password}  </small>
                                </div>
                                <div className="form-group">
                                    <Field type="password" placeholder="Retype-Password" name="rePassword" className="form-control" />
                                    <small className="form-text" style={{ color: 'red' }}> {errors.rePassword}  </small>
                                </div>
                                <div>
                                    <button className="btn btn-primary" style={{ marginLeft:"38%",marginTop:"30px" }} disabled={isSubmitting} type="submit">
                                        submit
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




export default SignUp;
