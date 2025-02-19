import { NextResponse } from "next/server";
import { DocumentAnalysisClient, AzureKeyCredential } from "@azure/ai-form-recognizer";

const endpoint: string = process.env.AZURE_FORM_RECOGNIZER_ENDPOINT!;
const apiKey : string  = process.env.AZURE_FORM_RECOGNIZER_API_KEY!;

const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

export async function POST(request: Request){
    try{
        const { documentUrl } = await request.json();

        const poller = await client.beginAnalyzeDocumentFromUrl("prebuilt-read", documentUrl);
        const result = await poller.pollUntilDone();

        return NextResponse.json({ result });
    }catch(error){
        console.log(error);
        return NextResponse.json(
            { error: "ドキュメントの分析中にエラーが発生しました。"},
            { status: 500 }
        );
    }
}