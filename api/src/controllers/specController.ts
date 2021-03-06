import { Request, Response, Router } from 'express';
import Specification from '../models/Specification';

export class SpecController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    // get all of the posts in the database
    public getAllSpecifications(req: Request, res: Response): void {
        Specification.find()
            .then((result) => {
                res.status(200).json({ result });
            })
            .catch((error) => {
                res.json({ error });
            });
    }

    // get a single post by params of 'slug'
    public getSpecificationByCustomerAndVersion(req: Request, res: Response): void {
        const customerNumber: string = req.params['customerNumber'];
        const specificationVersionNumber: string = req.params['versionNumber'];

        Specification.findOne({ customerNumber, specificationVersionNumber })
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // create a new post
    public addNewSpecification(req: Request, res: Response): void {
        const customerNumber: string = req.body.customerName; //customerName's value is customerNumber
        const specificationVersionNumber: number = req.body.specVersionName; //spec version number is specVersionName in body object
        const shoulder: number = req.body.shoulder;
        const shoulderToBust:number=req.body.shoulderToBust;
        const shoulderToWaist: number = req.body.shoulderToWaist;
        const shoulderToBracut: number = req.body.shoulderToBracut;
        const bust: number = req.body.bust;
        const blouseWaist: number = req.body.blouseWaist;
        const bracut: number = req.body.bracut;
        const frontNeck: number = req.body.frontNeck;
        const backNeck: number = req.body.backNeck;
        const lengthBack: number = req.body.lengthBack;
        const sleaveLength: number = req.body.sleaveLength;
        const sleaveWidth: number = req.body.sleaveWidth;
        const armCut: number = req.body.armCut;
        const armPit: number = req.body.armPit;
        const underskirtWaist: number = req.body.underskirtWaist;
        const underskirtHip: number = req.body.underskirtHip;
        const underskirtLength: number = req.body.underskirtLength;

        if (!customerNumber) {
            res.status(422).json({ message: 'Required fields missing.' });
        }

        const newSpec = new Specification({
            customerNumber,
            specificationVersionNumber,
            shoulder,
            shoulderToBust,
            shoulderToWaist,
            shoulderToBracut,
            bust,
            blouseWaist,
            bracut,
            frontNeck,
            backNeck,
            lengthBack,
            sleaveLength,
            sleaveWidth,
            armCut,
            armPit,
            underskirtWaist,
            underskirtHip,
            underskirtLength,
        });

        newSpec.save()
            .then((data) => {
                res.status(201).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // update post by params of 'slug'
    public updateSpecification(req: Request, res: Response): void {
        const customerNumber: number = req.body.customerNumber;

        Specification.findOneAndUpdate({ customerNumber }, req.body)
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // delete post by params of 'slug'
    public deleteSpecification(req: Request, res: Response): void {
        const customerNumber: string = req.params['customernumber'];

        Specification.findOneAndRemove({ customerNumber: customerNumber })
            .then(() => {
                res.status(200).end();
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    public routes() {
        this.router.get('/', this.getAllSpecifications);
        this.router.get('/customer/:customerNumber/version/:versionNumber', this.getSpecificationByCustomerAndVersion);
        this.router.post('/', this.addNewSpecification);
        this.router.put('/:customernumber', this.updateSpecification);
        this.router.delete('/:customernumber', this.deleteSpecification);
    }
}

const specController = new SpecController();
specController.routes();

export default specController.router;