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



app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`)
})

//bot.launch()