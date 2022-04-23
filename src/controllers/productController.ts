import { Request, Response } from 'express';
import IProduct from '../interfaces/IProduct'; // Product interface 
import Coin from '../models/coinModel'; // Coin model
import Products from '../models/productModel'; // Product model
import JSONResponse from '../utils/JSONResponse'; // http response


const purchaseProduct = async (req: Request, res: Response) => {

    const productId: number = Number(req.body.productId); // get product id from request body
    const insertedCoin: number = new Coin(req.body).getTotalAmount(); // get total sum of inserted coins from request body
    const product: IProduct | undefined = Products.find((product: IProduct) => product.id === productId); // get product by product id

    if (!product) // check if product location exist
        return JSONResponse.success(res, `Sorry product location does not exist. Enter the correct product location.`);

    if (product.quantity < 1) // check if product has stock
        return JSONResponse.success(res, `Sorry, we are out of stock, returning R: ${insertedCoin}.`);

    const change: number = insertedCoin - product.price; // calculate the change

    if (change < 0) // check if there's sufficient funds to purchase
        return JSONResponse.success(res, `Sorry, you have insufficient funds, returning R: ${insertedCoin}.`);

    product.quantity -= 1; // update product quantity
    return JSONResponse.success(res, `Dispensing ${product.name}, your change is R: ${change}.`);
}

const getAllProducts = async (req: Request, res: Response) => {
    if (!Products) // check if products exist
        return JSONResponse.success(res, `Products do not exist.`);
    return JSONResponse.success(res, `Showing list of all products`, Products);
};

export = { purchaseProduct, getAllProducts };
