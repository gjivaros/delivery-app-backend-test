import mongoose from "mongoose";
import { appLog } from "../share/app-log";

export async function initDataSource(mongoUrl: string) {
  try {
    await mongoose.connect(mongoUrl);
    appLog.info("mongodb is initialized successfully");
  } catch (error) {
    appLog.error("mongodb initialization error", error);
    throw error;
  }
}
