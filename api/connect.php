<?php
    //响应头
    header('Content-Type:text/html;charset=utf-8');
    /*
    (1)连接数据库    
     */
    $servername = 'localhost';
    $username = 'root';
    $password = '';
    $dbname = 'jxiang';
    //创建连接
    $conn = new mysqli($servername,$username,$password,$dbname);
    // var_dump($conn); 
    //解决中文乱码
    mysqli_query($conn,"set names utf8");
    //检测连接
    if($conn->connect_error){
        die("连接失败:". $conn->connect_error);
    };
    //查询前设置编码,防止输出乱码
    $conn->set_charset('utf8');
    
?>