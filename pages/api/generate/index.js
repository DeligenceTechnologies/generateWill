import { DataSource } from "typeorm";
import { SqlDatabase } from "langchain/sql_db";
import { ChatOpenAI } from "@langchain/openai";
import { SqlDatabaseChain, createSqlQueryChain } from "langchain/chains/sql_db";
import { HumanMessage } from "@langchain/core/messages";
import { StringOutputParser } from "@langchain/core/output_parsers";
import {
  RunnablePassthrough,
  RunnableSequence,
} from "@langchain/core/runnables";
import { QuerySqlTool } from "langchain/tools/sql";
import { PromptTemplate } from "@langchain/core/prompts";
export default async function handler(req, res) {
  const dataSource = new DataSource({
    type: "sqlite",
    database: "./familyDetails.db",
    synchronize: true,
    logging: true,
  });

  try {
    const { input } = req.body;
    await dataSource.initialize();
    const db = await SqlDatabase.fromDataSourceParams({
      appDataSource: dataSource,
    });
    const llm = new ChatOpenAI({
      modelName: "gpt-4",
      openAIApiKey: process.env.OPENAI_API_KEY,
      maxTokens: 1500,
      temperature: 0.5,
    });
    const chain = await createSqlQueryChain({
      llm,
      db,
      dialect: "sqlite",
    });
    const response = await chain.invoke({
      question: input,
    });
    const result = await db.run(response);
    res.status(200).json({ response: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve data or generate will" });
  } finally {
    await dataSource.destroy();
  }
}
