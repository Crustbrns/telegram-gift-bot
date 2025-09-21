import { validate, parse, type InitData } from '@telegram-apps/init-data-node';
import type { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.js';
import config from '../config/config.js';
import querystring from 'querystring';

interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  allows_write_to_pm: boolean;
  photo_url?: string;
}
interface TelegramAuthData {
  query_id: string;
  user: TelegramUser;
  auth_date: number;
  signature: string;
  hash: string;
}
//move to middleware later(?)
export async function auth(req: Request, res: Response, next: NextFunction) {
  /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Auth user.',
            schema: {
                "initData": "query_id=AAHdF6IQAAAAAN0XohDhrOrc&user=%7B%22id%22%3A279058397%2C%22first_name%22%3A%22Vladislav%22%2C%22last_name%22%3A%22Kibenko%22%2C%22username%22%3A%22vdkfrost%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%7D&auth_date=1662771648&hash=c501b71e775f74ce10e377dea85a7ea24ecd640b223ea86dfe453e0eaed2e2b2",
            }
    } */
  try {
    const { initData } = req.body;
    if (!config.botToken) {
      throw new Error("No bot token. Can't proceed with auth.");
    }

    validate(initData, config.botToken);
    const authData = parseTelegramAuth(initData);
    const user = transformTelegramUser(authData.user);
    //check balance update
    const targetUser = await User.findByIdAndUpdate(
      { tgId: authData.user.id },
      user,
      {
        new: true,
        upsert: true,
      },
    );

    res.status(200).json(targetUser);
  } catch (error) {
    next(error);
  }
}

function parseTelegramAuth(raw: string): TelegramAuthData {
  const parsed = querystring.parse(raw);

  const user =
    parsed.user && typeof parsed.user === 'string'
      ? JSON.parse(parsed.user)
      : null;

  return {
    query_id: parsed.query_id as string,
    user,
    auth_date: Number(parsed.auth_date),
    signature: parsed.signature as string,
    hash: parsed.hash as string,
  };
}
function transformTelegramUser(user: TelegramUser) {
  return {
    tgId: String(user.id),
    username: user.username,
    firstname: user.first_name,
    lastname: user.last_name,
    photoURL: user.photo_url,
    allowToWrite: user.allows_write_to_pm,
    languageCode: user.language_code,
  };
}
