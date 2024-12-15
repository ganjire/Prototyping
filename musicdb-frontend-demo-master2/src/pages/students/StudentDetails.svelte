<script>
    import axios from "axios";

    export let params = {};

    let id;

    $: {
        id = params.id;
        getStudent();
    }

    let student = {};

    function getStudent() {
        axios
            .get("http://localhost:3001/api/students/" + id)
            .then((response) => {
                student = response.data;
            });
    }
</script>

<div class="mb-5">
    <div class="text-center">
        <h1 class="mt-3">Student (ID: {id})</h1>
        <div class="card">
            <div class="card-header">
                <h5 class="card-title">{student.name}</h5>
                <h6 class="card-subtitle mb-2 text-muted">
                    Student ID: {student.student_id}
                </h6>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-6 mx-auto">
                        <p class="card-text">
                            <strong>Geburtstag:</strong>
                            {student.birthday}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .card {
        max-width: 400px;
        margin: 0 auto;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }

    .card-header {
        background-color: #44a5e1;
        color: white;
        padding: 1rem;
       
    }

    .card-title {
        margin-bottom: 0;
    }

    .card-subtitle {
        margin-top: 0.5rem;
        font-size: 0.875rem;
    }

    .card-body {
        padding: 1rem;
        
    }

    .card-text {
        margin-bottom: 0.5rem;

      
    }

    .text-center {
        text-align: center;
    }
      

</style>
