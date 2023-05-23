'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivision = document.getElementById('result-area');
const tweetDivision = document.getElementById('tweet-area');

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    // 名前が空の時は処理を終了する
    return;
  }
  console.log(userName);

  // 診断結果表示エリアの作成
  resultDivision.innerText = '';
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivision.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivision.appendChild(paragraph);

  // TODO ツイートエリアの作成
  tweetDivision.innerText = '';
  const anchor = document.createElement('a');
  const hrefValue =
    'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent('今日の朝ごはん') +
    '&ref_src=twsrc%5Etfw';
  anchor.setAttribute('href', hrefValue);
  anchor.setAttribute('class', 'twitter-hashtag-button');
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #今日の朝ごはん';

  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivision.appendChild(script);
  tweetDivision.appendChild(anchor);
};

userNameInput.onkeydown = event => {
  if (event.key === 'Enter') {
    assessmentButton.onclick();
  }
}

const answers = [
  '###userName###の今日の朝ごはんはトーストです。',
  '###userName###の今日の朝ごはんはおにぎりです。',
  '###userName###の今日の朝ごはんはドーナツです。',
  '###userName###の今日の朝ごはんは味噌汁です。',
  '###userName###の今日の朝ごはんは卵焼きです。',
  '###userName###の今日の朝ごはんは目玉焼きです。',
  '###userName###の今日の朝ごはんはサンドイッチです。',
  '###userName###の今日の朝ごはんはサラダです。',
  '###userName###の今日の朝ごはんはスクランブルエッグです。',
  '###userName###の今日の朝ごはんはスープです。',
  '###userName###の今日の朝ごはんは抜きです。',
  '###userName###の今日の朝ごはんはヨーグルトです。',
  '###userName###の今日の朝ごはんはフレンチトーストです。'
]




/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('###userName###', userName);
  return result;
}

// テストコード
console.assert(
  assessment('太郎') === assessment('太郎'),
  '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません'
);