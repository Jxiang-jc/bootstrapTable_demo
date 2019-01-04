<?php

include 'connect.php';

$page = isset($_GET['page']) ? $_GET['page'] : null;	//页数
$qty = isset($_GET['qty']) ? $_GET['qty'] : null;		//每一页的商品数量

//SQL语句，获得数据表的全部数据
$sql = "select * from listdemo";
$result = $conn->query($sql);
$row = $result->fetch_all(MYSQLI_ASSOC);
$result->close();

echo json_encode($row, JSON_UNESCAPED_UNICODE);

?>