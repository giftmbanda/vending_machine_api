import express, { Application } from 'express';

class Server {
  private app: Application;
  private port: string | number;

  constructor(port?: string | number) {
    this.app = express();
    this.port = process.env.PORT || port || 4000;
    this.listenToPort(this.port);
  }

  private listenToPort(port: string | number): void {
    this.app.listen(port, () => {
      console.log(`App running on http://localhost:${port}`);
    });
  }
}

const server = new Server();
