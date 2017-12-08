/**
 * AuthenticationController
 *
 * @description :: Server-side logic for managing authentications
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	login: (req, res)=>{
             res.view('login');
    },

    signup:(req,res)=>{
        res.view('signup');
    },

    addsignup:(req, res)=>{
        var username = req.body.uname;
        var password = req.body.password;
        var role = 2;
            Authentication.findOne({username:username}).exec((err, data)=>{
                if(data){
                    req.flash('message', 'Username is already there');
                    res.view('signup');
                }else if(password.length<8){
                    req.flash('message', 'Password should be min 8 digit');
                    res.view('signup');
                }else{
                    Authentication.create({username:username, password:password, role:role}).exec((err)=>{
                        if(err){
                            res.send(500,{error:"Registration Failed"});
                        }
                        res.view('signup');
                    });
                }
            });
    },

    Auth_check:(req, res)=>{
        var user = req.body.uname;
        var password = req.body.password;
        Authentication.findOne({username:user, password:password}).exec((err, data)=>{
            if(data == undefined){
                req.flash('message', 'UserName or Password incorrect');
                res.view('login');
            }else{
                if(data.role == 1){
                req.session.user = data.username;
                res.redirect('/articles/list');
                }else if(data.role == 2){
                    req.session.user = data.username;
                    res.view('index');
                }
            }
        });
    }

};

