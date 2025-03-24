import { Account, Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
import { AgentRuntime, createAptosTools, LocalSigner } from "move-agent-kit";

export const aptosConfig = new AptosConfig({
  network: Network.TESTNET,
});

export const aptos = new Aptos(aptosConfig);
export const demoAcc = Account.generate();
const tempSigner = new LocalSigner(demoAcc, Network.TESTNET);
const tempAptosAgent = new AgentRuntime(tempSigner, aptos);

const tools = createAptosTools(tempAptosAgent);

export const availableTools = tools.map((item, idx) => {
  if (idx > 8 && idx !== 35 && idx !== 36) {
    return {
      name: item.name
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
      description: item.description.split("\n")[0],
    };
  }
});
