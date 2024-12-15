<script>
    import axios from "axios";

    let courses = [];

    function getCourses() {
        axios.get("http://localhost:3001/api/courses").then((response) => {
            courses = response.data;
        });
    }
    getCourses();
</script>

<div class="mb-5">
    <h1 class="mt-3">List of all Courses</h1>
    <ul class="course-list">
        {#each courses as course}
            <li>
                <h5>{course.name}</h5>
                <p>ID: {course._id}</p>
                <a href={"#/courses/" + course._id}>View Details</a>
            </li>
        {/each}
    </ul>
</div>

<style>
    .course-list {
        list-style: none;
        padding: 0;
    }

    .course-list li {
        display: flex;
        flex-direction: column;
        margin-bottom: 2rem;
    }

    .course-list h5 {
        font-weight: bold;
        margin-bottom: 0.5rem;
    }

    .course-list p {
        color: #6c757d;
        margin-bottom: 0.5rem;
    }

   
</style>