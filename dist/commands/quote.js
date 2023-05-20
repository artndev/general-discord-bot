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
const { SlashCommandBuilder, ChatInputCommandInteraction, ButtonInteraction } = require('discord.js');
const { path } = require("app-root-path");
const { getQuote } = require(path + "/dist/other/utils.js");
const { qEmbed } = require(path + "/dist/other/embeds.js");
const { qRow } = require(path + "/dist/other/rows.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Random quote'),
    execute(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield msg.deferReply({ ephemeral: true });
                // ? Body of the command
                const quote = yield getQuote();
                // ? End of the body
                yield msg.editReply({
                    embeds: [
                        qEmbed(quote["author"], quote["text"])
                    ],
                    components: [qRow("Refresh")],
                    files: [{
                            attachment: path + "/src/imgs/quotes-sign.png",
                            name: "quotes-sign.png"
                        }]
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    },
    qEdit(inter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (inter.member.user.tag !== inter.user.tag)
                    return;
                yield inter.deferUpdate();
                // ? Body of the command
                const quote = yield getQuote();
                // ? End of the body
                yield inter.editReply({
                    embeds: [
                        qEmbed(quote["author"], quote["text"])
                    ],
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
};
