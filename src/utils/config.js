import dotenv from 'dotenv';
dotenv.config();

const MAX_EMAIL_SENDING_SIZE = 50
export const CONFIG = {
  //  @ts-ignore
  SECRET_KEY: process.env.SECRET_KEY,
  //  @ts-ignore
  CHUNK_SIZE: process.env.CHUNK_SIZE || MAX_EMAIL_SENDING_SIZE,
  //  @ts-ignore
  ORIGIN_EMAIL: process.env.ORIGIN_EMAIL,
};
