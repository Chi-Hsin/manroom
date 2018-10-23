if(localStorage.getItem("setup_enter_action") == null) //如果沒有創建就創建一個
{
	localStorage.setItem("setup_enter_action","checked");
	// alert(localStorage.getItem("setup_enter_action"))
}
if(localStorage.getItem("setup_enter_action") != "checked")
{
	$("#setup_enter_action").attr("checked",false);
}





 if(localStorage.getItem("user_data") == null)//如果有登入第三方帳號 而不是訪客的身分  就隱藏部分欄位(無法修改)
 {
  $("#sign_out").hide();
  $(".sign_in,#name_fix").show();
 }
 else
 {
  $(".sign_in,#name_fix").hide();
  $("#sign_out").show();
 }