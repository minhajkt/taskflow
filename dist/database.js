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
exports.Database = void 0;
const pg_1 = __importDefault(require("pg"));
class Database {
    constructor() {
        this.client = new pg_1.default.Client({
            user: 'postgres',
            host: 'localhost',
            database: 'taskflow',
            password: '123',
            port: 5432,
        });
        this.client.connect();
    }
    getItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.client.query('SELECT * from items ORDER BY id ASC');
            return result.rows;
        });
    }
    addItem(title) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.query("INSERT INTO items (title) VALUES ($1)", [title]);
        });
    }
    editItem(id, title) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.query('UPDATE items SET title = $1 WHERE id = $2', [title, id]);
        });
    }
    deleteItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.query('DELETE FROM items WHERE id = $1', [id]);
        });
    }
}
exports.Database = Database;
