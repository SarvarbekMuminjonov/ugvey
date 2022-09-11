require("dotenv").config();
const { Telegraf } = require("telegraf");
// const request = require('request')
// const express = require('express')
// const app = express()
const URL = process.env.URL;
const PORT = process.env.PORT;
const TOKEN = process.env.TOKEN;
const bot = new Telegraf(TOKEN);

const greeting = `
Telegraf JS - Uzbekistan guruhiga xush kelibsiz.
`;
const secret_url = `${URL}/bot${TOKEN}`;
bot.telegram.setWebhook(secret_url);
// app.use(bot.webhookCallback(`/bot${TOKEN}`));
bot.start((ctx) => {
	return ctx.reply("Ichki hotirjamlik");
});
bot.on("new_chat_members", (ctx) => {
	ctx.deleteMessage();
	bot.telegram
		.sendMessage(
			ctx.chat.id,
			`Assalomu alaykum ` +
				`<a href="tg://user?id=${ctx.update.message.new_chat_member.id}">${ctx.update.message.new_chat_member.first_name}</a>` +
				greeting +
				`Guruh ` +
				`<a href="https://t.me/botjs_uz/31">haqida</a>` +
				` tanishib chiqishingizni maslahat beramiz`,
			{ parse_mode: "HTML", disable_web_page_preview: true }
		)
		.then((m) => {
			setTimeout(() => {
				ctx.deleteMessage(m.message_id).catch((err) => {
					console.log(err);
				});
			}, 60 * 1000);
		});
});

bot.on("message", async (ctx) => {
	console.log(ctx.from);
	if (ctx.chat.type === "group" || ctx.chat.type === "supergroup") {
		if (ctx.from.username === "Channel_Bot") {
			await ctx.deleteMessage();
			// await ctx.banChatSenderChat(ctx.message.sender_chat.id);
			let warning = `<b>❗️ Iltimos, guruhda kanal nomidan yozmang!</b>`;
			ctx.replyWithHTML(warning).then((m) => {
				setTimeout(() => {
					ctx.deleteMessage(m.message_id).catch((err) => {});
				}, 60 * 1000);
			});
		}
	}
});

// bot.on('text', ctx => {
//     if (ctx.message.text.slice(0, 3) == '#js') {
//         let url = "https://rextester.com/rundotnet/api"
//         let form = { "LanguageChoice": 23, "Program": ctx.message.text.slice(4) }
//         request.post({ url, form }, (err, res, body) => {
//             let data = JSON.parse(body)
//             if (data.Errors) {
//                 bot.telegram.sendMessage(ctx.chat.id, escapeOutOfRange(data.Errors), { reply_to_message_id: ctx.message.message_id })
//                 console.log(
//                     data.Errors
//                 )
//                 // ctx.replyWithHTML(`<code>${escapeOutOfRange(data.Errors)}</code>`, { reply_to_message_id: ctx.message.message_id })
//             } else {
//                 bot.telegram.sendMessage(ctx.chat.id, escapeOutOfRange(data.Result), { reply_to_message_id: ctx.message.message_id })
//                 //ctx.reply((data.Result), { reply_to_message_id: ctx.message.message_id })
//                 //console.log(data.Result)
//             }
//         })
//     }
// })

// function escapeOutOfRange(text) {
//     if (text.length > 4000) {
//         return text.slice(4000) + "\n...\nMessage out of range 4000 symbols"
//     }
//     return text
// }

// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })

let launchOptions = {};

if (process.env.NODE_ENV === "production") {
	launchOptions = {
		webhook: {
			domain: secret_url,
			PORT: +PORT,
		},
	};
}

bot
	.launch(launchOptions)
	.then(() => console.log(`@${bot.botInfo.username} started!`));
