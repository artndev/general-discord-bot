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
const { SlashCommandBuilder, ChatInputCommandInteraction, ButtonInteraction, SlashCommandNumberOption } = require('discord.js');
const { path } = require("app-root-path");
const { getQuotes, fetchDigits } = require(path + "/dist/other/utils.js");
const { qsEmbed } = require(path + "/dist/other/embeds.js");
const { qsRow } = require(path + "/dist/other/rows.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('quotes')
        .setDescription('List of quotes')
        .addNumberOption((opt) => opt
        .setRequired(true)
        .setMinValue(2)
        .setMaxValue(25)
        .setName("amount")
        .setDescription("The amount of quotes")),
    execute(msg) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield msg.deferReply({ ephemeral: true });
                // ? Body of the command
                const amount = msg.options.getNumber("amount");
                const quotes = yield getQuotes(amount);
                // ? End of the body
                yield msg.editReply({
                    embeds: [
                        qsEmbed("The Quotes List", amount, quotes)
                    ],
                    components: [qsRow("Refresh")],
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
    qsEdit(inter) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (inter.member.user.tag !== inter.user.tag)
                    return;
                yield inter.deferUpdate();
                // ? Body of the command
                const amount = yield fetchDigits(inter.message.embeds[0].data.footer.text);
                const quotes = yield getQuotes(amount);
                // ? End of the body
                yield inter.editReply({
                    embeds: [
                        qsEmbed("The Quotes List", amount, quotes)
                    ],
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
};
