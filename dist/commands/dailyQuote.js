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
Object.defineProperty(exports, "__esModule", { value: true });
const { SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js');
const { path } = require("app-root-path");
const { qEmbed } = require(path + "/dist/other/embeds.js");
const { saveUser } = require(path + "/dist/db/index.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('daily_quote')
        .setDescription('Quote of the day'),
    execute(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield msg.deferReply({ ephemeral: true });
                // ? Body of the command
                const user = yield saveUser(msg.member.user.tag);
                // ? End of the body
                yield msg.editReply({
                    embeds: [
                        qEmbed(user["daily_quote"]["author"], user["daily_quote"]["text"])
                    ],
                    files: [{
                            attachment: path + "/src/imgs/quotes-sign.png",
                            name: "quotes-sign.png"
                        }]
                });
            }
            catch (err) {
                console.error(err);
            }
        });
    },
};
