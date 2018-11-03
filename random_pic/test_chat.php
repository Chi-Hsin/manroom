<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
  <div id="welcome_title">
    <img src="../utility_img/zoom_out.png" alt="縮小" title="縮小" id="zoom_out">
    <img src="../utility_img/setup.png" alt="設定" title="設定" id="setup">
    <div id="setup_box">
      <input type="checkbox" checked="checked" id="setup_enter_action">Enter鍵直接送出對話,Shift+Enter換行
      <input type="checkbox">測試設置選項
    </div>
  </div>
  <div id="chat_area"></div>
  <div id="name_btn">
    <input type="text" id="name" placeholder="輸入一個帥氣的暱稱">
    <button>進入聊天室</button>
  </div>
  <div id="name_after">
    <div id="input_area" autofocus  contenteditable="true" ></div>
    <button id="msg_send">送出</button>
    <button id="name_fix">修改暱稱</button>
    <!-- <button id="test_delete">刪除所有資料測試</button> -->
    <button id="sign_out">登出</button>
    <button class="sign_in" id="fb_sign_in">FB登入</button>
    <button class="sign_in" id="gg_sign_in">Google登入</button>
    表情符號<img src="../utility_img/icon/shake.gif" alt="" style="width:30px;height:30px;cursor: pointer;" class="test_icon">
    <?php require("emoji.php")?>
    <div id="user_list" style="background: pink;width: 30%;height:100px;overflow: auto;position: absolute;right: 0;bottom:0">
      
    </div>
  </div>
 
</body>
</html>
