require('dotenv').config()
const Telegraf=require('telegraf')
const express=require('express')
const app=express()
const URL=process.env.URL
const  PORT=process.env.PORT
const TOKEN=process.env.TOKEN
const bot=new Telegraf(TOKEN)

const greeting=`
Telegraf JS- Uzbekistan guruhimizga xush kelibsiz.
`


bot.telegram.setWebhook(`${URL}/bot${TOKEN}`);
app.use(bot.webhookCallback(`/bot${TOKEN}`));

bot.on('new_chat_members',ctx=>{
    ctx.deleteMessage()
    bot.telegram.sendMessage(ctx.chat.id,
        `Assalomu alaykum ` + `<a href="tg://user?id=${ctx.update.message.new_chat_member.id}">${ctx.update.message.new_chat_member.first_name}</a>`
    + greeting+ `Guruh `+
    ` <a href="https://t.me/telegraf_uzb/31">haqida </a>` +` tanishib chiqishingizni maslahat beramiz`,
    {parse_mode:'HTML'}
    )
})
bot.on('text', ctx => {
    if (ctx.message.text.slice(0, 3) == '#js') {
      let url = "https://rextester.com/rundotnet/api"
      let form = { "LanguageChoice": 23, "Program": ctx.message.text.slice(4) }
      request.post({ url, form }, (err, res, body) => {
        let data = JSON.parse(body)
        if (data.Errors) {
          ctx.replyWithHTML(`<code>${data.Errors}</code>`,{reply_to_message_id:ctx.message.message_id})
        } else {
          ctx.reply(data.Result,{reply_to_message_id:ctx.message.message_id})
        }
      })
    }
  })

app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`)
})

//bot.launch()