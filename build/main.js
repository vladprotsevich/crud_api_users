"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("./db/knexfile"));
const environment = process.env.NODE_ENV || 'development';
const connection = (0, knex_1.default)(knexfile_1.default.development);
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get('/users', (req, res) => {
    (0, knex_1.default)('users')
        .select('id')
        .then((users) => {
        return res.json(users);
    })
        .catch((err) => {
        console.log(err);
        return res.json({ success: false, message: 'An error occured' });
    });
});
const port = 3000;
app.listen(port, () => {
    console.log('Server is waiting connection...');
});
//# sourceMappingURL=main.js.map