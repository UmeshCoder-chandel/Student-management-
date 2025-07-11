import express from 'express'
import db from '../db.js';
const router=express.Router();

router.get("/home",(req,res)=>{
    res.render('home')
})

router.get("/add-teachers",(req,res)=>{
    const search= req.query.search || '';
    const sortby= req.query.sort || '';
    const order=req.query.order || '';
   var sql='select * from teachers'
let values=[];
    if(search){
        sql+= 'where name like ? or email like ?' 
        values=[`%${search}%`,`%${search}%`]
}

const valid = ['name','email','department','experience']
if(sortby && valid.includes(sortby)){
    sql += `order by ${sortby} ${order}`
}
db.query(sql,values,(err,result)=>{
    if(err){
        throw err;
    }else{
        res.render('teachertb',{result,search,sortby,order})
    }
})
})

router.get("/view-teacher/:id",(req,res)=>{
    const id = req.params.id;
    const sql = 'select * from teachers where id=?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            throw err;
        } else {
            if (result.length > 0) {
                res.render('viewteacher', { teacher: result[0] });
            } else {
                res.status(404).send('Teacher not found');
            }
        }
    });
})

router.get('/delete-teacher/:id', (req, res) => {
    const id= req.params.id;
    const sql='DELETE from teachers where id=?'
    db.query(sql,[id],(err,data)=>{
        if(err){
            throw err;
        }else{
            if(data.length > 0){
                res.redirect('teachertb',{teacher:data[0]})
            }else{
                res.status(404).send('Teacher not found');
            }
        }
    })
})

export default router;