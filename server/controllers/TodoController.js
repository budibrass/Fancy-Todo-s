const { Todo } = require("../models");
const moment = require("moment");

class TodoController {
    static async showTodo (req, res, next) {
        try {
            const data = await Todo.findAll({ 
                order : ['id'],
                where : { userId : req.userData.id }
            })

            let todo = []
            if(!data) throw { msg : `empty data` }

            for (let datas of data) {
                let payload = {
                    id : datas.dataValues.id,
                    title : datas.dataValues.title,
                    description : datas.dataValues.description,
                    status : datas.dataValues.status,
                    due_date : moment(datas.dataValues.due_date).format('dddd, DD MMMM YYYY')
                }
                todo.push(payload)
            };

            res.status(200).json({
                msg : `list todo`,
                data : todo
            })
        } catch (error) {
            next(error)
        }
    };

    static async getOneTodo (req, res, next) {
        try {
            let id = req.params.id;

            const data = await Todo.findByPk(id);
            if(!data) throw { msg : `data not found` }
            else if (Object.keys(data).length === 0) {
                throw { msg : `empty data` }
            };

            let payload = {
                title : data.title,
                description : data.description,
                status : data.status,
                due_date : moment(data.due_date).format('yyyy-MM-DD')
            };

            res.status(200).json({
                msg : `todo by id ${id}`,
                data : payload
            })
        } catch (error) {
            next(error)
        }
    }

    static async addTodo (req, res, next) {
        try {
            let bodyTodo = {
                title : req.body.title,
                description : req.body.description,
                due_date : req.body.due_date,
                status : false,
                userId : req.userData.id
            };
            
            if(moment(bodyTodo.due_date) < moment()) throw { msg : `date is outdate from now`, name : `expiredDate`}

            const data = await Todo.create(bodyTodo);
            res.status(201).json({
                msg : `added data success`,
                data
            })
        } catch (error) {
            next(error)
        }
    };

    static async editTodo (req, res, next) {
        try {
            let id = req.params.id;
            let bodyTodo = {
                title : req.body.title,
                description : req.body.description,
                status : req.body.status,
                due_date : req.body.due_date
            };

            if(moment(bodyTodo.due_date) < moment()) throw { msg : `date is outdate from now`, name : `expiredDate`}

            const data = await Todo.findByPk(id);
            if(!data) throw { msg : `data not found` };
            else {
                const dataUpdate = await Todo.update(bodyTodo, { where : { id }})
            };
            const dataShow = await Todo.findByPk(id);
            res.status(201).json({ 
                msg : `updated data success`,
                dataShow
            })
        } catch (error) {
            next(error)
        }
    };

    static async deleteTodo (req, res, next) {
        try {
            let id = req.params.id;
    
            const data = await Todo.findByPk(id);
            if(!data) throw { msg : `data not found` }
            else {
                data.destroy()
                res.status(201).json({
                    msg : `data success deleted`
                })
            }
        } catch (error) {
            next(error)
        };
    };
};

module.exports = TodoController;