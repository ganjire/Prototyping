<script>
    let currentSlide = 0;
    const slides = ["images/slide2.png", "images/slide3.png"];

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    }
</script>

<div class="centered-text">
    <h1 class="mt-3">Welcome to the Enrollment Portal</h1>
    <p class="lead">
      Simplify the enrollment of students in courses and ensure a smooth start to their academic journey.
    </p>
  </div>

<div class="slideshow">
    <div class="image-container">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img class="image" src={slides[currentSlide]} alt="Slideshow Image" />
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="prev-arrow" on:click={prevSlide}>
            <span class="arrow">◀</span>
        </div>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="next-arrow" on:click={nextSlide}>
            <span class="arrow">▶</span>
        </div>
    </div>
</div>

<div class="spacer" />

<div class="row justify-content-center">
    <div class="col-md-6">
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">Manage Courses</h5>
                <p class="card-text">
                    Edit and manage courses to ensure the right content
                    is offered.
                </p>
                <a href="#/courses" class="btn btn-primary">Manage Courses</a>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Enroll Students</h5>
                <p class="card-text">
                    Enroll students in courses to ensure they can take the
                    required subjects.
                </p>
                <a href="#/students" class="btn btn-primary">Enroll Students</a>
            </div>
        </div>
    </div>
</div>

<style>
    .slideshow {
        position: relative;
    
    
    }

    .image-container {
        position: relative;
        text-align: center;
    }

   

    .image {
        width: 27%;
        height: auto;
    }

    .prev-arrow,
    .next-arrow {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 40px;
        height: 40px;
        background-color: rgb(255, 255, 255);
        color: rgb(41, 148, 175);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .prev-arrow {
        left: 5px;
    }

    .next-arrow {
        right: 5px;
    }

    .arrow {
        font-size: 38px;
    }

    .spacer {
        margin-bottom: 20px; 
    }

    .centered-text {
    text-align: center;
    margin-top: 3rem;
    }

</style>