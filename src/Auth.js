import React, { useState } from 'react'
import axiosClient from './plugins/axiosClient'
import ModalApp from './ModalApp'

export default function Auth() {
    const [roles, setRoles] = useState([])
    const [modal, setModal] = useState(false)
    const handleSubmit = (e) => {
        e.preventDefault()
        let username = e.target[0].value
        let password = e.target[1].value
        axiosClient.post('/admins/login', {
            username: username,
            password: password
        }).then((res) => {
            console.log(res)
            localStorage.setItem('token', res?.data?.token)
            setRoles(res?.data?.roles)
            if(res.status === 202){
                setModal(true)
            }
            }).catch((err)=> {
                console.log(err)
            })  
        }
  return (
    <div>
        <div className="container">
            <ModalApp open={modal}  toggle={() => setModal(false)} roles={roles}/>
            <div className="row">
                <div className="col-md-6 offset-3">
                    <div className="card">
                        <div className="card-header">
                            <h3>Login</h3>
                        </div>
                        <div className="card-body">
                            <form id='form' onSubmit={handleSubmit}>
                                <input type="text" placeholder='Username' className='form-control my-2' />
                                <input type="text" placeholder='Password' className='form-control my-2' />
                            </form>
                        </div>
                        <div className="card-footer">
                            <button className='btn btn-primary' form='form'>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
