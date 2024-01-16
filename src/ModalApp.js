import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axiosClient from "./plugins/axiosClient";
import { useNavigate } from "react-router-dom";

export default function ModalApp({open, toggle, roles}){
    const navigate = useNavigate()
    const handleRole = (e) => {
        e.preventDefault()
        let role = (e.target[0].value)
        axiosClient.post('/admins/set-role', {
            role: role
        }).then((res) =>{
            if(res.status === 202){
                if(role === 'admin'){
                    navigate('/admin')
                }else if(role === 'superadmin'){
                    navigate('/super_admin')
                }
            }
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }
    return(
        <Modal isOpen={open} toggle={toggle}>
            <ModalHeader>
                <p>Select your role</p>
            </ModalHeader>
            <ModalBody>
                <form id="role" onSubmit={handleRole}>
                    <select className="form-control my-2">
                        <option value="" hidden>Select ur role</option>
                        {
                            roles.map((item, index) => <option value={item} key={index}>{item}</option> )
                        }
                    </select>

                </form>
            </ModalBody>
            <ModalFooter>
                <button form="role" type="submit" className="btn btn-primary">Save</button>
            </ModalFooter>
        </Modal>
    )
}