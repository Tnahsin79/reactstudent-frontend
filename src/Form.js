import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'
class Form extends Component {
    constructor() {
        super()
        this.state = {
            studata: []
        }
    }
    componentDidMount() {
        //fetch("https://reactstudent.herokuapp.com/students")
            fetch("http://localhost:3000/students")
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    studata: data
                });
            });
    }
    dataUpdate = () => {
        //fetch("https://reactstudent.herokuapp.com/students")
            fetch("http://localhost:3000/students")
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    studata: data
                });
            });
    }
    insert = async () => {
        try {
            var data = {
                fname: document.getElementById("fname").value,
                lname: document.getElementById("lname").value,
                age: document.getElementById("age").value
            }
            //let temp = await fetch("https://reactstudent.herokuapp.com/student", {
                let temp = await fetch("http://localhost:3000/student",{
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            alert("Student added");
            this.dataUpdate();
        }
        catch (error) {
            console.log(error);
            //alert(error);
        }
    }
    update = async () => {
        try {
            var data = {
                sid: document.getElementById("sid").value,
                fname: document.getElementById("upfname").value,
                lname: document.getElementById("uplname").value,
                age: document.getElementById("upage").value
            }
            //let temp = await fetch("https://reactstudent.herokuapp.com/update", {
                let temp = await fetch("http://localhost:3000/update",{
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            alert("Data updated");
            this.dataUpdate();
        }
        catch (error) {
            console.log(error);
            //alert(error);
        }

    }
    deleteStudent = async (sid) => {
        try {
            //alert(sid);
            var data = {
                delsid: sid
            }
            //let temp = await fetch("https://reactstudent.herokuapp.com/delete", {
                let temp = await fetch("http://localhost:3000/delete",{
                method: "DELETE",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            alert("Data deleted");
            this.dataUpdate();
        }
        catch (error) {
            console.log(error);
            alert(error);
        }

    }
    render() {
        return (
            <div class="container">
                <h1 class="display-4"> ReactJS Student</h1>
                <div class="row">
                    <div class="col-12 col-md-6">
                        <form>
                            <h2>INSERT STUDENT</h2>
                            <input class="form-control" type="text" name="fname" id="fname" placeholder="Enter first name" required></input><br></br>
                            <input class="form-control" type="text" name="lname" id="lname" placeholder="Enter last name" required></input><br></br>
                            <input class="form-control" type="number" name="age" id="age" placeholder="Enter age" required></input>
                            <button class="btn btn-outline-primary add" onClick={this.insert}>ADD</button>
                        </form>
                    </div>
                    <div class="col-12 col-md-6">
                        <form>
                            <h2>UPDATE STUDENT</h2>
                            <input class="form-control" type="text" name="sid" id="sid" placeholder="enter student ID" required></input><br></br>
                            <input class="form-control" type="text" name="name" id="upfname" placeholder="update student first name" required></input><br></br>
                            <input class="form-control" type="text" name="name" id="uplname" placeholder="update student last name" required></input><br></br>
                            <input class="form-control" type="number" name="name" id="upage" placeholder="update student age" required></input>
                            <button class="btn btn-outline-primary update" onClick={this.update}>UPDATE</button>
                        </form>
                    </div>
                </div>
                <br></br>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Delete Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.studata.map((data) => {
                                return (
                                    <tr>
                                        <td>{data._id}</td>
                                        <td>{data.first_name}</td>
                                        <td>{data.last_name}</td>
                                        <td>{data.age}</td>
                                        <td><button class="btn btn-outline-danger" value={data._id} onClick={e => this.deleteStudent(e.target.value)}>DELETE</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Form