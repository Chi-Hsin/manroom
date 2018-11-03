<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<script src="js/config.js"></script>
<script>
function test()
{
    this.num = 1;
    this.check1 =function()
    {
        if(this.num>0)
        {
            return this;
        }
        else
        {
            alert("222")
        }
    }
    this.check2 =function()
    {
        if(this.num == 4)
        {
            return this;
        }
        else
        {
            alert("222")
        }
    }
}
var some_test = new test();
some_test.check1().check2();
alert("測試完畢")





















// function test(msg) { //小於20
//     return new Promise(function(resolve,fail)
//     {
//         if(msg < 20)
//         {
//             console.log(msg+"小於20")
            
//         }
//         else
//         {
//             console.log(msg+"不小於20");
//         }
//         resolve(msg)
//     })
// }
// function test2(msg) { //小於10
//     return new Promise(function(resolve,fail)
//     {
//         if(msg < 10)
//         {
//             console.log(msg+"小於10");
            
//         }
//         else
//         {
//             console.log(msg+"不小於10");
            
//         }
//         resolve(msg);
//     })
// }
// function test3(msg) { //小於5
//     return new Promise(function(resolve,fail)
//     {
//         if(msg < 5)
//         {
//             console.log(msg+"小於5");
//         }
//         else
//         {
//             console.log(msg+"不小於5");
//         }
//         resolve(msg);
//     })
// }
// function test4(msg) { //小於1
//     return new Promise(function(resolve,fail)
//     {
//         if(msg < 1)
//         {
//             console.log(msg+"小於1")
//         }
//         else
//         {
//             console.log(msg+"不小於1");
//         }
//         resolve(msg);
//     })
// }
// test().then(test2)
//         .then(test3).catch(function(f){console.log(f)})

</script>
<body>
    
</body>
</html>