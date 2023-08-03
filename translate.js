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
  const targetText = fileTexts

  LANGUAGES.forEach(async(lang) => {
    const request = {
      parent: `projects/${projectId}/locations/${location}`,
      contents: [targetText],
      mimeType: 'text/plain',
      sourceLanguageCode: 'ja', //マジックコメントに修正したい
      targetLanguageCode: lang.code,
    };

    const [response] = await translationClient.translateText(request);

    const fs = require("fs")

    for (const translation of response.translations) {
      if (lang.code === "zh-CN"){
        fs.writeFileSync(`./translateResult/${lang.label}_中国語(簡体字)_result.txt`, translation.translatedText)
      }
      else if (lang.code === "zh-TW") {
        fs.writeFileSync(`./translateResult/${lang.label}_中国語(繁体字)_result.txt`, translation.translatedText)
      }
      else {
        fs.writeFileSync(`./translateResult/${lang.label}_result.txt`, translation.translatedText)
      }
    }
    console.log(`${lang.label} 書き込み完了`)
  })
}

translateText()

