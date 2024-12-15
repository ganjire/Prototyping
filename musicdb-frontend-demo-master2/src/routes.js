// Pages
import Home from "./pages/Home.svelte";

import Courses from "./pages/courses/Courses.svelte"
import CourseDetails from "./pages/courses/CourseDetails.svelte"

import Students from "./pages/students/Students.svelte"
import StudentDetails from "./pages/students/StudentDetails.svelte"
import CreateStudent from "./pages/students/CreateStudent.svelte"

export default {
    // Home
    '/': Home,
    '/home': Home,

    // Courses
    '/courses': Courses,
    '/courses/:id': CourseDetails,
    
    // Students
    '/students': Students,
    '/students/:id': StudentDetails,
    '/create-student': CreateStudent,
}