<?php
/**
 * @Author: qinuoyun
 * @Date:   2020-08-20 13:46:09
 * @Last Modified by:   qinuoyun
 * @Last Modified time: 2021-05-18 08:56:57
 */
namespace framework\common;

use \yii\web\HttpException;

/**
 * WechatHttpException represents a "Wechat" HTTP exception with status code 452.
 *
 * Use this exception when a user is not allowed to perform the requested action.
 * Using different credentials might or might not allow performing the requested action.
 * If you do not want to expose authorization information to the user, it is valid
 * to respond with a 404 [[NotFoundHttpException]].
 *
 * @see https://tools.ietf.org/html/rfc7231#section-6.5.3
 * @author Dan Schmidt <danschmidt5189@gmail.com>
 * @since 2.0
 */
class WechatHttpException extends HttpException
{
    /**
     * Constructor.
     * @param string $message error message
     * @param int $code error code
     * @param \Exception $previous The previous exception used for the exception chaining.
     */
    public function __construct($message = null, $code = 0, \Exception $previous = null)
    {
        parent::__construct(452, $message, $code, $previous);
    }

    public function getName()
    {
        return 'Wechat Bad Request';
    }
}
