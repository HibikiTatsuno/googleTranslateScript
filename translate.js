const LANGUAGES = [
  {
    label: "english",
    code: "en"
  },
  {
    label: "korean",
    code: "ko"
  },
  {
    label: "china_CN",
    code: "zh-CN"
  },
  {
    label: "china_TW",
    code: "zh-TW"
  },
]

async function translateText(targetText) {
  require('dotenv').config();
  const {TranslationServiceClient} = require('@google-cloud/translate');
  const projectId = process.env.GCP_PROJECT_ID
  const location = 'global'
  const translationClient = new TranslationServiceClient();

  LANGUAGES.forEach(async(lang) => {
    const request = {
      parent: `projects/${projectId}/locations/${location}`,
      contents: [targetText],
      mimeType: 'text/plain',
      sourceLanguageCode: 'ja', //マジックナンバーに修正したい
      targetLanguageCode: lang.code,
    };

    const [response] = await translationClient.translateText(request);

    for (const translation of response.translations) {
      const fs = require("fs")
      fs.writeFileSync(`./translateResult/${lang.label}_result.txt`, translation.translatedText)
    }
    console.log(`${lang.label}語 書き込み完了`)
  })
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

inputPrompt()

