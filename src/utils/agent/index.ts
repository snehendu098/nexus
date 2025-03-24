import { Account, Ed25519PrivateKey, Network } from "@aptos-labs/ts-sdk";
import { AgentRuntime, createAptosTools, LocalSigner } from "move-agent-kit";
import { aptos } from "../constants";
import { ChatAnthropic } from "@langchain/anthropic";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { createCheckPoiner } from "@/helpers/checkpointer";
import { MemorySaver } from "@langchain/langgraph-checkpoint";

const account = Account.generate();

interface IRuntime {
  privateKey: string;
  instruction: string;
  tools: number[];
}

export const agentInit = async (item: IRuntime) => {
  // const account = await aptos.deriveAccountFromPrivateKey({
  //   privateKey: new Ed25519PrivateKey(item.privateKey),
  // });

  const signer = new LocalSigner(account, Network.TESTNET);

  const agent = new AgentRuntime(signer, aptos);

  return agent;
};

export const reactiveAgent = async (item: IRuntime) => {
  console.log(item);
  const aptosAgent = await agentInit(item);

  const tools = createAptosTools(aptosAgent).filter((_, idx) =>
    item.tools.includes(idx)
  );

  const llm = new ChatAnthropic({
    temperature: 0.7,
    model: "claude-3-5-sonnet-20241022",
    apiKey: process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY!,
  });

  // const checkpointSaver = await createCheckPoiner();
  const checkpointSaver = new MemorySaver();

  const agent = createReactAgent({
    llm,
    tools,
    checkpointSaver,
    messageModifier: `
  ${item.instruction}

  Available Tools:
  ${tools.map((tool) => `${tool.name} - ${tool.description}`).join(", ")}
  `,
  });

  return agent;
};
