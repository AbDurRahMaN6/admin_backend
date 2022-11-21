import data from '../../../config';
import { db } from '../../../models';
const { Op } = require("sequelize");

export default {

    async index(req, res, next) {
        const { name, slug } = req.body;
        db.category.findOne({ where: {name: name } })
            .then(data => {
                if (data) {
                    return db.category.update( { slug: slug }, { where: { id: data.id } })
                }
                return db.category.create({ name: name, slug: slug })
            })
            .then(category => {
                res.status(200).json({ 'succees': true, msg: "Successfully inserted catagory"});
            })
            .catch(function (err) {
                console.log(err)
                next(err)
            })
    },

    async mainList(req, res, next) {
        db.category.findAll()
            .then(category => {
                res.status(200).json({ 'succees': true, data: category});
            })
            .catch(function (err) {
                console.log(err)
                next(err)
            })
    }
}


