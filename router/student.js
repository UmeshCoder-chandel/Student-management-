import express from 'express';
import db from '../db.js';
const router = express.Router();

router.get("/home", (req, res) => {
  res.render("home");
});

// router.get('/add-student', (req, res) => {
//   res.render('student', { search: '', sortby: '', order: '', data: [] });
// });
router.get('/add-student', (req, res) => {
    const search = req.query.search || '';
    const sortby= req.query.sort || '';
    const order =req.query.order === 'desc' ? 'DESC' :'ASC' 
    var str = "select * from students";
    let values = [];
    if (search) {
        str += " where name like ? or email like ?";
        values = [`%${search}%`, `%${search}%`];
    }
    const validSortColumns = ['name', 'email', 'course', 'admission_date', 'status'];

  if (sortby && validSortColumns.includes(sortby)) {
      str += ` ORDER BY ${sortby} ${order}`;
  }
    db.query(str, values, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.render('student', { data,search,sortby,order})
        }
    })
})
router.get("/add",(req,res)=>{
  res.render('addStudent')
})
router.post("/add",(req,res)=>{
  const {name, email, course, age, gender, dob, address, phone, admission_date, status}=req.body;
    const sql="INSERT INTO students (name, email, course, age, gender, dob, address, phone, admission_date, status) VALUES(?,?,?,?,?,?,?,?,?,?)";
    db.query(sql,[name, email, course, age, gender, dob, address, phone, admission_date, status],(err,result)=>{
        if(err){
            throw err 
        }else{
            res.redirect('add-student')
        }
    })
})


router.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    const str = "DELETE FROM students WHERE id = ?";
    db.query(str, [id], (err, data) => {
        if (err) { 
            throw err
        } else {

            res.redirect('/add-student')
        }
    })
})
router.get('/giveedit/:id', (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM students WHERE id = ?', [id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) return res.status(404).send('Student not found');
    res.render('EditStudent', { student: results[0] }); // 👈 THIS is crucial
  });
});

router.post('/edits/:id',(req,res)=>{
    const id=req.params.id;
     const {name, email, course, age, gender, dob, address, phone, admission_date, status}=req.body;
    const sql="update students set name=?,email=?,course=? ,age=?,gender=?,dob=?,address=?,phone=?,admission_date=?,status=? where id=?"
    db.query(sql,[name, email, course, age, gender, dob, address, phone, admission_date, status,id],(err)=>{
        if(err){
            throw err
        }else{
            res.redirect('/add-student')
        } 
    })
})

router.get('/view/:id',(req,res)=>{
    const id=req.params.id;
    const sql='select * from students where id=?'
    db.query(sql,[id],(err,data)=>{
         if(err){
            throw err;
         }else{
            res.render('viewstudent',{student:data[0]}) 
         }

    })
})

export default router;  