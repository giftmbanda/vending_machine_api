import cors from "cors";
import express, { Application, Request, Response } from 'express';
import router from './routes/productRoute';
import JSONResponse from './utils/JSONResponse';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.app.use(cors()); // enable all CORS 
        this.app.use(express.json()); // parse incoming requests with JSON payloads
        this.loadRoutes();
    }

    private loadRoutes(): void {

        // handle routes
        this.app.use('/', router);

        // handle non-existence routes
        this.app.use('*', (req: Request, res: Response) => {
            JSONResponse.notFound(res, 'Page not found')
        });

        // handle server error
        this.app.use((req: Request, res: Response) => {
            const error: Error = new Error();
            JSONResponse.serverError(res, error.message);
        });
    }
}

export default new App().app;
