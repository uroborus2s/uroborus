import qrTerm from 'qrcode-terminal';
import { Contact, log, Message, ScanStatus, WechatyBuilder } from 'wechaty';
import type { ContactInterface, RoomInterface } from 'wechaty/impls';

import { ChatGPTBot } from './ChatGPTBot';
import { config } from './config';

const SINGLE_MESSAGE_MAX_SIZE = 500;
const chatGPTBot = new ChatGPTBot();

function isNonsense(
  talker: ContactInterface,
  messageType: any,
  text: string,
): boolean {
  return (
    talker.self() ||
    // TODO: add doc support
    messageType !== 7 ||
    talker.name() === '微信团队' ||
    // 语音(视频)消息
    text.includes('收到一条视频/语音聊天消息，请在手机上查看') ||
    // 红包消息
    text.includes('收到红包，请在手机上查看') ||
    // Transfer message
    text.includes('收到转账，请在手机上查看') ||
    // 位置消息
    text.includes('/cgi-bin/mmwebwx-bin/webwxgetpubliclinkimg')
  );
}

function tiggerGPTMessage(text: string, privateChat = false): boolean {
  const { chatGptTiggerKeyword } = config;
  let triggered = false;
  if (privateChat) {
    triggered = chatGptTiggerKeyword
      ? text.includes(chatGptTiggerKeyword)
      : true;
  } else {
    triggered = text.includes(chatGptTiggerKeyword);
  }
  if (triggered) {
    console.log(`🎯 Triggered ChatGPT: ${text}`);
  }
  return triggered;
}

let wxName = '';
function cleanMessage(rawText: string, privateChat = false): string {
  let text = rawText;
  const item = rawText.split('- - - - - - - - - - - - - - -');
  const { chatGptTiggerKeyword } = config;

  if (item.length > 1) {
    text = item[item.length - 1];
  }
  text = text.replace(privateChat ? chatGptTiggerKeyword : `@${wxName}`, '');
  // remove more text via - - - - - - - - - - - - - - -
  return text;
}

async function trySay(
  talker: RoomInterface | ContactInterface,
  iMessage: string,
): Promise<void> {
  const messages: Array<string> = [];
  let message = iMessage;
  while (message.length > SINGLE_MESSAGE_MAX_SIZE) {
    messages.push(message.slice(0, SINGLE_MESSAGE_MAX_SIZE));
    message = message.slice(SINGLE_MESSAGE_MAX_SIZE);
  }
  messages.push(message);
  for (const msg of messages) {
    // eslint-disable-next-line no-await-in-loop
    await talker.say(msg);
  }
}

async function onPrivateMessage(talker: ContactInterface, text: string) {
  const talkerId = talker.id;
  const gptMessage = await chatGPTBot.getGPTMessage(text, talkerId);
  return gptMessage;
}

async function onGroupMessage(
  talker: ContactInterface,
  text: string,
  room: RoomInterface,
) {
  const talkerId = room.id + talker.id;
  const gptMessage = await chatGPTBot.getGPTMessage(text, talkerId);
  return `${text}\n ------\n ${gptMessage}`;
}

function onScan(qrcode: string, status: ScanStatus) {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    qrTerm.generate(qrcode, { small: true }); // show qrcode on console

    const qrcodeImageUrl = [
      'https://wechaty.js.org/qrcode/',
      encodeURIComponent(qrcode),
    ].join('');

    log.info(
      'StarterBot',
      'onScan: %s(%s) - %s',
      ScanStatus[status],
      status,
      qrcodeImageUrl,
    );
  } else {
    log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status);
  }
}

async function onLogin(user: Contact) {
  log.info('StarterBot', '%s login', user);
  wxName = user.name();
}

function onLogout(user: Contact) {
  log.info('StarterBot', '%s logout', user);
}

async function onMessage(msg: Message) {
  log.info('StarterBot', msg.toString());
  if (!chatGPTBot.isReady()) {
    return;
  }
  try {
    console.log(`Message: ${msg}`);
    const talker = msg.talker();
    const rawText = msg.text();
    const room = msg.room();
    const messageType = msg.type();
    const privateChat = !room;
    if (isNonsense(talker, messageType, rawText)) return;
    if (tiggerGPTMessage(rawText, privateChat)) {
      const text = cleanMessage(rawText, privateChat);
      let gptMessage = 'gpt 无法回答任何问题！';
      if (privateChat) {
        gptMessage = await onPrivateMessage(talker, text);
      } else gptMessage = await onGroupMessage(talker, text, room!);
      await trySay(talker, gptMessage);
    }
    return;
  } catch (e) {
    console.error(e);
  }
}

const bot = WechatyBuilder.build({
  name: 'ding-dong-bot',
  /**
   * Specify a `puppet` for a specific protocol (Web/Pad/Mac/Windows, etc).
   *
   * You can use the following providers:
   *  - wechaty-puppet-hostie
   *  - wechaty-puppet-wechat
   *  - wechaty-puppet-padplus
   *  - etc.
   *
   * Learn more about Wechaty Puppet Providers at:
   *  https://github.com/wechaty/wechaty-puppet/wiki/Directory
   */
  puppetOptions: {
    uos: true, // 开启uos协议
  },
  // puppet: 'wechaty-puppet-hostie',
  puppet: 'wechaty-puppet-wechat4u',
});

bot.on('scan', onScan);
bot.on('login', onLogin);
bot.on('logout', onLogout);
bot.on('message', onMessage);

bot
  .start()
  .then(() => log.info('StarterBot', 'Starter Bot Started.'))
  .catch((e) => log.error('StarterBot', e));
