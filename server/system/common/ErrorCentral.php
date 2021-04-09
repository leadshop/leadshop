<?php
/**
 * 错误抛出类
 * @Author: qinuoyun
 * @Date:   2020-08-20 13:43:40
 * @Last Modified by:   qinuoyun
 * @Last Modified time: 2021-01-05 10:18:36
 */
namespace framework\common;

use yii\web\ForbiddenHttpException;
use yii\web\ServerErrorHttpException;

class ErrorCentral
{
    public function __construct($msg = '系统错误', $code = 403)
    {
        switch ($code) {
            case 403:
                throw new ForbiddenHttpException($msg);
                break;

            default:
                throw new ServerErrorHttpException('系统错误');
                break;
        }
    }
}
