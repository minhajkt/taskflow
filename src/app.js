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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var express_1 = require("express");
var database_1 = require("./database");
var body_parser_1 = require("body-parser");
var path_1 = require("path");
var App = /** @class */ (function () {
    function App(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        this.db = new database_1.Database();
        this.configureMiddleware();
        this.configureRoutes();
        this.configureViews();
    }
    App.prototype.configureMiddleware = function () {
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.static("public"));
    };
    App.prototype.configureViews = function () {
        this.app.set("views", path_1.default.join(__dirname, "views"));
        this.app.set("view engine", "ejs");
    };
    App.prototype.configureRoutes = function () {
        this.app.get("/", this.getItems.bind(this));
        this.app.post("/add", this.addItem.bind(this));
        this.app.post("/edit", this.editItem.bind(this));
        this.app.post("/delete", this.deleteItem.bind(this));
    };
    App.prototype.getItems = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var items, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.db.getItems()];
                    case 1:
                        items = _a.sent();
                        res.render("index.ejs", { listTitle: "Today", listItems: items });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log(error_1.message);
                        res.status(500).send("Internal Server Error");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.addItem = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var itemTitle, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        itemTitle = req.body.newItem;
                        return [4 /*yield*/, this.db.addItem(itemTitle)];
                    case 1:
                        _a.sent();
                        res.redirect("/");
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2.message);
                        res.status(500).send("Internal Server Error");
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.editItem = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var itemId, itemTitle, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemId = req.body.updatedItemId;
                        itemTitle = req.body.updatedItemTitle;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.db.editItem(itemId, itemTitle)];
                    case 2:
                        _a.sent();
                        res.redirect("/");
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.log(error_3.message);
                        res.status(500).send("Internal Server Error");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.deleteItem = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var itemId, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        itemId = req.body.deleteItemId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.db.deleteItem(itemId)];
                    case 2:
                        _a.sent();
                        res.redirect("/");
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.log(error_4.message);
                        res.status(500).send("Internal Server Error");
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.listen = function () {
        var _this = this;
        this.app.listen(this.port, function () {
            console.log("Server is running on port ".concat(_this.port));
        });
    };
    return App;
}());
exports.App = App;
