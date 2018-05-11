import { Request, Response, Router } from 'express';
import Product from '../models/Customer';
import Customer from '../models/Customer';

export class CustomerController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    // get all of the posts in the database
    public all(req: Request, res: Response): void {
        Product.find()
            .then((result) => {
                console.log(result);
                res.status(200).json({ result });
            })
            .catch((error) => {
                res.json({ error });
            });
    }

    // get a single post by params of 'slug'
    public one(req: Request, res: Response): void {
        const customerNumber: string = req.params.customerNumber;

        Customer.findOne({ customerNumber })
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // create a new post
    public create(req: Request, res: Response): void {
        const customerNumber: string = req.body.customerNumber;
        const firstName: string = req.body.firstName;
        const lastName: string = req.body.lastName;
        const email: string = req.body.email;
        const mobileNumber: string = req.body.mobileNumber;
        const identificationComment: string = req.body.identificationComment;

        if (!customerNumber || !firstName || !lastName) {
            res.status(422).json({ message: 'Required fields missing.' });
        }

        const newCustomer = new Customer({
            customerNumber,
            firstName,
            lastName,
            email,
            mobileNumber,
            identificationComment
        });

        newCustomer.save()
            .then((data) => {
                res.status(201).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // update post by params of 'slug'
    public update(req: Request, res: Response): void {
        const customerNumber: number = req.body.customerNumber;

        Customer.findOneAndUpdate({ customerNumber }, req.body)
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // delete post by params of 'slug'
    public delete(req: Request, res: Response): void {
        const customerNumber: number = req.body.customerNumber;

        Customer.findOneAndRemove({ customerNumber })
            .then(() => {
                res.status(204).end();
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    public routes() {
        this.router.get('/', this.all);
        this.router.get('/:customernumber', this.one);
        this.router.post('/', this.create);
        this.router.put('/:customernumber', this.update);
        this.router.delete('/:customernumber', this.delete);
    }
}

const customerController = new CustomerController();
customerController.routes();

export default customerController.router;