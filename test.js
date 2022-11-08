const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test_database',{useNewUrlParser: true});
const BlogPost = require('./models/BlogPost');

BlogPost.create({
    title: "Các trường lùi giờ học ra sao?",
    body: "Ngay sau khi Sở GD-ĐT TP.HCM có văn bản hướng dẫn về việc lùi giờ vào học buổi sáng, nhiều trường phổ thông trên địa bàn TP đã lên kế hoạch điều chỉnh."
},(error, blogpost)=>{
    console.log(error,blogpost);
})