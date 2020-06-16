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
    bot.telegram.sendMessage(ctx.chat.id,`Assalomu alaykum ${ctx.update.message.new_chat_member.first_name}`
    + greeting
    )
})
bot.on('left_chat_member',ctx=>{
    ctx.deleteMessage()
    bot.telegram.sendMessage(ctx.chat.id,`Voy ${ctx.update.message.left_chat_member.first_name} bizni tark etdi.😱🤔`)
})
// bot.on('text',ctx=>{
//      bot.telegram.sendMessage(ctx.chat.id,`Voy .😱🤔`)
//     //console.log(`Voy .😱🤔`)
// })
app.listen(PORT , () => {
    console.log(`Server running on port ${PORT}`)
})

//bot.launch()