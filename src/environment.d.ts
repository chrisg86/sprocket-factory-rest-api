declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      MYSQL_ROOT_PASSWORD: string;
      MYSQL_DB: string;
    }
  }
}

export {};
