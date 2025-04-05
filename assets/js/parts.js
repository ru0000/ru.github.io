// ------------------------------
// 文字数カウント
// ------------------------------
function countText() {
	var result = document.getElementById("countTextarea").innerText.replace(/\s+/g,'').length;
	result = Math.round(result/100)*100; // 100文字単位で丸める
	document.getElementById("countResult").innerText = '約' + result + '文字';
}

// ------------------------------
// コピペ時ふりがなON/OFF
// ------------------------------
function rubyToggle(kakkoFlg = true){
	if(typeof kakkoFlg != "boolean") {
		// 想定と異なる値が渡された場合、デフォルト値「true」に書き換え
		kakkoFlg = true;
	}

	var rubyToggle = document.querySelector('input#toggle');
	if(rubyToggle.checked === true) {
		rubyOn(kakkoFlg);
	}else{
		rubyOff();
	}
}

// ルビOFF時
function rubyOff(){
	var c = document.body.className;
	if( c.match(/\s*rubyoff/) ){ return }
	document.body.className = c ? c+" rubyoff" : "rubyoff" ;
	setTimeout( function(){ document.body.className = c }, 100 );
}

// ルビON時
function rubyOn(kakkoFlg){
	const kakkoBefore = "("; // 前括弧
	const kakkoAfter  = ")"; // 後括弧

	var c = document.body.className;
	if( c.match(/\s*rubyon/) ){ return }
	var rubyOnHTML=new Array();
	var rubyOnText=new Array();
	var ruby = document.getElementsByTagName('ruby');
	// var rp = document.getElementsByTagName('rp');

	// 元の値を保持
    for(var i = 0; i < ruby.length; i++) {
		rubyOnHTML[i] = ruby[i].innerHTML;
		rubyOnText[i] = ruby[i].innerText;
	  }

	// ルビ情報を取得・整形
    for(var i = 0; i < ruby.length; i++) {
		if (kakkoFlg == false) {
			// 括弧が不要な場合
			kakkoBefore = "";
			kakkoAfter  = "";
		}
		ruby[i].innerHTML = ruby[i].innerHTML.replace("<rt>", kakkoBefore) + kakkoAfter;
		ruby[i].innerText = ruby[i].innerHTML.replace(/<r[a-z]*>|<\/r[a-z]*>/g, "");
	  }

	setTimeout( function(){ 
		// 元の値に戻す
		document.body.className = c
	    for(var i = 0; i < ruby.length; i++) {
		ruby[i].innerText = rubyOnText[i];
		ruby[i].innerHTML = rubyOnHTML[i];
	  }
	}, 100 );
}

// ------------------------------
// 単語置換
// ------------------------------
function changeWord() {
	var arrDefWord=new Array();
	var arrWord=new Array();

	// 置換対象の単語数（決定・リセットボタン分を数から引くため-2する）	
	var wordCount = document.change.getElementsByTagName('input').length - 2;

    for(var i = 0; i < wordCount; i++) {
		var inputItem = document.change.getElementsByTagName('input').item(i);
		arrDefWord[i] = inputItem.placeholder;// 置換前
		arrWord[i] = inputItem.value;// 置換後
	}

	// 置換処理
	for(var i = 0; i < wordCount; i++) {
		if (arrWord[i]) {
		document.body.innerHTML = document.body.innerHTML.split(arrDefWord[i]).join(arrWord[i]);
	}
	document.change.getElementsByTagName('input').item(i).setAttribute('placeholder',arrWord[i]?arrWord[i]:arrDefWord[i]);
	document.change.getElementsByTagName('input').item(i).setAttribute('value',arrWord[i]);
  }
}

// ------------------
// ページ更新
// ------------------
function pageReload(){
	window.location.reload();
}