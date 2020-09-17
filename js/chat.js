// Your web app's Firebase configuration
//APIkeyはgithubに上げない
var firebaseConfig = {};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const ref = firebase.database().ref(); //.ref()=ユニークキーを自動で降ってください

const date = new Date();
let character_id = null;
let character_img = null;

//送信
function send() {
  let text_send = null;
  //テキストエリアに文字が入力されている場合、trueを返す
  if ($('#text').val()) {
    text_send = true;
  } else {
    //入力されていない場合、送信していいか確認する
    const result = confirm('未入力のまま送信しますか？');
    if (result) {
      text_send = true;
    } else {
      return;
    }
  }

  if (text_send == true) {
    getCharaImage();
    const chara = character_img;
    const uname = $('#uname').val();
    const time =
      date.getFullYear() +
      '年' +
      (date.getMonth() + 1) +
      '月' +
      date.getDate() +
      '日' +
      date.getHours() +
      '時' +
      date.getMinutes() +
      '分';
    const text = $('#text').val();
    const msg = {
      chara: chara,
      uname: uname,
      time: time,
      text: text,
    };
    ref.push(msg); //set = 決まった名前、push=ユニーク setは上書きになる
    pageDown();
    deleteInput();
  }

  // $('html, body').animate({ scrollTop: $('body').get(0).scrollHeight });
}

//文字を送信

$('#send').on('click', function () {
  if ($('#uname').val()) {
    send();
  } else {
    alert('名前を入れてください！');
  }
});

//受信処理
ref.on('child_added', function (data) {
  const v = data.val(); //送信されたオブジェクトを取得
  const k = data.key; //ユニークキーの取得
  const h =
    '<div class="baloon_l"><div class="faceicon"><img src=' +
    v.chara +
    ' alt="" ><p class="name">' +
    v.uname +
    '</p></div><div class = "talk"><p class="says"><br>' +
    v.text +
    '<br>' +
    v.time +
    '</p></div></div>';
  $('#output').append(h);
});

//イベント情報取得・エンターで送信
$('#text').on('keydown', function (e) {
  // console.log(e);
  if (e.keyCode == 13) {
    if ($('#uname').val()) {
      send();
    } else {
      alert('名前を入れてください！');
    }
  }
});

//最下部に移動
function pageDown() {
  const lastElement = document.querySelector('#output').lastElementChild; //最後の要素を取得
  lastElement.scrollIntoView({ behavior: 'smooth' }); //最後の要素が見えるまでスクロール
}

//入力したテキストを削除
function deleteInput() {
  $('#text').val('');
  $('#uname').val('');
  document.getElementById('text').blur();
  document.getElementById('uname').blur();
}

//キャラクタークリックでトーク画面に反映

//クリックで座標が取れる
//   $('body').on('click', function (e) {
//     console.log(e);
//   });

// overflow:auto;で決めた部分でスクロール

//最後の文書をクリックしたタイミングで表示

let $buke_img = document.getElementById('buke-img');
let $caram_img = document.getElementById('caram-img');
let $tuku_img = document.getElementById('tuku-img');

reset_styles = function () {
  $buke_img.style.opacity = 1;
  $caram_img.style.opacity = 1;
  $tuku_img.style.opacity = 1;
};

change_style = function (button) {
  button.style.opacity = 0.5;
  character_id = button.id;
};

$buke_img.addEventListener('click', function () {
  reset_styles();
  change_style(this);
});

$caram_img.addEventListener('click', function () {
  reset_styles();
  change_style(this);
});

$tuku_img.addEventListener('click', function () {
  reset_styles();
  change_style(this);
});

// デフォルトで未完了のみ表示
reset_styles();
change_style($buke_img);

//キャラクターIDと画像を紐付け
function getCharaImage() {
  if (character_id === 'buke-img') {
    character_img = 'imgs/buke.png';
  } else if (character_id === 'caram-img') {
    character_img = 'imgs/caram.png';
  } else if (character_id === 'tuku-img') {
    character_img = 'imgs/tuku.jpg';
  }
}
