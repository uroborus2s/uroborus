import * as dotenv from 'dotenv';

dotenv.config();

export interface IConfig {
  chatGPTAccount: {
    email: string;
    password: string;
    proxyServer: string;
    isGoogleLogin?: boolean;
  };
  chatGptRetryTimes: number | string;
  chatGptTiggerKeyword: string;
}

export const config: IConfig = {
  chatGPTAccount: {
    email: process.env.OPEN_API_NAME || '',
    password: process.env.OPEN_API_PASSWORD || '',
    proxyServer: process.env.PROXY || 'localhost:9910',
  },
  chatGptRetryTimes: process.env.CHATGPT_RETRY_TIMES || 3,
  chatGptTiggerKeyword: process.env.CHATGPT_TIGGER_KEYWORD || 'chatGpt',
};
