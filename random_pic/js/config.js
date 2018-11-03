  //存全域變數
var postData,     //存放FireBase時儲存的物件資料
    img_tmp_path,//用來移轉時用的圖片暫存路徑
    dragging = false,dragx,dragy, 
    room_num = "百俊誌",//房間的編號、類型
    msg_event = 
    [
      {
         txt: "你好",
         msg: "歡迎哦~你也好啊!",
         fn: function(){}
      },
      {
         txt: "你是誰",
         msg: "我是機器人^Q^",
         fn: function(){}
      },
      {
         txt: "這是什麼網站",
         msg: "很多圖片的網站哦~",
         fn: function(){}
      }
      ,
      {
         txt: "換圖",
         msg: "換好了",
         fn: function(){click_sth();}
      }
    ],
    setup_box = 0;//設置的BOX是否隱藏
function message_event(msg_html,msg_txt)//傳進HTML碼 純文字做判斷
{
  // var event =
  //   [
  //     {
  //        txt: "你好",
  //        msg: "歡迎哦~你也好啊!",
  //        fn: function(){}
  //     },
  //     {
  //        txt: "你是誰",
  //        msg: "我是機器人^Q^",
  //        fn: function(){}
  //     },
  //     {
  //        txt: "這是什麼網站",
  //        msg: "很多圖片的網站哦~",
  //        fn: function(){}
  //     }
  //     ,
  //     {
  //        txt: "換圖",
  //        msg: "換好了",
  //        fn: function(){click_sth();}
  //     },
  //     {
  //        txt: "aaa",
  //        msg: "aaa的動作",
  //        fn: function(){}
  //     },
  //     {
  //        txt: "abc",
  //        msg: "bbb的動作",
  //        fn: function(){}
  //     }
  //   ]
  var event_list = 
  {
    "hello": function(user,target)
    {
      this.txt = "你好";
      this.action1 = user+"向"+target+"問好";
      this.type = "action";
    },
    "who": function(user,target)
    {
      this.txt = "你是誰";
      this.content = "我是機器人^Q^";
      this.type = "robot";
    },
    "what": function(user,target)
    {
      this.txt = "這是什麼網站?";
      this.content = "很多圖片的網站哦~";
      this.type = "robot";
    },
    "change": function(user,target)
    {
      this.txt = "換圖";
      this.content = "換好了";
      this.type = "robot";
    },
    "aaa": function(user,target)
    {
      this.txt = "aaa";
      this.action1 = user+"對空氣做出了aaa的動作";
      this.action2 = user+"對"+target+"做出了aaa的動作";
      this.action3 = user+"對自己做出了aaa的動作";
      this.type = "action";
    },
    "bbb": function(user,target)
    {
      this.txt = "bbb";
      this.action1 = user+"對空氣做出了bbb的動作";
      this.action2 = user+"對"+target+"做出了bbb的動作";
      this.action3 = user+"對自己做出了bbb的動作";
      this.type = "action";
    }
  }
  var that =this;
  this.msg_html = msg_html;
  this.msg_txt = /^\/(\w+)\s*([\u4e00-\u9fa5_a-zA-Z0-9_-\s]*)$/.exec(msg_txt);
  this.check1 = function() //正則表達式檢查
  {
   if(this.msg_txt != null)
    {
      // alert("check1 OK!")
      return this;
    }
    else // 如果不符合正則表達式 則為正常的訊息發送
    {
      write.call(this,this.msg_html,"text");
    }
  }
  this.check2 = function()  //檢查有登入才能使用該功能
  {
     if(localStorage.getItem("user_data")) //確認有登入
    {
      that.user_data = JSON.parse(localStorage.getItem("user_data"));
      // alert("check2 OK!")
      return this;
    }
    else
    {
      alert("請先登入")
    }
  }
  this.check3 = function() //輸入的指令對照指令表  尋找相同字串匹配的指令
  {
    for(i in event_list)
    {
      if(this.msg_txt[1] == i)
      {
        // alert("check3 OK!");
        this.event = new event_list[i](this.user_data.displayName,this.msg_txt[2]);//紀錄符合的指令
        return this;
      }
    }
    alert("無效指令")
  }
  this.check4 = function()//後面是否有接名字
  {
    if(this.msg_txt[2] != "")
    {
      // alert("check4 OK!")
      return this;
    }
    else //如果沒接名字  直接使用該指令
    {

      if(this.event.type == "robot") //如果是機器人指令  直接顯示在自己的聊天區域 
                                     //不寫進資料庫(只有自己看的到  其他人不會看到)
      {
        append_dialogue_operator.get(this.event).private();
        document.getElementById("input_area").innerHTML = "";
        var e = document.getElementById("chat_area");
        e.scrollTop = e.scrollHeight; //置底
      }
      else //如果是動作指令  就寫進資料庫
      {
        write.call(this,this.event.action1,this.event.type)
      }
      
    }
  }
  this.check5 = function() //檢查該名字是否在使用者名單上
  {
    
    var count = 0
    // this.count = 0;
    firebase.database().ref(room_num).child("online_user").once("value",(s) => {
      for(i in s.val())
      {
        if(that.msg_txt[2] == s.val()[i])
        {
          count += 1;
        }
      }
    })
    if(count ==1)
    {
      // alert("check5 OK!")
      return this;
    }
    else
    {
     alert("查無此人");
    }
  }
  this.check6 = function() //後面接的名字是誰
  {
    if(this.user_data.displayName == this.msg_txt[2]) //如果是自己
    {
      // alert("check6 OK!");
      write.call(this,this.event.action3,"action")
    }
    else // 如果是其他人
    {
      // alert("check6-2 OK!");
      write.call(this,this.event.action2,"action")
    }
  }

}



























//function below
// function check_signin() //檢查是否有登入
// {
//   if(localStorage.getItem("user_data"))
//   {
//     return true;
//   }
//   else
//   {
//     return false;
//   }
// }
function write(content,type)//寫入資料庫
{
  var postData = 
  {
     type: type,
     name: localStorage.getItem("name"),
     time: getTime(),
     content: content,//存入的內容  文字或圖檔
     color: localStorage.getItem("color")
  };
  var store_needed = ["text","action","src"]; //這三個類型的訊息  需要另外存進資料庫
  if(store_needed.includes(type)) // 如果要寫進的訊息類型  包括以上這三種  就存進資料庫
  {
    
    if(localStorage.getItem("user_data") != null)//如果有登入  個人訊息存一份在資料庫
    {
      var user_data = JSON.parse(localStorage.getItem("user_data"));
      postData.name = user_data.displayName; //如果已經有登入  使用登入的名稱
      firebase.database().ref(room_num)
                         .child("user")
                         .child(user_data.uid)
                         .child("all_message")
                         .push(postData);
    }
    firebase.database().ref("/"+room_num+"/public_message").push(postData);//公共訊息存一份
  }

    
    
}
function getTime()
{
  var date = new Date();
  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();
  var ms = date.getMilliseconds();
  if(h<10){
    h = '0'+h;
  }
  if(m<10){
    m = '0' + m;
  }
  if(s<10){
    s = '0' + s;
  }
  var now = h+':'+m+':'+s; //獲取按下按鈕或 enter 的當下時間
  return now;
}
function append_dialogue()//聊天框內產生對話內容
{
  this.get = function(obj)
  {
    this.obj = obj;
    return this;
  }
  this.public = function() //公共頻道上產生對話
  {
    var p = document.createElement("p");
    var name_zone = document.createElement("span");
    var time_zone = document.createTextNode(this.obj.time);
    var content_zone = document.createElement("span");
    if(this.obj.type == "text")
    {
      content_zone.innerHTML = this.obj.name+"說：<div class='content_zone'>"
                                            +this.obj.content
                                            +"</div>";
    }
    else if(this.obj.type == "src")
    {
      content_zone.innerHTML = this.obj.name + "放上了一張圖片"
                                             +"<div class='content_zone'><img src='"
                                             +this.obj.content
                                             +"'></div>";
    }
    else//動作
    {
       content_zone.innerHTML = this.obj.content;
    }
    content_zone.style.marginLeft = "10px";
    // name_zone.innerText = obj.name;
    // name_zone.className = "chat_name";
    // name_zone.style.color = obj.color;
    $("#chat_area").append(p)
                   .find(p)
                   .append(time_zone)
                   .append(content_zone);
  }
  this.private = function() //私人頻道上產生對話
  {
    var p = document.createElement("p");
    var name_zone = document.createElement("span");
    var content_zone = document.createElement("span");
    content_zone.innerHTML = "機器人說:"+this.obj.content;
    $("#chat_area").append(p)
                   .find(p)
                   .append(content_zone);
  }
  
}
function get_random_color()
{
  this.r = Math.floor(Math.random()*255);
  this.g = Math.floor(Math.random()*255);
  this.b = Math.floor(Math.random()*255);
  this.color = 'rgba('+ this.r +','+ this.g +','+ this.b +',0.8)';
}


function click_sth()//換圖片
{

 var img_data = JSON.parse(localStorage.getItem("img_data"));//重新解析出來
  var random_num = Math.floor( Math.random() * (img_data.length) );//隨機產生數字
  $("#test_img img").attr("src",img_data[random_num]);//換圖
  var img = document.createElement("img");
  img.src = img_data[random_num];
  img.onload = function()
  {
    $("#pic_list").append(this);
    // scroll_down();
  }//紀錄加圖
  ls.pic_list(img_data[random_num]);//加進紀錄

}
function database_connect(data)//連接資料庫
{   
    // for(var i=0;i<data.length;i++)
    // {
     
    //     var xhr = new XMLHttpRequest();
    //     xhr.onload = function()
    //     { 
    //       var reader = new FileReader();
    //       reader.readAsDataURL(this.response);
    //       reader.onload = function()
    //       {
    //         base64_data.push(this.result);
    //       }
    //     }
    //     xhr.open("GET",data[i]);
    //     xhr.responseType = "blob";
    //     xhr.send();
    // }
    ls.init().img_data(data);
   // alert("連線資料庫成功!");
   // alert("初始化所有資料成功!");
   pic_operate();
}
function pic_operate() //一開始關於圖片相關操作的初始化
{  
  var img_data = JSON.parse(localStorage.getItem("img_data"));//重新解析出來
   pic_all();
   var random_num = Math.floor( Math.random() * (img_data.length) );//隨機產生數字
   var img = document.createElement("img");
   img.src = img_data[random_num];
   img.onload = function(){$("#pic_list,#test_img").append(this);}//一開始兩個地方都加圖
   ls.pic_list(img_data[random_num]);//加進紀錄
}
function pic_all()//產生所有圖的列表
{
   var data = JSON.parse(localStorage.getItem("pic_list"));
   for(var i=0;i<data.length;i++)
   {
     var img = document.createElement("img");
     img.src = data[i];
     $("#pic_list").append(img);
   }

   // alert("印出所有紀錄");
   
}
// function scroll_down()
// {
//   if(scroll == "true")
//   {
//     var e = document.getElementById("pic_list");
//     e.scrollTop = e.scrollHeight;
//   }
// }
var ls =//存取本地用端用的函式
{
   pic_list: function(store)
            {
              var data = JSON.parse(localStorage.getItem("pic_list"));
              data.push(store);
              data = JSON.stringify(data);
              localStorage.setItem("pic_list",data);
              return this;
            },
   img_data: function(store)
           {
              var data = JSON.stringify(store);
              localStorage.setItem("img_data",data);
              return this;
           },
   init: function()//初始化
           {
              pic_list = [];
              pic_list = JSON.stringify(pic_list);
              localStorage.setItem("pic_list",pic_list);
              return this;
           }     
}