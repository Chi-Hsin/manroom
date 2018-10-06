<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
<script src="../js/jquery-3.3.1.min.js"></script>
<script>$(function(){
	var arr = [1,2,3,3,2,1];
	$("#test").html("陣列為"+arr+"區間總合為六的有:");
	for(var i=0;i<6;i++)
	{
		 sum = arr[i];
		 arr_res = [sum];
         for(j=i+1;j<6;j++)
         {
         	   sum += arr[j];
         	   arr_res.push(arr[j]);
		       if(sum > 6)
		       {
		       	 break;
		       }
		       if(sum == 6)
		       {
		        document.getElementById("test").innerHTML += "<p>"+arr_res;
		        break;
		       }
         }
         
	   
	}

})</script>	
</head>
<body>
<div id="test"></div>
</body>
</html>
