"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const app = (0, express_1.default)();
const port = 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, compression_1.default)());
/** View engine setup */
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(express_1.default.static(__dirname + '/public'));
app.use('/', router_1.default);
app.listen(port, () => {
    return console.log(`server is listening on ${port}`);
});
