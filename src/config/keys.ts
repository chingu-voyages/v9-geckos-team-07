export type GoogleClientConfig = {
  clientID: string;
  clientSecret: string;
};

export type ServerKeys = {
  cookieKey: string;
  mongo: string;
  google: GoogleClientConfig
};

export const keys: ServerKeys = {
  cookieKey: process.env.COOKIE_KEY || '',
  mongo: process.env.MONGODB || '',
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
  }
};