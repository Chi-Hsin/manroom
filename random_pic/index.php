<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>百俊誌</title>
</head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://www.gstatic.com/firebasejs/5.2.0/firebase.js"></script>
<script src="js/config.js"></script>
<script src="js/event.js"></script>
<script src="js/firebase_config.js"></script>
<link rel=stylesheet type="text/css" href="css/page.css">
<body>
<!-- <div id="loading"><img src="css/loading2.gif" alt=""></div>	 -->
<!-- <h1>每5秒隨機產生圖片</h1> -->
<h3>直接點擊圖片試試看吧!</h3>
<div id="mychat_box_zo">
	<img src="../utility_img/talk.png" alt="">
	<img src="../utility_img/zoom_in.png" alt="放大" title="放大" id="zoom_in">
</div>
<div id="test_img"></div>
<div id="pic_list">
  <button id="del_record">清除紀錄</button>
  <button id="change_btn">點擊更換隨機圖片</button>
</div>
<div id="origin_pic_show">
  <img src="" alt="預覽圖">
</div>
<div id="mychat_box"><?php require(dirname(__FILE__)."/test_chat.php")?></div>
</body>
</html>