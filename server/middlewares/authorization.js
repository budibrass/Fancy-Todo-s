const { Todo } = require("../models");

async function authorization(req, res, next) {
    try {
        let id = req.params.id;

        const data = await Todo.findByPk(id)
        console.log(data.id, `<<<<<<<<< data `);
        console.log(req.userData.id, `<<<<<<<<< userData `);
        if(!data) throw { msg : `data not found`}
        else {
            if(data.userId === req.userData.id) next()
            else throw { msg : `you are not authorize` }
        }
    } catch (error) {
        console.log(error, `<<<<<<<<<< error authorization`);
        let err = error.msg || `internal server error`;
        res.status(500).json({ msg : err })
    }
};

module.exports = authorization;