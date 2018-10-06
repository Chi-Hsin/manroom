//Window Onload progress
  $(function(){

 $("#welcome_title").html("歡迎來到"+room_num+"聊天室");


setTimeout(function(){$("#loading").hide()},2000);
if(localStorage.getItem("color") == null) //新進使用者獲得一個隨機顏色
{
  var color_picker = new get_random_color();
  localStorage.setItem("color",color_picker.color);
}
if(localStorage.getItem("name") != null)
{
  $("#name_btn").hide();
  $("#name_after").show();
}
$("#name_fix").click(function(){//修改名稱
  $(this).parent().hide();
  $("#name_btn").show();
})






  $("#name_btn button").click(function(){//輸入暱稱
    var $f = $(this).parent();
    // var reg = /^[\u4e00-\u9fa5_|a-zA-Z0-9]+$/;//中文.英文.數字
    if($f.find("input").val() != "")
    {
      $("#name_after").show();
      $f.hide();
      localStorage.setItem("name",$f.find("input").val());
    }
  })
  if(localStorage.getItem("img_data") == null)
{
  var s = document.createElement("script");//JSONP的方式匯入Img.php的指令檔
  s.src = "img.php";
  document.body.appendChild(s);
}
else{
  // alert("已連接資料庫")
  pic_operate();
  
};

(function(){
  // setInterval(click_sth,5000);//每5秒執行一次換圖
})()
      

$("button#change_btn").on("click",click_sth);//按鈕綁定方法
$("#pic_list button#del_record").click(function()//清除本地端的紀錄
  {
      if(confirm("確定永久刪除紀錄嗎?"))
      {
        localStorage.removeItem("pic_list");
        $(this).parent().find("img").remove();
        ls.init();//初始化pic_list的資料
      }
  });
$("body").on("click","#test_img img",click_sth);//監聽動態產生的小圖 賦予它綁定事件
$("body").on({//監聽動態產生的小圖 賦予它綁定事件
               mousemove: function(e)
               {
                  var safe_dist = 8; //滑鼠指標和預覽圖的安全距離
                  var dotted = 10;//5*2 周圍的點5px,有兩個邊有點
                  var y = e.clientY+safe_dist;
                  var x = e.clientX+safe_dist;
                  if(y+$("#origin_pic_show").height()+dotted > $(window).height())
                  //如果預覽圖太底部  往上移動一些
                  {y = e.clientY-$("#origin_pic_show").height()-2*safe_dist;}
                  if(x+$("#origin_pic_show").width()+dotted > $(window).width())
                  //如果預覽圖太右邊  往左移動一些
                  {x = e.clientX-$("#origin_pic_show").width()-2*safe_dist;}
                  $("#origin_pic_show").offset({left:x,top:y})
               },
               mouseover: function(e)
               {
                  $("#origin_pic_show img").attr("src",this.src).parent().show();
                  //這邊的this指的是#pic_list裡面的img圖
               },
               mouseout: function()
               {
                  $("#origin_pic_show").hide();
               }
             },"#pic_list img");
$("#welcome_title").on({ //可拖動聊天視窗
                mousedown:function(e)
                {
                  dragging = true;
                  dragx = e.clientX - $(this).parent().position().left;
                  dragy = e.clientY - $(this).parent().position().top;
                },
                mouseup:function()
                {
                  dragging = false;
                },
                mousemove:function(e)
                {
                  if(dragging)
                  {
                    $("#mychat_box").offset({
                                              top:e.clientY-dragy,
                                              left:e.clientX-dragx
                                           })
                  }
                }
})
$("#pic_list").on("dragover",function(e){e.preventDefault();})
              .on(
                  {
                    mousedown: function()
                            {
                              $(this).attr("draggable",true)
                            },//可拖動
                    dragstart: function(e)//拖拉的時候資料可以轉移
                            {
                              e.originalEvent.dataTransfer.setData("src",e.target.src)
                            }
                  },"img")
$("#chat_area").on(
                    {
                      dragover: function(e){e.preventDefault()},
                      drop: function(e)
                        {
                          e.preventDefault();
                          var filelist = e.originalEvent.dataTransfer.files;
                          // var path = (filelist.length == 0)//如果檔案列表是空的就是從內部拖移照片過來的
                          //     ?e.originalEvent.dataTransfer.getData("src")
                          //     :URL.createObjectURL(filelist[0]);
                          if(filelist.length == 0)
                            {
                              img_tmp_path = e.originalEvent.dataTransfer.getData("src")
                              write(img_tmp_path,"src");
                            }
                          else
                          {
                            var reader=new FileReader();//使用FileReader讀取圖片並轉化base64型態的URL網址字串  以利儲存
                            reader.readAsDataURL(filelist[0]);
                            reader.onload = function()
                            {
                              img_tmp_path = this.result;
                              write(img_tmp_path,"src");
                            }
                          }
                          
                        }
                    }
                  )
// $("#name_after img").click(function(){
//   var img = document.createElement("img");
//   img.src = $(this).attr("src");
//   $("#input_area").append(img);
// })
  $("#name_btn").on("keydown",function(e)//輸入暱稱
  {
    if(e.key == "Enter")
    {
      var reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;
      if(reg.exec($(this).find("input").val()) != null)
      {
        $("#name_after").show().find("#input_area").focus();
        $(this).hide();
        localStorage.setItem("name",$(this).find("input").val());
      }
    }
  })
  $("#input_area").on('keydown', function(e)//輸入對話欄
  {
    // if(e.key == "Enter" && e.target.value != "")
    // {
    //   write($(this).val(),"text");
    //   $("#input_area").val("");
    //   var e = document.getElementById("chat_area");
    //   e.scrollTop = e.scrollHeight;
    // }
  });
  $("#msg_send").click(function(e){
      write($("#input_area").html(),"text");
      $("#input_area").html("");
      var e = document.getElementById("chat_area");
      e.scrollTop = e.scrollHeight;
      // alert($("#input_area").html())
  })
  $("#test_icon").click(function(){
    // $("#input_area").append("<p>123</p>");
    var img = document.createElement("img");
    img.classList.add("icon_emotion");
    img.src = this.src;
    $("#input_area").append(img);
  })
my_db.once("value",function(s)//資料第一次全部載入
  {
      $("#chat_area").html("");
      for(var i in  s.val())
      {
       var sv = s.val()[i];
       append_dialogue(sv);
      }
      // alert("加載完成")
  })
  my_db.limitToLast(1).on("value",function(s)//最後變動資料  一有資料寫入就會即時更新聊天室的消息顯示紀錄
  {
    
    for(var i in  s.val())
    {
      var sv = s.val()[i];
      append_dialogue(sv); //處理sv =放上相對應的顯示訊息
      for(var j in msg_event)
      {
        if(sv.content.indexOf(msg_event[j].txt) != -1)
        {
          msg_event[j].fn();
          my_db.push(
          {
            type: "text",
            name: "機器人",
            content: msg_event[j].msg,
            color: localStorage.getItem("color"),
            time: getTime()//這筆紀錄就存到資料庫的下一筆資料  下個迴圈就會印出來
          })
        }
      }
    }
  })
})//document.ready結尾