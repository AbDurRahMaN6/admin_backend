import { db } from '../../../models';
import config from '../../../config';
import bcrypt from 'bcrypt-nodejs';





export default {

    async register(req, res, next) {
        const {firstName, lastName, email, password} = req.body;
        var passwordHash = bcrypt.hashSync(password);
        db.User.findOne({ where: { email: email }, paranoid: false })
            .then(find => {
                if (find) {
                    throw new RequestError('Email is already in use', 409);
                }
                return db.User.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: passwordHash
                })
            })
            .then(user => {
                if(user) {
                    return res.status(200).json({ success: true, msg: "New Registration added"});
                }
                else res.status(500).json({ 'success': false });
            })
            .catch(err => {
                console.log(err)
                next(err);
            })
    },

    async login(req, res, next) {
        var date = new Date();
        res.cookie('XSRF-token',     token, {
            expire: new Date().setMinutes(date.getMinutes() + 30),
            httpOnly: true, secure: config.app.secure
        });
        
        return res.status(200).json({ success: true ,token,role: req.user.role});
    },

}




