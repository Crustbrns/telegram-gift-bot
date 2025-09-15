import TelegramBot from 'node-telegram-bot-api';
import config from '../config/config.js';

const wepAppUrl = 'https://telegra.ph/Test-page-hello-09-10';
const termsUrl = 'https://telegra.ph/Test-page-hello-09-10';
const privacyUrl = 'https://telegra.ph/Privacy-Policy-09-10-83';

export function startBot() {
  const token = config.botToken;
  if (!token) {
    console.log(
      '\x1b[31mNo bot token. Consider restarting the application.\x1b[0m',
    );
    return;
  }

  const bot = new TelegramBot(token, { polling: true });

  bot.onText(/\/start/, async (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, 'start', {
      reply_markup: {
        inline_keyboard: [[{ text: 'start', web_app: { url: wepAppUrl } }]],
      },
    });
  });

  bot.onText(/\/terms/, async (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, 'terms', {
      reply_markup: { inline_keyboard: [[{ text: 'terms', url: termsUrl }]] },
    });
  });

  bot.onText(/\/privacy/, async (msg: TelegramBot.Message) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, 'privacy', {
      reply_markup: {
        inline_keyboard: [[{ text: 'privacy', url: privacyUrl }]],
      },
    });
  });

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received your message');
  });

  console.log('Telegram bot started.');
}
