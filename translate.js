import { LANGUAGES } from './language';

async function translateText(targetText) {
  require('dotenv').config();
  const {TranslationServiceClient} = require('@google-cloud/translate');
  const projectId = process.env.GCP_PROJECT_ID
  const location = 'global'


  const translationClient = new TranslationServiceClient();
  // Construct request
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    contents: [targetText],
    mimeType: 'text/plain', // mime types: text/plain, text/html
    sourceLanguageCode: 'ja',
    targetLanguageCode: 'ko',
  };

  // Run request
  const [response] = await translationClient.translateText(request);

  const options = {
    flag: "a"
  }

  for (const translation of response.translations) {
    const fs = require("fs")
    fs.writeFileSync("./translateResult/korean_result.txt", translation.translatedText, options)
  }

  console.log("書き込み完了")
}

const inputPrompt = async () => {
  const prompts = require("prompts");
  let questions = {
    type: "list",
    name: "targetText",
    message: "翻訳対象のテキストを入力してください"
  };
  const targetText =  await prompts(questions);

  translateText(targetText.targetText);
}

// const outPutTranslateResult = (translatedText) => {
//   const fs = require('fs')
//   fs.writeFile("./translateResult/result.txt", translatedText, (error) => {
//     console.log(`error`)
//   })
// }

inputPrompt()

