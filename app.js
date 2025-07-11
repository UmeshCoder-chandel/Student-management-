import express from 'express'
import loginRoute from './router/login.js'
import studentRoute from './router/student.js'
import courseRoute from './router/Course.js'
import teacherRoute from './router/teacher.js'
const app = express();

app.set("view engine", "ejs");
app.use(express.static('public'))
// app.set("views", "views");
app.use(express.urlencoded({extended:true}))
app.use("/",loginRoute);
app.use("/", studentRoute);
app.use("/", courseRoute);
app.use("/", teacherRoute);

 
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});  