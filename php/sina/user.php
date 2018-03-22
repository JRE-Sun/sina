<?php
//根据脚本路径定义命名空间
namespace sina;

//use 其他的扩展和命名空间
use ext\http;

//类名保持和文件名一致
class user
{

    public static $tz = [
        'get' => [],
    ];

    public static function get() {
        return 1;
    }

}

?>