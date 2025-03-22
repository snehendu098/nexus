import { NextResponse } from "next/server";
import { Agent } from "@/models/agent.model";
import { dbConnect } from "@/lib/db";
import { ApiResponse } from "@/interfaces";

interface AgentCreateRequest {
  displayName: string;
  description: string;
  instructions: string;
  privateKey: string;
  tools: number[];
  ownerWallet: string;
}

export async function POST(req: Request) {
  try {
    await dbConnect();

    const agentData: AgentCreateRequest = await req.json();

    const requiredFields = [
      "displayName",
      "description",
      "instructions",
      "privateKey",
      "ownerWallet",
    ];
    for (const field of requiredFields) {
      if (!agentData[field as keyof AgentCreateRequest]) {
        return NextResponse.json(
          {
            success: false,
            error: `Missing required field: ${field}`,
          },
          { status: 400 }
        );
      }
    }

    const newAgent = new Agent({
      displayName: agentData.displayName,
      description: agentData.description,
      instructions: agentData.instructions,
      privateKey: agentData.privateKey,
      tools: agentData.tools || [],
      ownerWallet: agentData.ownerWallet,
    });

    const savedAgent = await newAgent.save();

    const response: ApiResponse<typeof savedAgent> = {
      success: true,
      data: savedAgent,
      message: "Agent created successfully",
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    console.error("Error creating agent:", error);

    const response: ApiResponse<null> = {
      success: false,
      error: error.message || "Failed to create agent",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
