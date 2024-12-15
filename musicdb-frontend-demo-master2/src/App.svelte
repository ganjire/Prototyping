<script>
	import Router from "svelte-spa-router";
	import routes from "./routes";
</script>

<!-- This part is always displayed -->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<div class="container-fluid">
		<a class="navbar-brand" href="#/">Uni DB</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarNavDropdown"
			aria-controls="navbarNavDropdown"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse" id="navbarNavDropdown">
			<ul class="navbar-nav">
				<li class="nav-item">
					<a class="nav-link" href="#/students">Students</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="#/courses">Courses</a>
				</li>
			</ul>
		</div>
	</div>
</nav>

<div class="container mt-3">
	<!-- Here we load the page depending on the current URL -->
	<Router {routes} />
</div>

<style>
	 /* Custom styles for the navigation bar */
	 

    .navbar-brand {
        font-weight: bold;
        color: #5071a3;
    }

    .navbar-nav .nav-link {
        color: #000000;
    }

    .navbar-nav .nav-link:hover {
        color: #007bff;
    }
</style>
