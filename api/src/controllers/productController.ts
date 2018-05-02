import { Request, Response, Router } from 'express';
import Product from '../models/Product';

export class ProductController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    // get all of the posts in the database
    public all(req: Request, res: Response): void {
        Product.find()
            .then((data) => {
                
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.json({ error });
            });
    }

    // get a single post by params of 'slug'
    public one(req: Request, res: Response): void {
        const sku: string = req.params.sku;

        Product.findOne({ sku })
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // create a new post
    public create(req: Request, res: Response): void {
        const id: number = req.body.productId;
        const sku: string = req.body.sku;
        const productName: string = req.body.productName;
        const description: string = req.body.description;
        const productCategory: string = req.body.productCategory;

        if (!id || !sku || !productName || description || productCategory) {
            res.status(422).json({ message: 'All Fields Required.' });
        }

        const newProduct = new Product({
            id,
            sku,
            productName,
            description,
            productCategory
        });

        newProduct.save()
            .then((data) => {
                res.status(201).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // update post by params of 'slug'
    public update(req: Request, res: Response): void {
        const sku: string = req.body.sku;

        Product.findOneAndUpdate({ sku  }, req.body)
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // delete post by params of 'slug'
    public delete(req: Request, res: Response): void {
        const sku: string = req.body.sku;

        Product.findOneAndRemove({ sku })
            .then(() => {
                res.status(204).end();
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    public routes() {
        this.router.get('/', this.all);
        this.router.get('/:sku', this.one);
        this.router.post('/', this.create);
        this.router.put('/:sku', this.update);
        this.router.delete('/:sku', this.delete);
    }
}

const productController = new ProductController();
productController.routes();

export default productController.router;