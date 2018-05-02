"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const UserProfile_1 = require("../models/UserProfile");
const nodemailer = require("nodemailer"); //'./../../node_modules/nodemailer';
const moment = require("moment");
class UserProfileController {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    all(req, res) {
        UserProfile_1.default.find()
            .then((data) => {
            res.status(200).json({ data });
        })
            .catch((error) => {
            res.json({ error });
        });
    }
    one(req, res) {
        const id = req.params.userId;
        UserProfile_1.default.findOne({ id })
            .then((data) => {
            res.status(200).json({ data });
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    // create a new post
    create(req, res) {
        const id = req.body.userId;
        const userIdToken = req.body.userIdToken;
        const authToken = req.body.authToken;
        const userEmail = req.body.userEmail;
        const userPic = req.body.userPic;
        const userFullName = req.body.userFullName;
        const authProvider = req.body.authProvider;
        const userStatus = 'pending';
        const lastModifiedTime = req.body.lastModifiedTime;
        if (!id || !userFullName || !authToken) {
            res.status(422).json({ message: 'Missing required fields.' });
        }
        let newUserPin = userPin();
        const newUserProfile = new UserProfile_1.default({
            id,
            userIdToken,
            authToken,
            userEmail,
            userPic,
            userFullName,
            authProvider,
            userStatus,
            newUserPin,
            lastModifiedTime
        });
        newUserProfile.save()
            .then((newProfileResult) => {
            sendMail(newProfileResult, newUserPin).then((sendMailResult) => {
                //sendMailMock(newProfileResult, newUserPin).then((sendMailResult) => {
                res.status(201).json({ "userId": newProfileResult._id });
            }, sendMailError => {
                res.status(500).json({ sendMailError });
            });
        }, newProfileError => {
            res.status(500).json({ newProfileError });
        });
    }
    // update post by params of 'slug'
    update(req, res) {
        const id = req.params.userId;
        UserProfile_1.default.findOneAndUpdate({ id }, req.body)
            .then((data) => {
            res.status(200).json({ data });
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    // delete post by params of 'slug'
    delete(req, res) {
        const id = req.params.userId;
        UserProfile_1.default.findOneAndRemove({ id })
            .then(() => {
            res.status(204).end();
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    verifyUserPin(req, res) {
        const id = req.body.userId;
        const newUserPin = req.body.newUserPin;
        UserProfile_1.default.where('_id', mongoose_1.Types.ObjectId(id)).where('newUserPin', newUserPin).exec((findUserProfileError, findUserProfileData) => {
            if (findUserProfileError) {
                res.status(500).json({ findUserProfileError });
            }
            else if (findUserProfileData.length <= 0) {
                res.status(404).json({ message: "Unable to find the user profile" });
            }
            else {
                console.log('--- ' + JSON.stringify(findUserProfileData));
                updateUserVerificationFalg(mongoose_1.Types.ObjectId(id)).then(updateUserVerificationFalgResult => {
                    res.status(200).json({ updateUserVerificationFalgResult });
                }, (updateUserVerificationFalgError => {
                    res.status(500).json({ updateUserVerificationFalgError });
                }));
            }
        });
    }
    routes() {
        this.router.get('/', this.all);
        this.router.get('/:userId', this.one);
        this.router.post('/', this.create);
        this.router.put('/:userId', this.update);
        this.router.delete('/:userId', this.delete);
        this.router.post('/verify', this.verifyUserPin);
    }
}
exports.UserProfileController = UserProfileController;
function sendMailMock(newProfileResult, newUserPin) {
    console.log(JSON.stringify(newProfileResult));
    return new Promise((resolve, reject) => {
        resolve({ status: 200, message: 'Successfully sent the email notification' });
    });
}
function sendMail(newProfileResult, newUserPin) {
    console.log(JSON.stringify(newProfileResult));
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'lilupa.karu.iata@gmail.com',
                pass: 'illBan#1Alien1Day4Sure'
            }
        });
        transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'lilupa.karu.iata@gmail.com',
                pass: 'illBan#1Alien1Day4Sure'
            }
        }, {
            from: 'lilupa.karu.iata@gmail.com',
            headers: {
                'My-Awesome-Header': '123'
            }
        });
        let submitHtml = `<a href="http://localhost:3000/user-verification?verificationToken=${newProfileResult._id}" 
        target="_blank" rel="noopener noreferrer" 
        style="border-radius: 5px;
        font-size: 20px;
        padding: 14px 80px;
        cursor: pointer;
        color: #fff;
        background-color: #00A6FF;
        font-size: 1.5rem;
        font-family: 'Roboto';
        font-weight: 100;
        border: 1px solid #fff;
        box-shadow: 2px 2px 5px #AFE9FF;
        transition-duration: 0.5s;
        -webkit-transition-duration: 0.5s;
        -moz-transition-duration: 0.5s;">Confirm my email address</a>`;
        let emailBody;
        emailBody = `Welcome to <b>Nelly Bee!</b> Please confirm your email address to get started.
            It’s important to do this now, or we won’t be able to reset your password if you ever forget.
            Please click on email confirmation button below and enter the pin number.
            Your pin is ${newUserPin}
            ${submitHtml}`;
        var mailOptions = {
            from: 'IATA, lilupa.karu.iata@gmail.com',
            to: newProfileResult.userEmail,
            subject: 'Welcome to Nelly Bee, confirm your email address and get started!',
            text: 'Hello world',
            html: emailBody
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                reject(error);
                //res.status(500).json({ message: error });
            }
            else {
                console.log('Message sent: ' + info.response);
                //res.status(200).json({ message: 'Successfully sent the email notification', data: info.response });
                resolve(info.response);
            }
            ;
        });
    });
}
function updateUserVerificationFalg(userId) {
    return new Promise((resolve, reject) => {
        let updatedValue = { "userStatus": "verified", "lastModifiedTime": moment() };
        UserProfile_1.default.findOneAndUpdate({ '_id': mongoose_1.Types.ObjectId(userId) }, updatedValue)
            .then((data) => {
            console.log('--- flag updated');
            resolve(data);
        })
            .catch((error) => {
            reject(error);
        });
    });
}
function userPin() {
    let lowNumber = 111111;
    let highNumber = 999999;
    let pin = Math.random() * (highNumber - lowNumber) + lowNumber;
    return Number(pin.toString().split('.')[0]);
}
const userProfileController = new UserProfileController();
userProfileController.routes();
exports.default = userProfileController.router;
//# sourceMappingURL=userProfileController.js.map