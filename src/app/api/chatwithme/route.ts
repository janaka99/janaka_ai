import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import {
  allFunctions,
  getTodosFunctionaDeclaration,
} from "../../../../utils/chat/functions/getProducts";

export async function POST(req: NextRequest) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "");
    const body = await req.json();
    console.log(body);
    const genModel = genAI.getGenerativeModel({
      model: "gemini-1.0-pro-001",
      tools: [
        {
          functionDeclarations: [getTodosFunctionaDeclaration],
          // functionDeclarations: [],
        },
      ],
    });

    const chat = genModel.startChat();

    const promt = "call `getTodos` function ";

    const result = await chat.sendMessage(promt);

    const call = result.response.functionCalls();

    let apiResponse = null;
    let result2 = null;
    if (call && call[0]) {
      apiResponse = await allFunctions[call[0].name](call[0]);
      console.log(" asdasd ", apiResponse);
      console.log("a sdasd asdasd ", apiResponse[0]);
      result2 = await chat.sendMessage([
        {
          functionResponse: {
            name: "getTodos",
            response: { data: apiResponse },
          },
        },
      ]);
    }

    return NextResponse.json({
      functions: call,
      results: result,
      apiResponse: apiResponse,
      result2: result2,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ err: "Something went wrong" });
  }
}
