/*For join page
 * Inclue two function, one is load new qr for each person, another is show rule popup
 * */
;(function(){
    var controller = function(){
        this.disableClick = false;
    };
    //init
    controller.prototype.init = function(){
        var self = this;

        var timeStart = 0,
            step= 1,
            isTrueNext = false,
            isFalseNext = false;
        var loadingAni = setInterval(function(){
            if(timeStart>100){
                isFalseNext = true;
                if(isTrueNext){
                    self.startUp();
                }
                clearInterval(loadingAni);
                return;
            };
            if(timeStart==step){
                $('.animate-flower').addClass('fadenow');
            }
            $('.loading-num .num').html(timeStart);
            timeStart += step;
        },50);

        var baseurl = ''+'/src/dist/images/';
        var imagesArray = [

        ];

        var i = 0,j= 0;
        new preLoader(imagesArray, {
            onProgress: function(){
                i++;
                //var progress = parseInt(i/imagesArray.length*100);
                //console.log(progress);
                //$('.preload .v-content').html(''+progress+'%');
                //console.log(i+'i');
            },
            onComplete: function(){
                isTrueNext  = true;
                if(isFalseNext){
                    self.startUp();
                }

            }
        });


    };

    controller.prototype.startUp = function(){
        var self = this;
        $('.wrapper').addClass('fade');
        Common.gotoPin(0);
        self.bindEvent();
    };

    controller.prototype.bindEvent = function(){
        var self = this;
        $('.btn-submit').on('touchstart',function(){
            if(self.validateForm()){
                //name mobile province city area address
                var inputNameVal = $('#input-name').val(),
                    inputMobileVal = $('#input-mobile').val(),
                    inputAddressVal = $('#input-address').val(),
                    inputMsgCodeVal = $('#input-validate-message-code').val(),
                    selectProvinceVal = $('#select-province').val(),
                    selectCityVal = $('#select-city').val(),
                    selectDistrictVal = $('#select-district').val();
                Api.submitForm_freetrial({
                    name:inputNameVal,
                    mobile:inputMobileVal,
                    province:selectProvinceVal,
                    city:selectCityVal,
                    msgCode:inputMsgCodeVal,
                    area:selectDistrictVal,
                    address:inputAddressVal
                },function(data){
                    if(data.status==1){
                        Common.gotoPin(1);
                    }else{
                        Common.alertBox.add(data.msg);
                    }
                });
            }

        });
    }

    //validation the form
    controller.prototype.validateForm = function(){
        var self = this;
        var validate = true,
            inputName = document.getElementById('input-name'),
            inputMobile = document.getElementById('input-mobile'),
            inputEmail = document.getElementById('input-email'),
            inputProduct = document.getElementById('input-product');

        if(!inputName.value){
            Common.errorMsgBox.add('请填写姓名');
            validate = false;
        };
        if(!inputProduct.value){
            Common.errorMsgBox.add('请填写预定的产品名');
            validate = false;
        };

        if(!inputMobile.value){
            Common.errorMsgBox.add('手机号码不能为空');
            //Common.errorMsg.add(inputMobile.parentElement,'手机号码不能为空');
            validate = false;
        }else{
            var reg=/^1\d{10}$/;
            if(!(reg.test(inputMobile.value))){
                validate = false;
                Common.errorMsgBox.add('手机号格式错误，请重新输入');
                //Common.errorMsg.add(inputMobile.parentElement,'手机号格式错误，请重新输入');
            }else{
                //Common.errorMsg.remove(inputMobile.parentElement);
            }
        }
        if(!inputEmail.value){
            Common.errorMsgBox.add('邮箱不能为空');
            validate = false;
        }else{
            var regMail=/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if(!(regMail.test(inputEmail.value))){
                validate = false;
                Common.errorMsgBox.add('邮箱格式错误，请重新输入');
            }else{
                //Common.errorMsg.remove(inputEmail.parentElement);
            }
        }


        if(validate){
            return true;
        }
        return false;
    };



    $(document).ready(function(){
//    show form
        var newFollow = new controller();
        newFollow.startUp();

    });

})();