import { Request, Response, Router } from 'express';
import SpecificationVersion from '../models/SpecificationVersion';

export class SpecVersionController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    // get all of the posts in the database
    public all(req: Request, res: Response): void {
        SpecificationVersion.find()
            .then((result) => {
                res.status(200).json({ result });
            })
            .catch((error) => {
                res.json({ error });
            });
    }

    // get a single post by params of 'slug'
    public one(req: Request, res: Response): void {
        const customerNumber: string = req.params['customernumber'];
        const specificationVersionNumber: number = req.params['specificationVersionNumber'];

        SpecificationVersion.findOne({ customerNumber: customerNumber, specificationVersionNumber: specificationVersionNumber })
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // get a single post by params of 'slug'
    public maxVersionByCustomer(req: Request, res: Response): void {
        const customerNumber: string = req.params.customernumber;

        SpecificationVersion.findOne({ customerNumber: customerNumber })
            .sort({ specificationVersionNumber: -1 })
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // create a new post
    public create(req: Request, res: Response): void {
        const customerNumber: string = req.body.customerName; //customerName's value is customerNumber
        const specificationVersionNumber: number = req.body.specVersionNumber;
        const specificationVersionName: number = req.body.specVersionName;

        if (!customerNumber || !specificationVersionNumber) {
            res.status(422).json({ message: 'Required fields missing.' });
        }

        const newSpecVersion = new SpecificationVersion({
            customerNumber,
            specificationVersionNumber,
            specificationVersionName
        });

        console.error('at create', newSpecVersion);
        newSpecVersion.save()
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
        const specificationVersionNumber: number = req.body.specificationVersionNumber;

        SpecificationVersion.findOneAndUpdate({ customerNumber }, req.body)
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // delete post by params of 'slug'
    public delete(req: Request, res: Response): void {
        const customerNumber: string = req.params['customernumber'];
        const specificationVersionNumber: number = req.params['specificationVersionNumber'];

        SpecificationVersion.findOneAndRemove({ customerNumber: customerNumber })
            .then(() => {
                res.status(200).end();
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    public routes() {
        this.router.get('/', this.all);
        //this.router.get('/:customernumber/:specificationVersionNumber', this.one);
        this.router.get('/getmax/:customernumber', this.maxVersionByCustomer);
        this.router.post('/', this.create);
        this.router.put('/:customernumber', this.update);
        this.router.delete('/:customernumber', this.delete);
    }
}

const specVersionController = new SpecVersionController();
specVersionController.routes();

export default specVersionController.router;