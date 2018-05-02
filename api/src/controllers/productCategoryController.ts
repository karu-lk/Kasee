import { Request, Response, Router } from 'express';
import ProductCategory from '../models/ProductCategory';

export class ProductCategoryController {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public all(req: Request, res: Response): void {
        ProductCategory.find()
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.json({ error });
            });
    }

    public one(req: Request, res: Response): void {
        const categoryName: string = req.params.categoryName;

        ProductCategory.findOne({ categoryName })
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // create a new post
    public create(req: Request, res: Response): void {
        const id: number = req.body.productCategoryId;
        const categoryName: string = req.body.categoryName;
        const description: string = req.body.description;

        if (!id || !categoryName) {
            res.status(422).json({ message: 'Missing required fields.' + JSON.stringify(req.body) });
        }

        const newProductCategory = new ProductCategory({
            id,
            categoryName,
            description
        });

        newProductCategory.save()
            .then((data) => {
                res.status(201).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // update post by params of 'slug'
    public update(req: Request, res: Response): void {
        const categoryName: string = req.params.categoryName;

        console.log(`key is ${categoryName}`);
        ProductCategory.findOneAndUpdate({ categoryName  }, req.body)
            .then((data) => {
                res.status(200).json({ data });
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    // delete post by params of 'slug'
    public delete(req: Request, res: Response): void {
        const categoryName: string = req.params.categoryName;

        ProductCategory.findOneAndRemove({ categoryName })
            .then(() => {
                res.status(204).end();
            })
            .catch((error) => {
                res.status(500).json({ error });
            });
    }

    public routes() {
        this.router.get('/', this.all);
        this.router.get('/:categoryName', this.one);
        this.router.post('/', this.create);
        this.router.put('/:categoryName', this.update);
        this.router.delete('/:categoryName', this.delete);
    }
}

const productCategoryController = new ProductCategoryController();
productCategoryController.routes();

export default productCategoryController.router;