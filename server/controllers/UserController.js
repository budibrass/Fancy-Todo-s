const { User } = require("../models");
const { comparePass } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
    static async register (req, res, next) {
        try {
            let bodyUser = {
                email : req.body.email,
                password : req.body.password
            };
    
            const data =  await User.create(bodyUser)
            res.status(201).json({
                msg: `register success`,
                id : data.id,
                email : data.email
            })
        } catch (error) {
            next(error)
        }
    };

    static async login (req, res, next) {
       try {
            let bodyUser = {
                email : req.body.email,
                password : req.body.password
            };

            const data = await User.findOne({
                where : { email : bodyUser.email }
            });

            if(!data) throw { msg : `wrong email or password`, name : `invalidEmailOrPassword` };

            let comparePassword = comparePass(bodyUser.password, data.password)
            if(!comparePassword) throw { msg : `wrong email or password`, name : `invalidEmailOrPassword` };

            let payload = {
                id : data.id,
                email : data.email
            };

            let token = generateToken(payload);

            res.status(200).json({
                msg: `login success`,
                token
            })
       } catch (error) {
            next(error)
       }
    };
};

module.exports = UserController;