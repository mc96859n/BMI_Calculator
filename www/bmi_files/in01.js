
setTimeout(function(){

    var n =0;

    var u,end,start,g,g2;

    var w0 = 50;

    var w1 = 10.4;

    var w2=52;

    var heightVal =$("div[data-page='profile1']").find(".row").eq(1).find(".number").attr("initial-value"); //150-140

    var widthVal =$("div[data-page='profile1']").find(".row").eq(2).find(".number").attr("initial-value"); //550-300 /2.5 /10 

    var ageVal = $("div[data-page='profile1']").find(".row").eq(0).find(".number").attr("initial-value"); //30-18
    var  mouVal=$("div[data-page='profil']")



    $('.ruler .main').eq(0).css({
        '-webkit-transform':'translateX(-'+Math.ceil(parseInt(ageVal*w0))+'px)'
    }).attr('value',Math.ceil(ageVal*w0));

    $('.ruler .main').eq(1).css({
        '-webkit-transform':'translateX(-'+parseInt(heightVal*w1)+'px)'
    }).attr('value',heightVal*w1);

    $('.ruler .main').eq(2).css({
        '-webkit-transform':'translateX(-'+parseInt(widthVal*w2)+'px)'
    }).attr('value',widthVal*w2);



    for( var i =0 ; i < $('.ruler').length; i++){
        var liW = $('.ruler').eq(i).find("li").width();
        var size =  $('.ruler').eq(i).find('li').size();
    }

    $('body').on('touchcancel,touchend,touchmove,touchstart',function(e){
        e.preventDefault();
    })

    $('.selectize li').on('touchstart',function(){
        $(this).addClass("hover").siblings("li").removeClass("hover");
    })

    $('.selectize li').on('touchsend',function(){
        $(this).removeClass("hover");
    })


    $('.ruler ul').on("touchstart",function(e){
        var  initial = $(this).attr('data-initial');
        e.stopPropagation();
        v = parseInt($(this).parent(".main").attr('value'));

        if($(this).closest('.ruler').hasClass("ruler-weight")){
            start = 0;
            end = '-1458';
            g = 52;
        }else if($(this).closest('.ruler').hasClass("ruler-age")){
            start = 0;
            end = '-1600';
            g = 50;

        }else{
            start = 0;
            end = '-623';
            g = 10.4;
        }


        if(initial == 'true'){
            startX = e.originalEvent.changedTouches[0].pageX+v;
            $(this).attr('data-initial','false');
        }else{
            startX = e.originalEvent.changedTouches[0].pageX-v;
        }
    });



    $('.ruler ul').on("touchmove",function(e){

        var number = parseInt($(this).closest(".row").find('.number').attr('value'));

        moveX = e.originalEvent.changedTouches[0].pageX;

        X = moveX - startX;

        if(X>0){
            var vv = $(this).parent(".main").attr('value');

            if(vv >=start){

                start = X>start ? start : X;

                $(this).parent(".main").css({
                    '-webkit-transform':'translateX('+start+'px)'
                }).attr('value',start);
            }else{
                $(this).parent(".main").css({
                    '-webkit-transform':'translateX('+X+'px)'
                }).attr('value',X);
            }

            if($(this).closest('.ruler').hasClass("ruler-weight")){
                var val = (number-20+Math.abs(vv/g)/0.4).toFixed(1);//.replace('.0','');
                $(this).closest(".row").find('.number').text(val);
            }else{
                $(this).closest(".row").find('.number').text(Math.ceil(number-(vv/g)-10));

                if($(this).closest('.ruler').hasClass("ruler-age")){
                    var ageVal = $(this).closest(".row").find('.number').text();
                    $(this).closest(".row").find('.number').text(parseInt(ageVal-2))
                }
            }

        }else{

            var vv = $(this).parent(".main").attr('value');

            if($(this).parent(".main").attr('value') <=end){
                end = X< end ? end : X;
                $(this).parent(".main").css({
                    '-webkit-transform':'translateX('+end+'px)'
                }).attr('value',end);
            }else{
                $(this).parent(".main").css({
                    '-webkit-transform':'translateX('+X+'px)'
                }).attr('value',X);
            }

            if($(this).closest('.ruler').hasClass("ruler-weight")){

                var val = (number-20+Math.abs(vv/g)/0.4).toFixed(1);

                if(val == '100.1'){val=100;}

                $(this).closest(".row").find('.number').text(val);

            }else{
                $(this).closest(".row").find('.number').text(Math.ceil(number+Math.abs(vv/g)-10));

                if($(this).closest('.ruler').hasClass("ruler-age")){
                    var ageVal = $(this).closest(".row").find('.number').text();
                    $(this).closest(".row").find('.number').text(parseInt(ageVal-2))
                }
            }
        }
        e.preventDefault();
    });


    $('.ruler ul').on("touchend",function(e){

        e.stopPropagation();

        moveEndX = e.originalEvent.changedTouches[0].screenX;

        X = moveEndX - startX;

        var arr = new Array();

        if($(this).closest('.ruler').hasClass("ruler-age")){

            var value=  Math.abs($(this).parent(".main").attr("value"));

            var value2 = Math.round(Math.abs(value)/100)*100;

            if(value > value2){
                value2+=50;
            }

            $(this).parent(".main").css({
                '-webkit-transform':'translateX(-'+value2+'px)'
            }).attr('value','-'+value2);
        }


        $(this).closest(".page").find(".number").each(function(){
            var txt = $(this).text();
            arr.push(txt);
        });

        var arrayJoin = arr.join('##');

        $(this).closest(".page").find('input[type="hidden"]').val(arrayJoin);

    });
//
$('#btn').click(function(){
	//str
		var radio = $(".cc_radio:checked");
		var total = $('.ruler ul').closest(".page").find('input[type="hidden"]').val();
		var reg = /\d+(\.\d+)?/g;
		var mth = total.match(reg);
		var height = mth[1]/100;
		var weight = mth[2];
		var bmi = weight/(height*height);
		var gender = gender = $(".cc_radio:checked").val();
		if(gender == 0){
			$.DialogBySHF.Alert({ Width: 300, Height: 200, Title: "result", Content: "Please Select Your Gender" });
		}else{
		switch(true){
				case gender == 1 && bmi <20.7 :
					var rst = 'Underweight';
				break;
				case gender == 1 && bmi <= 26.4 :
					var rst = 'in the normal range' ;
				break;
				case gender == 2 && bmi <= 19.1 :
					var rst = 'Underweight';
				break;
				case gender == 2 && bmi <= 25.8 :
					var rst = 'in the normal range';
				break;

				default:
					var rst = "Overweight";
			}
		var content = "<ul><li>Your BMI value is "+bmi.toFixed(2)+",Your body is "+rst+"</li><li><a href='https://www.youtube.com/watch?v=w8HBfS9AOAc'>See more fitness tutorial Video</li></ul>";
		if(bmi < 19){
			var content = "<ul><li>Your BMI value is "+bmi.toFixed(2)+",Your body is "+rst+"</li><li><a href='https://www.youtube.com/watch?v=SE5xx9i-KpI'>Eating TO Gain Weight Video</li></ul>";
		}else if(bmi > 25){
			var content = "<ul><li>Your BMI value is "+bmi.toFixed(2)+",Your body is "+rst+"</li><li><a href='https://www.youtube.com/watch?v=pM4yrrR8ZUE'>Reduce BMI Video</li></ul>";
		}


		$.DialogBySHF.Alert({ Width: 300, Height: 200, Title: "result", Content: content });
		}
//str
});
//
},100);
