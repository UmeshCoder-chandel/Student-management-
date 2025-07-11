import express from "express";
import db from '../db.js'

const router=express.Router();

router.get("/home", (req, res) => {
  res.render("home");
});
router.get('/add-course', (req, res) => {
    const search = req.query.search || '';
    const sortby= req.query.sort || '';
    const order =req.query.order === 'desc' ? 'DESC' :'ASC' 
    var str = "select * from course";
    let values = [];
    if (search) {
        str += " where name like ? or department like ?";
        values = [`%${search}%`, `%${search}%`];
    }
    const validSortColumns = ['name', 'department'];

  if (sortby && validSortColumns.includes(sortby)) {
      str += ` ORDER BY ${sortby} ${order}`;
  }
    db.query(str, values, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.render('coures', { data, search, sortby, order })
        }
    })
})
router.get("/addcourse",(req,res)=>{
  res.render('addCourse')
})
router.post("/addcourse",(req,res)=>{
    const {name,department}=req.body;
    const sql="insert into course(name,department) values(?,?)"
    db.query(sql,[name,department],(err,result)=>{
        if(err){
            throw err
        }else{
            res.redirect('add-course')
        }
        
    })
})
router.get("/edit-course/:id",(req,res)=>{
    const id=req.params.id;
    const sql='select * from course where id=?'
    db.query(sql,[id],(err,result)=>{
        if(err){
            throw err
        }else{
            // res.render('editcoures')
            res.render('editcoures', { course: result[0] }); 
        }
    })
})
router.post("/editcourse/:id",(req,res)=>{
    const id=req.params.id;
    const {name,department}=req.body
    const sql="update course set name=? , department=? where id=? "
  db.query(sql,[name,department,id],(err,result)=>{
    if(err){
        throw err
    }else{
        res.redirect('/add-course')
    }

  })
})

router.get('/delete-course/:id',(req,res)=>{
    const id=req.params.id;
    const sql='delete from course where id=?'
    db.query(sql,[id],(err,result)=>{
        if (err){
            throw err;
        }else{
        res.redirect('/add-course')

        }
    })
})

export default router;