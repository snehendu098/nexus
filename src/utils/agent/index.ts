import { Account, Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { AgentRuntime, createAptosTools, LocalSigner } from "move-agent-kit";

const aptosConfig = new AptosConfig({
  network: Network.TESTNET,
});

const aptos = new Aptos(aptosConfig);

const tempAcc = Account.generate();
const signer = new LocalSigner(tempAcc, Network.TESTNET);
const aptosAgent = new AgentRuntime(signer, aptos);

const tools = createAptosTools(aptosAgent);
