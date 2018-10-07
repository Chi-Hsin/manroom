<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
  <h1 id="welcome_title">
    <img src="../utility_img/zoom_out.png" alt="縮小" title="縮小" id="zoom_out">
    <img src="../utility_img/setup.png" alt="設定" title="設定" id="setup">
  </h1>
  <div id="chat_area"></div>
  <div id="name_btn">
    <input type="text" id="name" placeholder="輸入一個帥氣的暱稱">
    <button>進入聊天室</button>
  </div>
  <div id="name_after">
  	<!-- <input type="text" id="input_area" autofocus placeholder="輸入一些對話吧"> -->
     <div type="text" id="input_area" autofocus placeholder="輸入一些對話吧" style="overflow:auto;width:200px;min-height:30px;max-height:80px;border:1px #000 solid;display: inline-block;margin:10px 0 0 10px" contenteditable="true"></div>
    <button id="msg_send">送出</button>
    <button id="name_fix">修改暱稱</button>
    表情符號<img src="../utility_img/icon/shake.gif" alt="" style="width:30px;height:30px;cursor: pointer;" id="test_icon">
  </div>
 
</body>
</html>
