module.exports = {
    getarticle: function(callback){
    Articles.find({}).exec((err, data)=>{
    if(err){
        res.send(500, {Error:"Database Error"});
    }
    callback(null, data);
});
}
}
