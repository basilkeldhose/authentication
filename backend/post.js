

module.exports=posts("/",(req,res)=>{
    res.json({
        post:{
            title:"fisrt post",
            description:"random data you shouldnot access"
        }
    })
})