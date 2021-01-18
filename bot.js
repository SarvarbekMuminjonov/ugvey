require('dotenv').config()
const Telegraf=require('telegraf')
const request = require('request')
const express=require('express')
const app=express()
const URL=process.env.URL
const  PORT=process.env.PORT
const TOKEN=process.env.TOKEN
const bot=new Telegraf(TOKEN)

const greeting=`
Telegraf JS - Uzbekistan guruhiga xush kelibsiz.
`


bot.telegram.setWebhook(`${URL}/bot${TOKEN}`);
app.use(bot.webhookCallback(`/bot${TOKEN}`));

bot.on('new_chat_members',(ctx)=>{
    ctx.deleteMessage()
    bot.telegram.sendMessage(ctx.chat.id,
        `Assalomu alaykum ` + `<a href="tg://user?id=${ctx.update.message.new_chat_member.id}">${ctx.update.message.new_chat_member.first_name}</a>`
    + greeting+ `Guruh `+
    ` <a href="https://t.me/telegrafJS_uz/31">haqida </a>` +` tanishib chiqishingizni maslahat beramiz`,
    {parse_mode:'HTML',disable_web_page_preview:true}
    )
 
})



  bot.on('text', ctx => {
    if (ctx.message.text.slice(0, 3) == '#js') {
      let url = "https://rextester.com/rundotnet/api"
      let form = { "LanguageChoice": 23, "Program": ctx.message.text.slice(4) }
      request.post({ url, form }, (err, res, body) => {
        let data = JSON.parse(body)
        if (data.Errors) {
          bot.telegram.sendMessage(ctx.chat.id,`<code>${escapeOutOfRange(data.Errors)}</code>`,
          {reply_to_message_id:ctx.message.message_id,parse_mode:'HTML'})
         // ctx.replyWithHTML(`<code>${escapeOutOfRange(data.Errors)}</code>`, { reply_to_message_id: ctx.message.message_id })
        } else {
          //bot.telegram.sendMessage(ctx.chat.id,data.Result,{reply_to_message_id:ctx.message.message_id})
          ctx.reply(escapeOutOfRange(data.Result), { reply_to_message_id: ctx.message.message_id })
        }
      })
    }
  })
  
  function escapeOutOfRange(text) {
    if (text.length > 4000) {
      return text.slice(4000) + "\n...\nMessage out of range 4000 symbols"
    }
    return text
  }

app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`)
})

//bot.launch()