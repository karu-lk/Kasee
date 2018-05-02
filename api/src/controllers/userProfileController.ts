import { Request, Response, Router } from 'express';
import { Types } from 'mongoose';
import UserProfile from '../models/UserProfile';
import { json } from 'body-parser';
import * as nodemailer from 'nodemailer';//'./../../node_modules/nodemailer';
import { resolve } from 'url';
import * as moment from 'moment';

export class UserProfileController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public all(req: Request, res: Response): void {
        UserProfile.find()
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.json({ error });
            });
    }

    public one(req: Request, res: Response): void {
        const id: string = req.params.userId;

        UserProfile.findOne({ id })
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // create a new post
    public create(req: Request, res: Response): void {
        const id: string = req.body.userId;
        const userIdToken: string = req.body.userIdToken;
        const authToken: string = req.body.authToken;
        const userEmail: string = req.body.userEmail;
        const userPic: string = req.body.userPic;
        const userFullName: string = req.body.userFullName;
        const authProvider: string = req.body.authProvider;
        const userStatus: string = 'pending';
        const lastModifiedTime: Date = req.body.lastModifiedTime;

        if (!id || !userFullName || !authToken) {
            res.status(422).json({ message: 'Missing required fields.' });
        }

        let newUserPin = userPin();

        const newUserProfile = new UserProfile({
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
                    res.status(201).json({ "userId": newProfileResult._id })
                }, sendMailError => {
                    res.status(500).json({ sendMailError })
                })
            }, newProfileError => {
                res.status(500).json({ newProfileError })
            })
    }

    // update post by params of 'slug'
    public update(req: Request, res: Response): void {
        const id: string = req.params.userId;

        UserProfile.findOneAndUpdate({ id }, req.body)
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // delete post by params of 'slug'
    public delete(req: Request, res: Response): void {
        const id: string = req.params.userId;

        UserProfile.findOneAndRemove({ id })
            .then(() => {
                res.status(204).end();
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    public verifyUserPin(req: Request, res: Response): void {
        const id: string = req.body.userId;
        const newUserPin: string = req.body.newUserPin;
        UserProfile.where('_id', Types.ObjectId(id)).where('newUserPin', newUserPin).exec((findUserProfileError, findUserProfileData) => {
            if (findUserProfileError) {
                res.status(500).json({ findUserProfileError });
            }
            else if (findUserProfileData.length <= 0) {
                res.status(404).json({ message: "Unable to find the user profile" });
            }
            else {
                console.log('--- ' + JSON.stringify(findUserProfileData));
                updateUserVerificationFalg(Types.ObjectId(id)).then(updateUserVerificationFalgResult => {
                    res.status(200).json({ updateUserVerificationFalgResult });
                }, (updateUserVerificationFalgError => {
                    res.status(500).json({ updateUserVerificationFalgError });
                })
                );
            }
        });
    }

    public routes() {
        this.router.get('/', this.all);
        this.router.get('/:userId', this.one);
        this.router.post('/', this.create);
        this.router.put('/:userId', this.update);
        this.router.delete('/:userId', this.delete);
        this.router.post('/verify', this.verifyUserPin);
    }
}

function sendMailMock(newProfileResult, newUserPin) {
    console.log(JSON.stringify(newProfileResult));

    return new Promise((resolve, reject) => {
        resolve({ status: 200, message: 'Successfully sent the email notification' });
    });
}

function sendMail(newProfileResult, newUserPin) {
    console.log(JSON.stringify(newProfileResult));

    return new Promise((resolve, reject) => {
        var transporter: nodemailer.Transporter = nodemailer.createTransport({
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

        var mailOptions: nodemailer.SendMailOptions = {
            from: 'IATA, lilupa.karu.iata@gmail.com', // sender address
            to: newProfileResult.userEmail,
            subject: 'Welcome to Nelly Bee, confirm your email address and get started!',
            text: 'Hello world', // plaintext body
            html: emailBody
        };

        transporter.sendMail(mailOptions,
            function (error, info) {
                if (error) {
                    console.log(error);
                    reject(error);
                    //res.status(500).json({ message: error });
                } else {
                    console.log('Message sent: ' + info.response);
                    //res.status(200).json({ message: 'Successfully sent the email notification', data: info.response });
                    resolve(info.response);
                };
            });
    });
}

function updateUserVerificationFalg(userId) {
    return new Promise((resolve, reject) => {
        let updatedValue = { "userStatus": "verified", "lastModifiedTime": moment() }
        UserProfile.findOneAndUpdate({ '_id': Types.ObjectId(userId) }, updatedValue)
            .then((data) => {
                console.log('--- flag updated');
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function userPin(): number {
    let lowNumber = 111111;
    let highNumber = 999999;
    let pin = Math.random() * (highNumber - lowNumber) + lowNumber;
    return Number(pin.toString().split('.')[0]);
}

const userProfileController = new UserProfileController();
userProfileController.routes();

export default userProfileController.router;