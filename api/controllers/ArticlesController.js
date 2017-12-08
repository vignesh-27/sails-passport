/**
 * ArticlesController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	list: (req, res)=>{
        article.getarticle(function(error, data) {
             res.view('list', {articles:data});
    });
    },

    add: (req, res)=>{
        res.view('add');
    },

    create: (req, res)=>{
        var title = req.body.title;
        var body = req.body.body;
        Articles.create({title:title, body:body}).exec(err=>{
            if(err){
                res.send(500,{error:"Database error"});
            }
            res.redirect('/articles/list');
        });
    },
    
    delete:(req,res)=>{
        Articles.destroy({id:req.params.id}).exec(err=>{
            if(err){
            res.send(500,{error:"Database error"});
        }
            res.redirect('/articles/list');
        });
    },

    edit:(req, res)=>{
        Articles.find({id:req.params.id}).exec((err, data)=>{
            if(err){
                res.send(500,{error:"Database error"});
            }
            res.view('edit', {article:data});
        });
    },

    update:(req, res)=>{
        var title = req.body.title;
        var body = req.body.body;
        Articles.update({id:req.params.id},{title:title, body:body}).exec(err=>{
            if(err){
                res.send(500,{error:"Database error"});
            }
            res.redirect('/articles/list');
        });
        return false;
    }
    
};

