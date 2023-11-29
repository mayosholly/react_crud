import axios from "axios";
import { useEffect, useState } from "react"
import { Link,  useParams } from "react-router-dom"
import Loading from "../components/Loading";


function StudentEdit(){

    let { id } = useParams()
   
    
    const [loading, setLoading] =  useState(true)
    const [inputErrorList, setInputErrorList] = useState({})

    const [student,setStudent] = useState({})

    useEffect(() => {
        axios.get(`http://smart-church.test/api/admin/members/${id}`).then(res => {
            console.log(res)
            setStudent(res.data.data)
            setLoading(false)
        }).catch(function(error) {
            
            if(error.response.status === 404){
                alert('page not found')
                 setLoading(false)
                
            }
            if(error.response === 500){
                alert(error.response.data)
                setLoading(false)

            }

        })
    }, [id])

    const handleInput = (e) => {
        e.persist();
        setStudent({...student, [e.target.name]: e.target.value});
    }

    const updateStudent = (e) => {
        e.preventDefault();
        setLoading(true)

        const data = {
            first_name: student.first_name,
            last_name: student.last_name,
            email: student.email,
            course: student.course,

        }

        axios.put(`http://smart-church.test/api/admin/members/${id}`, data).then(res => {
            alert(res.data.message)
        setLoading(false)

        }).catch(function(error) {
            if(error.response.status === 422){
                setInputErrorList(error.response.data.errors)
                 setLoading(false)
                
            }
            if(error.response.status === 404){
                alert('page not found')
                 setLoading(false)
                
            }
            if(error.response === 500){
                alert(error.response.data)
                setLoading(false)

            }

        })
    }
    if(loading){
        return(
           <Loading />
        )
    }

    if(Object.keys(student).length === 0){
        return (
            <div className="container">
                <h4>No such student id found</h4>
            </div>
        )
    }
    return (
        <div className="container mt-5">
        <div className="row">
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header">
                        <h4>Student List
                        <Link to="/students" className="btn btn-danger float-end"> Back</Link>    
                        </h4>
                    </div>
                    <div className="card-body">
                        <form onSubmit={updateStudent}>
                            <div className="mb-3">
                                <label>First Name</label>
                                <input type="text" value={student.first_name} onChange={handleInput} name="first_name" className="form-control" />
                                <span className="text-danger">{inputErrorList.first_name}</span>
                            </div>
                            <div className="mb-3">
                                <label>Last Name</label>
                                <input type="text" value={student.last_name} onChange={handleInput} name="last_name"  className="form-control" />
                                <span className="text-danger">{inputErrorList.last_name}</span>
                            </div>
                            <div className="mb-3">
                                <label>Email</label>
                                <input type="email" value={student.email} onChange={handleInput} name="email" className="form-control" />
                                <span className="text-danger">{inputErrorList.email}</span>
                            </div>
                            <div className="mb-3">
                                <label>Phone</label>
                                <input type="number" value={student.phone} onChange={handleInput} name="phone" className="form-control" />
                                <span className="text-danger">{inputErrorList.phone}</span>
                            </div>
                            <div className="mb-3">
                            <button type="submit" className="btn btn-primary">Update Student</button>
                            </div>
                        </form>
                    </div>
                </div>
                </div>
                </div>
                </div>
    )
}

export default StudentEdit