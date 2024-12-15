<script>
    import axios from "axios";
    import { createEventDispatcher } from "svelte";

    let students = [];
    let selectedStudent = null;
    let searchQuery = "";

    const dispatch = createEventDispatcher();

    function getStudents() {
        axios.get("http://localhost:3001/api/students").then((response) => {
            students = response.data;
        });
    }

    function selectStudent(student) {
        selectedStudent = student;
        dispatch("studentSelected", selectedStudent);
    }

    getStudents();
    
</script>

<div class="mb-5">
    <h1 class="mt-3">List of all Students</h1>
    <div class="header">
        <div class="action-buttons">
            <a href="#/create-student">+ Add Student</a>
        </div>
        <div class="search-bar">
            <input type="text" bind:value={searchQuery} placeholder="Search by Name" />
        </div>
    </div>
    <div class="student-list">
        {#each students as student}
            {#if student.name.toLowerCase().includes(searchQuery.toLowerCase())}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div
                    class="student-box"
                    class:selected={selectedStudent === student}
                    on:click={() => selectStudent(student)}
                >
                    <p><strong>ID:</strong> {student._id}</p>
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Student ID:</strong> {student.student_id}</p>
                    <a href={"#/students/" + student._id}>View Details</a>
                </div>
            {/if}
        {/each}
    </div>
</div>

<style>
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
    }

    .action-buttons {
        display: flex;
    }

    .action-buttons a {
        margin-right: 1rem;
    }

    .search-bar {
        flex: 1;
        margin-left: 1rem;
        
    }

    
    .student-list {
        display: flex;
        flex-wrap: wrap;
        margin-top: 1rem; 
    }
    
    .student-box {
        border: 1px solid #44a5e1;
        padding: 1rem;
        margin: 0.5rem;
        width: calc(33% - 1rem); 
        cursor: pointer;
    }
    
    
    .student-box a {
        display: block;
        text-align: center;
        margin-top: 1rem;
    }

</style>