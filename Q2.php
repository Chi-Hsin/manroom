<?php 
Class TranCost
{
	public $list = array("美國"=>array(
		                               "UPS"=>array("pri"=>0,"kgplus"=>60)
                                      ),
		                 "大陸"=>array(
		                               "黑貓"=>array("pri"=>200,"kgplus"=>20),
		                 	           "順風"=>array("pri"=>150,"kgplus"=>30)
		                 	          ),
		                 "台灣"=>array(
		                               "黑貓"=>array("pri"=>100,"kgplus"=>10),
		                 	           "郵局"=>array("pri"=>60,"kgplus"=>20)
		                 	          )
		                );
	public function total_cost()
	{
       return $this->getWeight() * $this->kgplus_cost + $this->pri_cost; 
	}
	public function getWeight() //未滿一公斤算一公斤
	{
		return ($this->weight > (int)($this->weight)) 
		                                     ?(int)($this->weight)+1 
                                             :(int)($this->weight);
	}
	public function __construct($area,$weight,$company)
	{
       $this->area = $area;
       $this->weight = $weight;
       $this->company = $company;
       $this->pri_cost = $this->list[$this->area][$this->company]["pri"];
       $this->kgplus_cost = $this->list[$this->area][$this->company]["kgplus"];
       $this->tot_cost = $this->total_cost();
	}
}
$testCost = new TranCost("台灣","40.8","郵局");
print_r($testCost->tot_cost);
?>