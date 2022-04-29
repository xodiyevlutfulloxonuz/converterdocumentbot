const TelegramBot = require('node-telegram-bot-api')
token = '5329164595:AAHIbHcs-JEpYvhFb2UxKt5N9Y39IY-gEk8'
const {lotinga, kirillga}=require('./lotinkiril')
const bot = new TelegramBot(token, {polling: true}) 
const fs=require('fs').promises
const path=require('path')
let step=1 
let data=[]

bot.on('message',async(message)=>{
 try {
  const chatId=message.chat.id 
  if(message.text=='/start'){
     bot.sendMessage(chatId, `Assalomu  <b>${message.from.first_name} </b> alaykum botimizga xush kelibsiz.`,{
      parse_mode:'HTML'
    })
    bot.sendMessage(chatId, 'Botni vazifasi nima ekanligini bilish uchun /info ustiga bosing.')
    console.log(message)
  }
  else if(message.text=='/info'){
   await bot.sendMessage(chatId, 'Botga ixtiyoriy lotin yoki kiril tilida text yuboriladi.\nBot sizning tanlovingizga asosan textingizni lotin yoki kiril tiliga converter qilib document tarzida yuboradi.')
     bot.sendMessage(chatId, "Boshlash uchun /botstart ustiga bosing")
  }
  else if(message.text=='/botstart'){
     bot.sendMessage(chatId, "Yuboradigan textingiz qaysi tilda?\nLotin tilida bo'lsa /lotin aks holda /kiril ustiga bosing.")
  }
  else if(message.text=='/lotin'){
     bot.sendMessage(chatId, 'Textni yuboring.')
    step=2 
  }
  else if(message.text=='/kiril'){
    bot.sendMessage(chatId, 'Техтни киритинг')
    step=3
  }
  else if(step==2){
    data[0]=message.text 
     bot.sendMessage(chatId, "Yuborgan textingizni qaysi file tipida qabul qilmoqchisiz?")
    bot.sendMessage(chatId,'Tanlang. Word file uchun /docx Pdf file uchun /pdf ')
    step=4 
     
  }

  else if(step==3){
    data[0]=message.text 
    bot.sendMessage(chatId, "Yuborgan textingizni qaysi file tipida qabul qilmoqchisiz?")
   bot.sendMessage(chatId,'Tanlang. Word file uchun /docx Pdf file uchun /pdf ')
   step=5

  }
 
  else if(step==4 && message.text=='/docx'){ 
    const converterData=kirillga(data[0])


     await fs.writeFile(`user/service.docx`,converterData, 'utf-8')
      
    

    bot.sendDocument(chatId, `user/service.docx`,{
      parse_mode:'HTML',
      caption:'Qaytadan boshlash uchun <b> /info</b> '
    })
   

  }
  else if(step==4 && message.text=='/pdf'){ 
    const converterData=kirillga(data[0])


   await  fs.writeFile(`user/service.pdf`,converterData, 'utf-8')
    

    bot.sendDocument(chatId, `user/service.pdf`,{
      parse_mode:'HTML',
      caption:'Qaytadan boshlash uchun <b> /info</b> '
    })
   

  }
  else if(step==5 && message.text=='/docx'){ 
    const converterData=lotinga(data[0])


    await fs.writeFile(`user/service.docx`,converterData, 'utf-8')
      
    

    bot.sendDocument(chatId, `user/service.docx`,{
      parse_mode:'HTML',
      caption:'Qaytadan boshlash uchun <b> /info</b> '
    })
    

  }
  else if(step==5 && message.text=='/pdf'){ 
    const converterData=lotinga(data[0])


    await fs.writeFile(`user/service.pdf`,converterData, 'utf-8')
    bot.sendDocument(chatId, `user/service.pdf`,{
      parse_mode:'HTML',
      caption:'Qaytadan boshlash uchun <b> /info</b> '
    })
   
  }
  
 }
  catch (error) {
     console.log(error+"")
 }
  

})

 
