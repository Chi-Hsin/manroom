<?php
$arr = glob("../img/*");//找尋img資料夾底下所有圖片
$arr_preg = array();
$preg = '/\.\.\/img(\/\w+)+(.jpg|png)$/';
foreach($arr as $a)
{
	if(preg_match($preg, $a))//以正則表達式判斷
	//如果目錄底下有JPG或PNG的檔案就加入新的陣列
	{
		array_push($arr_preg,$a);
	}
	else//如果目錄含子目錄  就再用glob去找尋檔案  同上方法
	{
		$a .= "/*";
		foreach (glob($a) as $value)
		{
		  if(preg_match($preg, $value))
		  {
		  	array_push($arr_preg,$value);
		  }
		}
	}
}
echo "database_connect(".json_encode($arr_preg).")";
//arr_preg包成JSON的形式  這樣才能藉由JSON讓其他語言辨識
//寫出myJSON() 因為是用script匯入  可以看做在script執行myJSON()
?>