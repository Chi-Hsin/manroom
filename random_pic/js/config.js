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


























//function below
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
  try
  {
    firebase.database().ref("/"+room_num+"/public_message").push(postData);//公共訊息存一份
    if(localStorage.getItem("user_data") != null)
    {
      var user_data = JSON.parse(localStorage.getItem("user_data"));
      firebase.database().ref(room_num)//個人訊息存一份在資料庫
                         .child("user")
                         .child(user_data.uid)
                         .child("all_message")
                         .push(postData);
    }
    
  }
  catch(e){alert(e)}
  

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
function append_dialogue(obj)//聊天框內產生對話內容
{

  var p = document.createElement("p");
  var name_zone = document.createElement("span");
  var time_zone = document.createTextNode(obj.time);
  var content_zone = document.createElement("span");
  content_zone.innerHTML = (obj.type == "text")?"說：<div class='content_zone'>"+obj.content+"</div>"
                                               :"說："+"<img src='"+obj.content+"'>";
  
  name_zone.innerText = obj.name;
  name_zone.className = "chat_name";
  name_zone.style.color = obj.color;
  $("#chat_area").append(p)
                 .find(p)
                 .append(time_zone)
                 .append(name_zone)
                 .append(content_zone);
  // var e = document.getElementById("chat_area");
  // e.scrollTop = e.scrollHeight;
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