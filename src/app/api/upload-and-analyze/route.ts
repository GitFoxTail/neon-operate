import { NextResponse } from "next/server";
import { DocumentAnalysisClient, AzureKeyCredential } from "@azure/ai-form-recognizer";

export const runtime = "nodejs" // Edge RuntimeではなくNode.jsを使用

const endpoint = process.env.AZURE_FORM_RECOGNIZER_ENDPOINT!;
const apiKey = process.env.AZURE_FORM_RECOGNIZER_API_KEY!;

const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

export async function POST(request: Request){
    try{
        const formData = await request.formData();
        const file = formData.get('file') as File | null;

        if (!file){
            return NextResponse.json(
                { error: "ファイルがアップロードされていません。" },
                { status: 400 }
            );
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const poller = await client.beginAnalyzeDocument("prebuilt-read", buffer);
        const result = await poller.pollUntilDone();

        return NextResponse.json({ result });
    }catch(error){
        console.error(error);
        return NextResponse.json(
            { error: "ドキュメントの分析中にエラーが発生しました。"},
            { status: 500 }
        );
    }
}