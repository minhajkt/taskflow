import express, {Request, Response} from "express";
import {Database} from './database'
import bodyParser from "body-parser";
import path from "path";

export class App {
  private app: express.Application;
  private port: number;
  private db: Database;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.db = new Database();
    this.configureMiddleware();
    this.configureRoutes();
    this.configureViews();
  }

  private configureMiddleware() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.static("public"));
  }

  private configureViews() {
    this.app.set("views", path.join(__dirname, "views"));
    this.app.set("view engine", "ejs");
  }

  private configureRoutes() {
    this.app.get("/", this.getItems.bind(this));
    this.app.post("/add", this.addItem.bind(this));
    this.app.post("/edit", this.editItem.bind(this));
    this.app.post("/delete", this.deleteItem.bind(this));
  }

  private async getItems(req: Request, res: Response): Promise<void> {
    try {
      const items = await this.db.getItems();
      res.render("index.ejs", { listTitle: "Today", listItems: items });
    } catch (error) {
      console.log((error as Error).message);
      res.status(500).send("Internal Server Error");
    }
  }

  private async addItem(req: Request, res: Response): Promise<void> {
    try {
      const itemTitle:string = req.body.newItem;
      await this.db.addItem(itemTitle);
      res.redirect("/");
    } catch (error) {
      console.log((error as Error).message);
      res.status(500).send("Internal Server Error");
    }
  }

  private async editItem(req: Request, res: Response): Promise<void> {
    const itemId:number = req.body.updatedItemId;
    const itemTitle:string = req.body.updatedItemTitle;

    try {
      await this.db.editItem(itemId, itemTitle);
      res.redirect("/");
    } catch (error) {
      console.log((error as Error).message);
      res.status(500).send("Internal Server Error");
    }
  }

  private async deleteItem(req: Request, res: Response): Promise<void> {
    const itemId:number = req.body.deleteItemId;

    try {
      await this.db.deleteItem(itemId);
      res.redirect("/");
    } catch (error) {
      console.log((error as Error).message);
      res.status(500).send("Internal Server Error");
    }
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}