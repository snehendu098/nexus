"use server";

import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb";
import { MongoClient } from "mongodb";

export async function createCheckPoiner() {
  const mongoClient = new MongoClient(process.env.MONGO_CHECKPOINT!);
  await mongoClient.connect();
  const checkpointSaver = new MongoDBSaver({ client: mongoClient });
  return checkpointSaver;
}
