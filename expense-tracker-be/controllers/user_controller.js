const Joi = require("joi")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("../models/UserModel")


const userControllers = {
    register: async (req, res) => {
        const data = req.body

        const validationSchema = Joi.object({
            name: Joi.string().min(3).max(100).required(),
            email: Joi.string().min(3).email().required(), //.email() will check for the basic email syntax that includes the @ symbol
            password: Joi.string().min(6).required(), // considering if we should use joi-password npm package
        })

        const validationResult = validationSchema.validate(data) //validate the data that the user keyed in against the schema
        if (validationResult.error) {
            res.statusCode = 400

            return res.json({
                msg: validationResult.error.details[0].message
            })
        }

        // search for any existing user with same email,
        // return err if so
        try {
            const user = await userModel.findOne({email: data.email})
            if (user) {
                res.statusCode = 400
                return res.json({
                    msg: "Email has been registered previously"
                })
            }
        } catch(err) {
            res.statusCode = 500
            return res.json({
                msg: "Failed to check for duplicates"
            })
        }

        // apply hashing algo (bcrypt) to the given password
        // -> pw hash -> goes into DB
        const hash = await bcrypt.hash(data.password, 10)

        // use user model to create a new user
        try {
            await userModel.create({
                name: data.name,
                email: data.email,
                password: hash,
            })
        } catch(err) {
            res.statusCode = 500
            return res.json({
                msg: "Failed to create user"
            })
        }
        
        // return response
        res.json({
            msg: "User created successfully"
        })
    },
    // login: async (req,res) => {

    // }
}

module.exports = userControllers