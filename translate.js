require('dotenv').config();
const { TranslationServiceClient } = require('@google-cloud/translate');

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

async function translateText() {
  const projectId = process.env.GCP_PROJECT_ID
  const location = 'global'
  const translationClient = new TranslationServiceClient();

  // テキストファイルから翻訳対象となる日本語を読み込み
  const fs = require("fs")
  const fileTexts = fs.readFileSync("japaneseSource.txt", 'utf-8');
  const targetText = fileTexts.split("\n").join(",")
  console.log(targetText)

  LANGUAGES.forEach(async(lang) => {
    const request = {
      parent: `projects/${projectId}/locations/${location}`,
      contents: [targetText],
      mimeType: 'text/plain',
      sourceLanguageCode: 'ja', //マジックコメントに修正したい
      targetLanguageCode: lang.code,
    };

    const [response] = await translationClient.translateText(request);

    for (const translation of response.translations) {
      const fs = require("fs")
      fs.writeFileSync(`./translateResult/${lang.label}_result.txt`, translation.translatedText)
    }
    console.log(`${lang.label} 書き込み完了`)
  })
}

translateText()

