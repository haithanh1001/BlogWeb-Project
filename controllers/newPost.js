module.exports =(req,res)=>{
    if(req.session.userId){
        return res.render('pages/create')
    }
    res.redirect('/auth/login');
}