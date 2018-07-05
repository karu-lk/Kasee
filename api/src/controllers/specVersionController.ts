import { Request, Response, Router } from 'express';
import SpecificationVersion from '../models/SpecificationVersion';

export class SpecVersionController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    // get all of the posts in the database
    public getAllSpecificationVersions(req: Request, res: Response): void {
        SpecificationVersion.find()
            .then((result) => {
                res.status(200).json({ result });
            })
            .catch((error) => {
                res.json({ error });
            });
    }

    // get a single post by params of 'slug'
    public getSpecificationVersionByVersionNumber(req: Request, res: Response): void {
        const versionNumber: string = req.params.versionnumber;

        SpecificationVersion.findOne({ specificationVersionNumber: versionNumber })
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // get a single post by params of 'slug'
    public getSpecificationVersionByCustomerAndVersion(req: Request, res: Response): void {
        const customerNumber: string = req.params.customerNumber;
        const versionNumber: string = req.params.versionNumber;

        SpecificationVersion.findOne({ customerNumber: customerNumber, specificationVersionNumber: versionNumber })
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // get a single post by params of 'slug'
    public getSpecificationVersionByCustomer(req: Request, res: Response): void {
        const customerNumber: string = req.params['customernumber'];

        SpecificationVersion.find({ customerNumber: customerNumber })
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // get a single post by params of 'slug'
    public getMaxSpecificationVersionByCustomer(req: Request, res: Response): void {
        const customerNumber: string = req.params.customernumber;

        SpecificationVersion.findOne({ customerNumber: customerNumber })
            .sort({ specificationVersionNumber: -1 })
            .then((data) => {
                if (data) {
                    res.status(200).json({ data });
                }
                else {
                    let data = {
                        customerNumber: null,
                        specificationVersionNumber: 0,
                        specificationVersionName: null
                    }
                    res.status(200).json({ data });
                }
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // create a new post
    public addNewSpecificationVersion(req: Request, res: Response): void {
        const customerNumber: string = req.body.customerNumber; //customerName's value is customerNumber
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

        newSpecVersion.save()
            .then((data) => {
                res.status(201).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // update post by params of 'slug'
    public updateSpecificationVersion(req: Request, res: Response): void {
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
    public deleteSpecificationVersion(req: Request, res: Response): void {
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
        this.router.get('/', this.getAllSpecificationVersions);
        this.router.get('/:customernumber', this.getSpecificationVersionByCustomer);
        this.router.get('/byversionnumber/:versionnumber', this.getSpecificationVersionByVersionNumber);
        this.router.get('/customer/:customerNumber/version/:versionNumber', this.getSpecificationVersionByCustomerAndVersion);
        this.router.get('/getmax/:customernumber', this.getMaxSpecificationVersionByCustomer);
        this.router.post('/', this.addNewSpecificationVersion);
        this.router.put('/:customernumber', this.updateSpecificationVersion);
        this.router.delete('/:customernumber', this.deleteSpecificationVersion);
    }
}

const specVersionController = new SpecVersionController();
specVersionController.routes();

export default specVersionController.router;