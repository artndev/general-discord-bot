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
const { QUOTES_API_URL } = require('../../config.json');
module.exports = {
    getData: (url) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            if (response.ok) {
                return yield response.json();
            }
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(err);
            }
        }
    }),
    dateToHours: (date) => {
        return Math.floor(new Date(date).getTime() / 3.6e+6);
    },
    getRandomArbitrary: (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    },
    fetchDigits: (str) => __awaiter(void 0, void 0, void 0, function* () {
        return parseInt([...(yield str.matchAll(/\d/g))].join(""));
    }),
    getQuote: () => __awaiter(void 0, void 0, void 0, function* () {
        let q = yield module.exports.getData(QUOTES_API_URL);
        q = q[module.exports.getRandomArbitrary(0, q.length - 1)];
        return {
            author: !q["author"] ? "Unknown Author" : q["author"],
            text: q["text"]
        };
    }),
    getQuotes: (amount) => __awaiter(void 0, void 0, void 0, function* () {
        const data = yield module.exports.getData(QUOTES_API_URL);
        const from = module.exports.getRandomArbitrary(0, data.length - amount - 1);
        let res = [];
        data.slice(from, from + amount)
            .map((q) => {
            return {
                author: !q["author"] ? "Unknown Author" : q["author"],
                text: q["text"]
            };
        })
            .reverse()
            .forEach((q, i) => {
            res.push({
                name: `**${(i + 1).toString()}. ${q["author"]}:**`,
                value: `${q["text"]}`
            });
        });
        return res;
    }),
};
