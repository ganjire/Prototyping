<script>
    import axios from "axios";

    let student = {
        name: "",
        student_id: "",
        birthday: ""
    };

    function addStudent() {
        axios.post("http://localhost:3001/api/students", student)
            .then((response) => {
                alert("Student added");
            })
            .catch((error) => {
                console.log(error);
                alert(error);
            });
    }
</script>

<div class="container">
    <div class="card">
        <h1 class="card-header">Add a Student</h1>
        <div class="card-body">
            <form>
                <div class="mb-3">
                    <label for="name" class="form-label">Name</label>
                    <input id="name" class="form-control" type="text" bind:value={student.name} />
                </div>
                <div class="mb-3">
                    <label for="studentId" class="form-label">Student ID</label>
                    <input id="studentId" class="form-control" type="text" bind:value={student.student_id} />
                </div>
                <div class="mb-3">
                    <label for="birthday" class="form-label">Geburtstag</label>
                    <input id="birthday" class="form-control" type="text" bind:value={student.birthday} />
                </div>
                <button on:click={addStudent} type="button" class="btn btn-primary">
                    Add Student
                </button>
            </form>
        </div>
    </div>
</div>

<style>
    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }

    .card {
        width: 400px;
        border: none;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
    }

    .card-header {
        background-color: #71b0e0;
        color: #fff;
        text-align: center;
        padding: 1.5rem;
    
        
    }

    .card-body {
        padding: 1.5rem;
    }

    .form-label {
        font-weight: bold;
    }

    .btn-primary {
        margin-top: 1.5rem;
        width: 100%;
    }
</style>
