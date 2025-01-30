"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("./database");
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
class App {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.db = new database_1.Database();
        this.configureMiddleware();
        this.configureRoutes();
        this.configureViews();
    }
    configureMiddleware() {
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static("public"));
    }
    configureViews() {
        this.app.set("views", path_1.default.join(__dirname, "views"));
        this.app.set("view engine", "ejs");
    }
    configureRoutes() {
        this.app.get("/", this.getItems.bind(this));
        this.app.post("/add", this.addItem.bind(this));
        this.app.post("/edit", this.editItem.bind(this));
        this.app.post("/delete", this.deleteItem.bind(this));
    }
    getItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const items = yield this.db.getItems();
                res.render("index.ejs", { listTitle: "Today", listItems: items });
            }
            catch (error) {
                console.log(error.message);
                res.status(500).send("Internal Server Error");
            }
        });
    }
    addItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const itemTitle = req.body.newItem;
                yield this.db.addItem(itemTitle);
                res.redirect("/");
            }
            catch (error) {
                console.log(error.message);
                res.status(500).send("Internal Server Error");
            }
        });
    }
    editItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemId = req.body.updatedItemId;
            const itemTitle = req.body.updatedItemTitle;
            try {
                yield this.db.editItem(itemId, itemTitle);
                res.redirect("/");
            }
            catch (error) {
                console.log(error.message);
                res.status(500).send("Internal Server Error");
            }
        });
    }
    deleteItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemId = req.body.deleteItemId;
            try {
                yield this.db.deleteItem(itemId);
                res.redirect("/");
            }
            catch (error) {
                console.log(error.message);
                res.status(500).send("Internal Server Error");
            }
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
exports.App = App;
