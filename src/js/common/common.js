nie.define('comm', function(){
    
    var fn = {
    
        // 打开弹窗
        popUpWindow : function(element) {
            var _this = $(element);
            _this.fadeIn();
            fn.setCenter(_this);
        },
        
        // 设置弹窗居中
        setCenter : function(element) {
            var _this = $(element).find('.popWinContent'),
                halfWidth = _this.width() / 2,
                halfHeight = _this.height() / 2;
            _this.css({
                'margin-top' : '-' + halfHeight + 'px',
                'margin-left' : '-' + halfWidth + 'px'
            });
        },
        
        // 关闭弹窗
        closePopUpWindow : function(element) {
            element.parents().closest('.mask').fadeOut();
        },
        
        // 模拟 Placeholder
        emuPlaceholder : function(container) {
            container.find('input').each(function (inx, input) {
                var $input = $(input);

                if ($input.attr('placeholder')) {
                    $input.val($input.attr('placeholder'));
                }

                $input.bind('blur', function () {
                    if ('' === $input.val()) {
                        $input.val($input.attr('placeholder'));
                    }
                });
                $input.bind('focus', function () {
                    if ($input.attr('placeholder') === $input.val()) {
                        $input.val('');
                    }
                });
            });
        },
        
        // 验证手机号
        checkPhoneNum : function(phoneNum) {
            return /^(13|14|15|17|18)\d{9}$/.test(phoneNum) ? !0 : !1
        }
        
    }
    
    // 调用网易白色版权页脚
    nie.config.copyRight.setWhite();
    
    return fn;
        
    
});