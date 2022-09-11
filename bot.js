require("dotenv").config();
const { Telegraf } = require("telegraf");
const URL = process.env.URL;
const PORT = process.env.PORT;
const TOKEN = process.env.TOKEN;
const bot = new Telegraf(TOKEN);

loadBot();

async function loadBot() {
	try {
		const greeting = `\nTelegraf JS - Uzbekistan guruhiga xush kelibsiz.\n`;
		const secret_url = `${URL}/bot${TOKEN}`;
		// bot.telegram.setWebhook(secret_url);
		bot.catch((err) => {
			console.error(err);
			return;
		});
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

		let launchOptions = {};

		if (process.env.NODE_ENV === "production") {
			launchOptions = {
				webhook: {
					domain: secret_url,
					PORT: +PORT,
				},
			};
		}

		await bot.launch(launchOptions);

		console.log(`@${bot.botInfo.username} started!`);

		await bot.telegram.sendMessage(863381603, "BOT STARTED");
	} catch (error) {
		console.error(error);
		bot.telegram.sendMessage(863381603, JSON.stringify(error.stack));
	}
}
