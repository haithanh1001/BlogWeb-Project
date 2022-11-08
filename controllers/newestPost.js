const BlogPost = require('../models/BlogPost');
module.exports = (req,res)=>{
    BlogPost.find({},(error,posts)=>{
        res.render('pages/newestPost',{
            newestPost: posts[posts.length-1]
        })
    })
}