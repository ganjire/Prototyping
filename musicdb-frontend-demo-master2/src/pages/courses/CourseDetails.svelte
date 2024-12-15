<script>
    import axios from "axios";
    

    export let params = {};
    let course_id;
    let student_id;
   
 

    $: {
        course_id = params.id;
        getCourse();
        getStudents();
    }

    let course = {
        _id: "",
        name: "",
        professor: "",
        room: "",
        students: [],
    };

    let students = [];
   

    function getCourse() {
        axios.get("http://localhost:3001/api/courses/" + course_id)
            .then((response) => {
                course = response.data;
            });
    }

    function getStudents() {
        axios.get("http://localhost:3001/api/students")
            .then((response) => {
                students = response.data;
            });
    }

    function addStudentToCourse() {
        const selectedStudent = students.find((student) => student._id === student_id);
        if (selectedStudent) {
            course.students.push(selectedStudent.name);
            axios.put("http://localhost:3001/api/courses/" + course_id, course)
                .then((response) => {
                    getCourse();
                    serverMessage = response.data.message;
                })
                .catch((error) => {
                    serverMessage = "Failed to update student.";
               
                
                });

             
        }
    }


</script>

<div class="mb-5">
    <div class="update-form" style="width: 60%;">
        <h2>Update Students</h2>
        <label for="student">Add Student to Course</label>
        <select class="form-select" bind:value={student_id} id="student">
            {#each students as student}
                <option value={student._id}>{student.name}</option>
            {/each}
        </select>
        <button class="btn btn-primary mt-2" on:click={addStudentToCourse}
            >Update</button
        >
    </div>
    <div class="course-details" style="width: 60%;">
        <h3 class="mt-3">Course (ID: {course_id})</h3>
        <div class="course-table">
            <div class="row">
                <div class="cell">
                    <p><strong>Name:</strong></p>
                    <p>{course.name}</p>
                </div>
                <div class="cell">
                    <p><strong>Professor:</strong></p>
                    <p>{course.professor}</p>
                </div>
                <div class="cell">
                    <p><strong>Room:</strong></p>
                    <p>{course.room}</p>
                </div>
                <div class="cell">
                    <p><strong>Students:</strong></p>
                    <ul>
                        {#each course.students as student}
                            <li>{student}</li>
                        {/each}
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .course-details {
        border: 1px solid #44a5e1;
        padding: 2rem;
        margin-bottom: 1rem;
        margin-top: 1rem;
        width: 60%;
    }

    .course-table {
        display: table;
        width: 100%;
    }

    .row {
        display: table-row;
    }

    .cell {
        display: table-cell;
        padding: 0.5rem;
        width: 25%;
    }

    .cell p {
        margin-bottom: 0.5rem;
    }

    .cell strong {
        font-weight: bold;
    }

    .update-form {
        margin-bottom: 2rem;
        width: 60%;
    }
</style>
