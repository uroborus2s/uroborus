import { ChatGPTAPIBrowser } from 'chatgpt';

import { config } from './config';

const ErrorCode2Message: Record<string, string> = {
  '503':
    'OpenAI 服务器繁忙，请稍后再试| The OpenAI server is busy, please try again later',
  '429':
    'OpenAI 服务器限流，请稍后再试| The OpenAI server was limited, please try again later',
  '500':
    'OpenAI 服务器繁忙，请稍后再试| The OpenAI server is busy, please try again later',
  '403':
    'OpenAI 服务器拒绝访问，请稍后再试| The OpenAI server refused to access, please try again later',
  unknown: '未知错误，请看日志 | Error unknown, please see the log',
};

// Make error code to more human readable message.
function error2msg(err: Error): string {
  const code = Object.keys(ErrorCode2Message).find((key) =>
    err.message.includes(key),
  );
  if (code) return ErrorCode2Message[code];
  return ErrorCode2Message.unknown;
}

export class ChatGPTBot {
  private ready = false;

  private chatGPTSession: ChatGPTAPIBrowser;

  private conversations: Map<
    string,
    { conversationId?: string; messageId?: string }
  > = new Map();

  constructor() {
    console.debug(`Start GPT Bot Config is:${JSON.stringify(config)}`);
    this.chatGPTSession = new ChatGPTAPIBrowser({
      ...config.chatGPTAccount,
    });
    this.chatGPTSession.initSession().then(() => {
      console.debug(`🤖️ Start GPT Bot Success, ready to handle message!`);
      this.ready = true;
    });
  }

  public isReady() {
    return this.ready;
  }

  async getGPTMessage(text: string, talkerId: string): Promise<string> {
    const { conversationId, messageId } = this.getConversation(talkerId);
    try {
      const {
        response,
        conversationId: newConversationId,
        messageId: newMessageId,
      } = await this.chatGPTSession.sendMessage(text, {
        conversationId,
        parentMessageId: messageId,
      });
      this.conversations.set(talkerId, {
        conversationId: newConversationId,
        messageId: newMessageId,
      });
      return response;
    } catch (err: any) {
      if (err.message.includes('ChatGPT failed to refresh auth token')) {
        // If refresh token failed, we will remove the conversation from pool
        await this.resetAccount();
        console.log(`Refresh token failed`);
        return this.getGPTMessage(text, talkerId);
      }
      console.error(`err is ${err.message}`);
      // If send message failed, we will remove the conversation from pool
      this.conversations.delete(talkerId);
      // Retry
      return error2msg(err);
    }
  }

  getConversation(talkId: string) {
    if (this.conversations.has(talkId)) {
      return this.conversations.get(talkId) as {
        conversationId?: string;
        messageId?: string;
      };
    }
    if (!this.chatGPTSession) {
      throw new Error('⚠️ No chatgpt item in pool');
    }
    this.conversations.set(talkId, {});
    return {};
  }

  async resetAccount() {
    this.conversations.clear();
    try {
      this.chatGPTSession = new ChatGPTAPIBrowser({
        ...config.chatGPTAccount,
      });
    } catch (err) {
      console.error(
        `Try reset account: ${config.chatGPTAccount.email} failed: ${err}`,
      );
    }
  }

  resetConversation(talkId: string) {
    this.conversations.delete(talkId);
  }
}
