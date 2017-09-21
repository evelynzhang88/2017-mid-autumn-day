/*For join page
 * Inclue two function, one is load new qr for each person, another is show rule popup
 * */
;(function(){
    var controller = function(){
        this.disableClick = false;
        this.img_path = [];
        for(var i=1;i<127;i++){
            this.img_path.push('src/assets/images/01_img-seq/01_'+Common.zeroFill(i,3)+'.jpg');
        }
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
        imagesArray = imagesArray.concat(self.img_path);

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
        $('.preload').remove();
        $('.wrapper').addClass('fade');
        self.ImgSequece();
        var mySwiper = new Swiper ('.swiper-container', {
            // Optional parameters
            //direction: 'vertical',
            loop: true,
            effect:'fade',
            fade: {
                crossFade: false
            },
            flip: {
                slideShadows : false,
                limitRotation: false
            },
            parallax:true,
            onSlideNextStart:function(swiper){
                //$('.swiper-container').css('background','red');
                //console.log(swiper);
                //swiper.effects.fade.setTranslate = function(e){
                //    console.log(e);
                //
                //}
                //$('.swiper-wrapper').css({
                //    backgroundImage:"url('src/dist/images/01_img-seq/01_001.jpg')"
                //})

            },
            onSetTranslate:function(swiper, translate){
                //console.log(translate);
                //$('.swiper-slide-prev').css();
                //swiper.effects.fade.setTranslate = function(e){
                //        console.log(e);
                //}
            },
            // If we need pagination
            //pagination: '.swiper-pagination',

            // Navigation arrows
            //nextButton: '.swiper-button-next',
            //prevButton: '.swiper-button-prev',

            // And if we need scrollbar
            //scrollbar: '.swiper-scrollbar',
        })
    };

    controller.prototype.ImgSequece = function(){
        var self = this;
        var j=0;
        var enableSequence = true;
        var reqAnimateDemo = new reqAnimate($('.swiper-slide-1 .img-sequece img'),{
            fps: 16,
            totalFrames: 127,
            //time: 0,
            processAnimation: function(){
                var imgName = self.img_path[j];
                if(j>self.img_path.length-2){
                    enableSequence=false;
                }
                if(j==0){
                    enableSequence=true;
                }
                if(enableSequence){
                    j++;
                }else{
                    j--;
                }
                $('.swiper-slide-1 .img-sequece img').attr('src',imgName);
            },
            doneAnimation: function(){

                //show box and letter
            }
        });
        reqAnimateDemo.start();
    };




    $(document).ready(function(){
//    show form
        var newFollow = new controller();
        newFollow.startUp();

    });

})();