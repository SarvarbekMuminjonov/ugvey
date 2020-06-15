require('dotenv').config()
const Telegraf=require('telegraf')
const bot=new Telegraf(process.env.TOKEN)

const greeting=`
Telegraf JS- Uzbekistan guruhimizga xush kelibsiz.
`

bot.use((ctx,next)=>{
    try{
        if(ctx.updateSubTypes[0]=='new_chat_members'){
        ctx.deleteMessage()
        bot.telegram.sendMessage(ctx.chat.id,`Assalomu alaykum ${ctx.update.message.new_chat_member.first_name}`
        + greeting
        )
    }   
    if(ctx.updateSubTypes[0]=='left_chat_member'){
        ctx.deleteMessage()
        bot.telegram.sendMessage(ctx.chat.id,`Voy ${ctx.update.message.left_chat_member.first_name} bizni tark etdi.😱🤔`)
    }
    else next()
}
catch(err){
    console.log(err)
}
   
  
})

bot.launch()