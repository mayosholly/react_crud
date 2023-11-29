
import React , { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import Loading from "../components/Loading"
function Student(){
    const [loading, setLoading] =  useState([])
    const [students, setStudents] =  useState([])
    useEffect(() => {
        axios.get('http://smart-church.test/api/admin/members').then(res => {
            console.log(res)
            setStudents(res.data.data)
            setLoading(false)
        })
    }, [])
    if(loading){
        return(
           <Loading />
        )
    }

    const deleteStudent = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget
        thisClicked.innerText = "Deleting..."

        axios.delete(`http://smart-church.test/api/admin/members/${id}`).then(res => {
            alert(res.data.message)
        thisClicked.closest("tr").remove();

        }).catch(function(error) {
            
            if(error.response.status === 404){
                alert('page not found')
        thisClicked.innerText = "Delete"

                
            }
            if(error.response === 500){
                alert(error.response.data)

            }

        })
    }
    var studentDetails = ""
    studentDetails = students.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{ item.id }</td>
                    <td>{ item.first_name }</td>
                    <td>{ item.last_name }</td>
                    <td>{ item.email }</td>
                    <td>{ item.phone }</td>
                    <td>
                        <Link to={`/students/${item.slug}/edit`} className="btn btn-success">Edit</Link>
                    </td>
                    <td>
                        <button type="button" onClick={(e) => deleteStudent(e, item.slug)}  className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            )
        }
    )


    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>Student List
                            <Link to="/students/create" className="btn btn-primary float-end">Add Student</Link>    
                            </h4>
                        </div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Edit </th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Student