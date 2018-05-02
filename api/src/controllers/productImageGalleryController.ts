import { Request, Response, Router } from 'express';
import ProductImageGallery from '../models/ProductImageGallery';

export class ProductImageGalleryController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public all(req: Request, res: Response): void {
        ProductImageGallery.find()
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.json({ error });
            });
    }

    public one(req: Request, res: Response): void {
        const id: string = req.params.imageId;

        ProductImageGallery.findOne({ id })
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // create a new post
    public create(req: Request, res: Response): void {
        const id: number = req.body.imageId;
        const imageSequenceNo: number = req.body.imageSequenceNo;
        const imagePath: string = req.body.imagePath;
        const description: string = req.body.description;

        if (!id || !imagePath) {
            res.status(422).json({ message: 'Missing required fields.' });
        }

        const newProductImageGallery = new ProductImageGallery({
            id,
            imageSequenceNo,
            imagePath,
            description
        });

        newProductImageGallery.save()
            .then((data) => {
                res.status(201).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // update post by params of 'slug'
    public update(req: Request, res: Response): void {
        const id: string = req.params.imageId;

        ProductImageGallery.findOneAndUpdate({ id }, req.body)
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // delete post by params of 'slug'
    public delete(req: Request, res: Response): void {
        const id: string = req.params.imageId;

        ProductImageGallery.findOneAndRemove({ id })
            .then(() => {
                res.status(204).end();
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    public routes() {
        this.router.get('/', this.all);
        this.router.get('/:imageId', this.one);
        this.router.post('/', this.create);
        this.router.put('/:imageId', this.update);
        this.router.delete('/:imageId', this.delete);
    }
}

const productImageGalleryController = new ProductImageGalleryController();
productImageGalleryController.routes();

export default productImageGalleryController.router;