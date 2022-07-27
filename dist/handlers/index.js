"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tanksPage = exports.apartmentsRender = exports.clubRender = exports.leadCreateOne = exports.leadGetMany = exports.landingCreateOne = exports.landingGetMany = exports.getMain = void 0;
const client_1 = require("@prisma/client");
const qs = __importStar(require("querystring"));
const prisma = new client_1.PrismaClient();
const getMain = (req, res) => {
    return res.render('home');
};
exports.getMain = getMain;
const landingGetMany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json(yield prisma.landing.findMany());
    }
    catch (err) {
        return res.status(500).json({ message: 'Please try later' });
    }
});
exports.landingGetMany = landingGetMany;
const landingCreateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.json(yield prisma.landing.create({
            data: req.body
        }));
    }
    catch (err) {
        return res.status(500).json({ message: 'Database error connection' });
    }
});
exports.landingCreateOne = landingCreateOne;
const leadGetMany = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const landingId = Number(req.query.landingId);
    let leads = [];
    try {
        if (Object.keys(req.query).length > 0) {
            leads = yield prisma.lead.findMany({
                where: {
                    landingId,
                    // createdAt: {
                    //     equals: new Date()
                    // }
                }
            });
            return res.json(leads);
        }
        else {
            leads = yield prisma.lead.findMany();
            return res.json(leads);
        }
    }
    catch (err) {
        return res.status(500).json({ message: 'Database error connection' });
    }
});
exports.leadGetMany = leadGetMany;
const leadCreateOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const landingId = Number(process.env.LANDING_ID);
    const data = { landingId, fields: JSON.stringify(qs.parse(req.body.fields)), utm: JSON.stringify(qs.parse(req.body.utm)) };
    try {
        return res.json(yield prisma.lead.create({
            data
        }));
    }
    catch (err) {
        return res.status(500).json({ message: 'Database error connection' });
    }
});
exports.leadCreateOne = leadCreateOne;
/** Virtual tours */
const clubRender = (req, res) => {
    return res.render('ikonia-club');
};
exports.clubRender = clubRender;
const apartmentsRender = (req, res) => {
    return res.render('ikonia-apartments');
};
exports.apartmentsRender = apartmentsRender;
const tanksPage = (req, res) => {
    return res.render('thanks');
};
exports.tanksPage = tanksPage;
