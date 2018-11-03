//Window Onload progress
  $(function(){

 $("#welcome_title").append("<h1>歡迎來到"+room_num+"聊天室</h1>");

var s = document.createElement("script");//引入設置相關的JS文件
s.src = "js/setup.js";
document.body.appendChild(s);
append_dialogue_operator = new append_dialogue(); //製造一個用來產生對話用的物件  供全域使用


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
$("#zoom_out").click(function(){ //縮小視窗
    $("#mychat_box").slideUp(function(){
      $("#mychat_box_zo").show();
    });
})
$("#zoom_in").click(function(){//放大視窗
   $("#mychat_box_zo").hide(function(){
      $("#mychat_box").show();
    });
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
    if(localStorage.getItem("setup_enter_action") == "checked")
    {
      if(e.key == "Enter" && e.target.value != "")
      {
        // write($(this).val(),"text");
        // $("#input_area").val("");
        
        if(e.shiftKey)//換行
        {
           //alert()
        }
        else
        {
           $("#msg_send").click();
           e.preventDefault();
        }
      }
    }
  });
  $("#setup_enter_action").click(function(){
    if(localStorage.getItem("setup_enter_action") == "checked")
    {
      localStorage.setItem("setup_enter_action","unchecked");
      alert(localStorage.getItem("setup_enter_action"))
    }
    else
    {
      localStorage.setItem("setup_enter_action","checked");
      alert(localStorage.getItem("setup_enter_action"))
    }
  })


  $("#msg_send").click(function(e){
      var msg_event = new message_event($("#input_area").html(),$("#input_area").text());
      msg_event.check1().check2().check3().check4().check5().check6();
      
      // alert($("#input_area").html())
  })
  $("#EmojiBox").on("click",".test_icon",function(){
    $("#input_area").focus();
    var selection = getSelection();
    var range = selection.getRangeAt(0);
    if($(this).prop("tagName") == "IMG")
    {
      var img = document.createElement("img");
      img.classList.add("icon_emotion");
      img.src = this.src;
      range.insertNode(img);
    }
    else
    {
      var span = document.createElement("span");
      span.innerHTML = $(this).html();
      range.insertNode(span);
    }
    // var textNode = range.startContainer;
    //   var rangeStartOffset = range.startOffset;
      // range.setStart(textNode,
      //                 textNode+1);
    range.collapse(true);
    selection.addRange(range);
  })
  $("#setup").click(function(){//是否隱藏設置的框框
    if(setup_box ==1)
    {
      $("#setup_box").slideUp();
      setup_box = 0;
    }
    else
    {
      $("#setup_box").slideDown();
      setup_box = 1;
    }
  })
  $("#test_delete").click(function(){
    firebase.database().ref("/"+room_num+"/public_message").remove();
  })
  $(".sign_in").click(function(){  //使用者登入
    if($(this).attr("id") == "fb_sign_in")
    {
      var provider = new firebase.auth.FacebookAuthProvider();
    }
    else if($(this).attr("id") == "gg_sign_in")
    {
      var provider = new firebase.auth.GoogleAuthProvider();
    }
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var user_data = JSON.stringify(result.user.providerData[0]);
      var data = result.user.providerData[0];
      localStorage.setItem("user_data",user_data);
      firebase.database().ref(room_num).child("online_user").child(data.uid).set(data.displayName);
      window.location.reload();
      
    }).catch(function(error) {
      // 處理錯誤
      var errorCode     = error.code;
      var errorMessage  = error.message;     
      var email         = error.email;      // 使用者所使用的 Email
      var credential    = error.credential;
      console.log(errorCode+","+errorMessage+","+credential);
    });
  })
  $("#sign_out").click(function(){
    firebase.auth().signOut()
                   .then(function()
                    {
                      var name = localStorage.getItem("name");
                      var uid = JSON.parse(localStorage.getItem("user_data")).uid;
                      firebase.database().ref(room_num)
                                         .child("online_user")
                                         .child(uid)
                                         .remove();
                      localStorage.removeItem("user_data");
                      localStorage.removeItem("name");
                      alert("已登出");
                      window.location.reload();
                    })

                   // .catch(function(e){alert(e)})
  })
$("#user_list").on("click",".online_user_name",function()
                                                  {
                                                    $("#input_area").focus();
                                                    var selection = getSelection();
                                                    var range = selection.getRangeAt(0);
                                                     var span = document.createElement("span");
                                                    span.innerHTML = $(this).text();
                                                    range.insertNode(span);
                                                    range.collapse(true);
                                                    selection.addRange(range);
                                                  })
firebase.database().ref(room_num+"/online_user").on("value",function(s)//關注使用者名單節點的變化
{
  //偵測到有新的使用者登入
  $("#user_list").html("在線使用者名單");
  for(var i in s.val())
  {
    var p = document.createElement("p");
    var a = document.createElement("a");
    a.innerText = s.val()[i];
    a.href = "javascript:;"
    p.className = "online_user_name";
    p.id =  Object.keys(s.val())[0];
    p.appendChild(a);
    $("#user_list").append(p);
  }
  // var keys = Object.keys(s.val());
  // var mykey = keys[0];
  // console.log(s.val()[mykey]);
    // $("#user_list").append("<p>"+s.val()[mykey]+"</p>")
})
firebase.database().ref("/"+room_num+"/public_message").once("value",function(s)//資料第一次全部載入
            {
              $("#chat_area").html("");
              for(var i in  s.val())
              {
               var sv = s.val()[i];
              append_dialogue_operator.get(sv).public()
              }
            })
     .then(function()
            {
              var e = document.getElementById("chat_area");//所有訊息載入成功後  直接到達底部
              e.scrollTop = e.scrollHeight;
            })
firebase.database().ref("/"+room_num+"/public_message").limitToLast(1).on("value",function(s)//最後變動資料  一有資料寫入就會即時更新聊天室的消息顯示紀錄
  {
    // for(var i in  s.val())
    // {
    //   var sv = s.val()[i];
    //   append_dialogue(sv); //處理sv =放上相對應的顯示訊息
    //   for(var j in msg_event)
    //   {
    //     if(sv.content.indexOf(msg_event[j].txt) != -1)
    //     {
    //       msg_event[j].fn();
    //       firebase.database().ref("/"+room_num+"/public_message").push(
    //       {
    //         type: "text",
    //         name: "機器人",
    //         content: msg_event[j].msg,
    //         color: localStorage.getItem("color"),
    //         time: getTime()//這筆紀錄就存到資料庫的下一筆資料  下個迴圈就會印出來
    //       })
    //     }
    //   }
    // }
    for(i in s.val())
    {
     append_dialogue_operator.get(s.val()[i]).public()
    }
    $("#input_area").html(""); //寫入資料庫後  這邊有了變動  也就是送出訊息後  清空這個對話框
    var e = document.getElementById("chat_area");
    e.scrollTop = e.scrollHeight; //置底
  })
})//document.ready結尾