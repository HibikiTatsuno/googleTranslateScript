require('dotenv').config();
const {TranslationServiceClient} = require('@google-cloud/translate');


const projectId = process.env.GCP_PROJECT_ID
const location = 'global'


const translationClient = new TranslationServiceClient();

async function translateText() {
  // Construct request
  const request = {
    parent: `projects/${projectId}/locations/${location}`,
    contents: [targetTranslateText],
    mimeType: 'text/plain', // mime types: text/plain, text/html
    sourceLanguageCode: 'ja',
    targetLanguageCode: 'ko',
  };

  // Run request
  const [response] = await translationClient.translateText(request);

  for (const translation of response.translations) {
    console.log(`Translation: ${translation.translatedText}`);
  }
}

translateText();