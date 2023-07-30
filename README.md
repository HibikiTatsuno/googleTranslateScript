# googleTranslateScriptの使い方　※APIkeyの設定が必要です

1. 翻訳対象の日本をテキストファイルに用意

`./japaneseSource.txt`に翻訳したい日本語のリストを一覧で書き込む。
書き込むときには、一つの単語ごとに改行をするようにする。

記入例↓
```
母親
パソコン
携帯
リモコン
```

2. scriptを実行する

terminalにてファイルを実行する
`$ node translate.js`

3. 翻訳結果を確認する

翻訳結果は、言語ごとにファイルに書き込む形で出力している。
`translateResult`のフォルダに結果を出力している
