<?php
/**
 * @copyright ©2020 浙江禾成云计算有限公司
 * @link      : http://www.zjhejiang.com
 * Created by PhpStorm.
 * User: Andy - Wangjie
 * Date: 2021/1/29
 * Time: 10:58
 */

namespace app\forms;

use app\datamodel\Option;
use framework\common\CommonModels;
use yii\base\Model;

class CommonOption
{
    private static $loadedOptions = [];

    /**
     * @param $name         string Name
     * @param $value        mixed Value
     * @param $AppID        integer Integer
     * @param $group        string Name
     * @param $merchant_id  integer Name
     * @return boolean
     */
    public static function set($name, $value, $AppID = '0', $group = '', $merchant_id = 0)
    {
        if (empty($name)) {
            return false;
        }
        $model = Option::findOne(
            [
                'name'        => $name,
                'AppID'       => $AppID,
                'group'       => $group,
                'merchant_id' => $merchant_id,
            ]
        );
        if (!$model) {
            $model              = new Option();
            $model->name        = $name;
            $model->AppID       = $AppID;
            $model->group       = $group;
            $model->merchant_id = $merchant_id;
        }
        $model->value = \Yii::$app->serializer->encode($value);
        $result       = $model->save();
        if ($result) {
            $loadedOptionKey                       = md5(
                json_encode(
                    [
                        'name'        => $name,
                        'AppID'       => $AppID,
                        'group'       => $group,
                        'merchant_id' => $merchant_id,
                    ]
                )
            );
            self::$loadedOptions[$loadedOptionKey] = $value;
        }
        return $result;
    }

    /**
     * @param $name         string Name
     * @param $AppID        integer Integer
     * @param $merchant_id  integer Integer
     * @param $group        string Name
     * @param $default      string Name
     * @return null|array|string
     */
    public static function get($name, $AppID = 0, $group = '', $default = null, $merchant_id = 0)
    {
        $loadedOptionKey = md5(
            json_encode(
                [
                    'name'        => $name,
                    'AppID'       => $AppID,
                    'group'       => $group,
                    'merchant_id' => $merchant_id,
                ]
            )
        );
        if (array_key_exists($loadedOptionKey, self::$loadedOptions)) {
            return self::$loadedOptions[$loadedOptionKey];
        }
        $model = Option::findOne(
            [
                'name'        => $name,
                'AppID'       => $AppID,
                'merchant_id' => $merchant_id,
                'group'       => $group
            ]
        );

        if (!$model) {
            $result = $default;
        } else {
            $result = \Yii::$app->serializer->decode($model->value);
        }
        self::$loadedOptions[$loadedOptionKey] = $result;
        return $result;
    }

    /**
     * @param        $list
     * @param int    $AppID
     * @param int    $merchant_id
     * @param string $group
     * @return bool
     */
    public static function setList($list, $AppID = 0, $group = '', $merchant_id = 0)
    {
        if (!is_array($list)) {
            return false;
        }
        foreach ($list as $item) {
            self::set(
                $item['name'],
                $item['value'],
                (isset($item['AppID']) ? $item['AppID'] : $AppID),
                (isset($item['merchant_id']) ? $item['merchant_id'] : $merchant_id),
                (isset($item['group']) ? $item['group'] : $group)
            );
        }
        return true;
    }

    /**
     * @param        $names
     * @param int    $AppID
     * @param int    $merchant_id
     * @param string $group
     * @param null   $default
     * @return array
     */
    public static function getList($names, $AppID = 0, $group = '', $default = null, $merchant_id = 0)
    {
        if (is_string($names)) {
            $names = explode(',', $names);
        }
        if (!is_array($names)) {
            return [];
        }
        $list = [];
        foreach ($names as $name) {
            if (empty($name)) {
                continue;
            }
            $value       = self::get($name, $AppID, $group, $default, $merchant_id);
            $list[$name] = $value;
        }
        return $list;
    }
}

