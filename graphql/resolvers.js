const { User, Message } = require('../models'); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/env.json");
const { Op } = require("sequelize");
const { UserInputError, AuthenticationError } = require("apollo-server");

module.exports = {
    Query: {
        getUsers: async (parent, args, { user }) => {
            try {
                if(!user) throw new AuthenticationError("Unauthenticated!");
                const users = await User.findAll({
                    where: { username: { [Op.ne]: user.username }}
                });
                return users;
            } catch (error) {
                console.log(error);
                throw error;
            }
        },
        login: async (parent, args) => {
            let { username, password } = args;
            let errors = {};
            try {
                if (username.trim() === '') errors.username = "Username must not be empty";
                if (password.trim() === '') errors.password = "Password must not be empty";
                
                if (Object.keys(errors).length > 0) {
                    throw new UserInputError("user not found", { errors });
                }

                const user = await User.findOne({ where: { username } });
                if (!user) {
                    errors.username = "User not found";
                    throw new UserInputError("user not found", { errors });
                }
                
                const correctPassword = await bcrypt.compare(password, user.password);
                if (!correctPassword) {
                    errors.password = "Password is incorrect";
                    throw new UserInputError("password is incorrect", { errors });
                }

                const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

                return {
                    ...user.toJSON(),
                    createdAt: user.createdAt.toISOString(),
                    token
                };
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    },
    Mutation: {
        register: async (parent, args) => {
            let { username, email, password, confirmPassword } = args;
            let errors = {};
            try {
                if (email.trim() === '') errors.email = "Email must not be empty";
                if (username.trim() === '') errors.username = "Username must not be empty";
                if (password.trim() === '') errors.password = "Password must not be empty";
                if (confirmPassword.trim() === '') errors.confirmPassword = "Confirm password must not be empty";
                if(password !== confirmPassword) errors.confirmPassword = "Password must match";

                if(Object.keys(errors).length > 0){
                    throw errors;
                }

                password = await bcrypt.hash(password, 6);
                
                const user = await User.create({
                    username, email, password
                });
                return user;
            } catch (error) {
                console.log(error);
                if(error.name === "SequelizeUniqueConstraintError"){
                    error.errors.forEach((e) => (errors[e.path] = `${e.path} is already taken`));
                } else if(error.name === "SequelizeValidationError"){
                    error.errors.forEach((e) => (errors[e.path] = e.message));
                }
                throw new UserInputError('Error', { errors });
            }
        },
        sendMessage: async (parent, { to, content }, { user }) => {
            try {
                if(!user) throw new AuthenticationError("Unauthenticated!");
                const recipient = await User.findOne({ where: { username: to }});
                if(!recipient) throw new UserInputError("User not found");
                if(content.trim() === ''){
                    throw new UserInputError("Message is empty");
                }
                const message = await Message.create({
                    from: user.username,
                    to,
                    content
                });
                return message;
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    }
};