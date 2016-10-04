$(document).ready(function() {
	
	var myArray	= [];
	var image	= "";
	var length	= 0;
	var time	= 0;
	var interval;
	var start = 0;
	
	var obj	= {
		a	: ["a","i","u","e","o"],
		ka	: ["ka","ki","ku","ke","ko"],
		sa	: ["sa","shi","su","se","so"],
		ta	: ["ta","chi","tsu","te","to"],
		na	: ["na","ni","nu","ne","no"],
		ha	: ["ha","hi","fu","he","ho"],
		ma	: ["ma","mi","mu","me","mo"],
		ya	: ["ya","yu","yo"],
		ra	: ["ra","ri","ru","re","ro"],
		wa	: ["wa","wo","n"],
		ga	: ["ga","gi","gu","ge","go"],
		za	: ["za","ji","zu","ze","zo"],
		da	: ["da","de","do"],
		ba	: ["ba","bi","bu","be","bo"],
		pa	: ["pa","pi","pu","pe","po"],
		kya	: ['kya', 'kyu', 'kyo'],
		sha	: ['sha', 'shu', 'sho'],
		cha	: ['cha', 'chu', 'cho'],
		nya	: ['nya', 'nyu', 'nyo'],
		hya	: ['hya', 'hyu', 'hyo'],
		mya	: ['mya', 'myu', 'myo'],
		rya	: ['rya', 'ryu', 'ryo'],
		gya	: ['gya', 'gyu', 'gyo'],
		ja	: ['ja', 'ju', 'jo'],
		bya	: ['bya', 'byu', 'byo'],
		pya	: ['pya', 'pyu', 'pyo'],
		
		katakana_a	: ["katakana-a","katakana-i","katakana-u","katakana-e","katakana-o"],
		katakana_ka	: ["katakana-ka","katakana-ki","katakana-ku","katakana-ke","katakana-ko"],
		katakana_sa	: ["katakana-sa","katakana-shi","katakana-su","katakana-se","katakana-so"],
		katakana_ta	: ["katakana-ta","katakana-chi","katakana-tsu","katakana-te","katakana-to"],
		katakana_na	: ["katakana-na","katakana-ni","katakana-nu","katakana-ne","katakana-no"],
		katakana_ha	: ["katakana-ha","katakana-hi","katakana-fu","katakana-he","katakana-ho"],
		katakana_ma	: ["katakana-ma","katakana-mi","katakana-mu","katakana-me","katakana-mo"],
		katakana_ya	: ["katakana-ya","katakana-yu","katakana-yo"],
		katakana_ra	: ["katakana-ra","katakana-ri","katakana-ru","katakana-re","katakana-ro"],
		katakana_wa	: ["katakana-wa","katakana-wo","katakana-n"],
		
		katakana_ga	: ["katakana-ga","katakana-gi","katakana-gu","katakana-ge","katakana-go"],
		katakana_za	: ["katakana-za","katakana-ji","katakana-zu","katakana-ze","katakana-zo"],
		katakana_da	: ["katakana-da","katakana-de","katakana-do"],
		katakana_ba	: ["katakana-ba","katakana-bi","katakana-bu","katakana-be","katakana-bo"],
		katakana_pa	: ["katakana-pa","katakana-pi","katakana-pu","katakana-pe","katakana-po"],
		
		katakana_kya	: ['katakana-kya', 'katakana-kyu', 'katakana-kyo'],
		katakana_sha	: ['katakana-sha', 'katakana-shu', 'katakana-sho'],
		katakana_cha	: ['katakana-cha', 'katakana-chu', 'katakana-cho'],
		katakana_nya	: ['katakana-nya', 'katakana-nyu', 'katakana-nyo'],
		katakana_hya	: ['katakana-hya', 'katakana-hyu', 'katakana-hyo'],
		katakana_mya	: ['katakana-mya', 'katakana-myu', 'katakana-myo'],
		katakana_rya	: ['katakana-rya', 'katakana-ryu', 'katakana-ryo'],
		katakana_gya	: ['katakana-gya', 'katakana-gyu', 'katakana-gyo'],
		katakana_ja		: ['katakana-ja',  'katakana-ju',  'katakana-jo'],
		katakana_bya	: ['katakana-bya', 'katakana-byu', 'katakana-byo'],
		katakana_pya	: ['katakana-pya', 'katakana-pyu', 'katakana-pyo'],
	}
	
	$('body').keyup(function (e) {
		
		if (e.keyCode == 32 && $('.write').is(':checked')) {
			$("div img").attr("src", "images/" + image + ".png");
			if(length==0){
				clearTime();
				return false;
			}
			showText(length);
		} else if ($('.type').is(':checked')){
			if(getTextBehind(image)==$('input.learn-text-type').val()){
				$('.text-forgot').hide();
				showImageType(length);
			}
		}
	});
	/** Change */
	$( ".hiragana-check" ).change(function() {
		if($(this).is(':checked')){
			$( ".cb input.hiragana" ).each(function() {
				$(this).prop("checked", true);
			});
		} else {
			$( ".cb input.hiragana" ).each(function() {
				$(this).prop("checked", false);
			});
		}
		
	});
	
	/** Change */
	$( ".katakana-check" ).change(function() {
		if($(this).is(':checked')){
			$( ".cb input.katakana" ).each(function() {
				$(this).prop("checked", true);
			});
		} else {
			$( ".cb input.katakana" ).each(function() {
				$(this).prop("checked", false);
			});
		}
		
	});
	
	/** Next */
	$(document).on('click', '.next', function(){
		clearTime();
		
		$(".count-time").html("00:00:00");
		interval = setInterval(function() {
			time++;
			$(".count-time").html(setTime(time));
		}, 1000);
		
		myArray	= [];
		$( ".cb .input input" ).each(function() {
			var _this	= $(this);
			if(_this.is(':checked')){
				myArray = $.merge(myArray, obj[_this.attr("name")]);
			}
		});
		length	= myArray.length;
			
		if($('.type').is(':checked')){
			showImageType(length);
			$('.text-write').hide();
			$("input.learn-text-type").show();
			$("input.learn-text-type").focus();
		} else {
			$("div img").attr("src", "images/zz.png");
			showText(length);
			$('.text-write').show();
			$("input.learn-text-type").hide();
		}
	});
	
	/** Fogot */
	$(document).on('click', '.forgot', function(){
		$('.text-forgot').html(getTextBehind(image)).show();
		$("input.learn-text-type").focus();
	});
	
	
	/**
	 * function clear interval
	*/
	function clearTime(){
		clearInterval(interval);
		time = 0;
	}
	/**
	 * function set time
	*/
	function setTime(t){
		var h, m, s;
		
		h = parseInt(t/3600);
		t = t%3600;
		m = parseInt(t/60);
		s = t%60;
		
		
		if(h<10) h = '0' + h;
		if(m<10) m = '0' + m;
		if(s<10) s = '0' + s;
		return h + ':' + m + ':' + s;
	}
	
	/**
	 * function get text
	*/
	function getText(lr){
		console.log(myArray);
		var num		= randArray(lr);
		var text	= myArray[num];
		
		if(num!=myArray.length-1){
			for(var i=num; i<myArray.length-1; i++){
				myArray[i] = myArray[i+1];
			}
		}
		length--;
		return text;
	}
	/**
	 * function show text
	*/
	function showText(lr){
		
		var text = getText(lr);
		var reg = /-/;
		var is_katakana = reg.test(text);
		
		if(is_katakana){
			$("div p.hika").html("Katakana");
		} else {
			$("div p.hika").html("Hiragana");
		}
		
		$("div p.text").html(getTextBehind(text));
		console.log(text);
		image = text;
	}
	
	function getTextBehind(t){
		var reg = /[^-]*$/;
		return t.match(reg);
	}
	
	/**
	 * function show image type
	*/
	function showImageType(lr){
		
		if(length!=0){
			image = getText(lr);
			console.log(image);
			$("input.learn-text-type").val('');
			if($('.type').is(':checked')){
				$("div img").attr("src", "images/" + image + ".jpg");
			}
		} else {
			clearTime();
			$("input.learn-text-type").val('');
			$("div img").attr("src", "win.jpg");
		}
	}
	
	/**
	 * function random
	*/
	function randArray(l){
		return Math.floor((Math.random() * l));
	}
	
	/**
	 * Function check multi
	 */
	var checkboxes = "input.word";
	$(checkboxes).on("click", function(event) {
		if(this.checked) {
			if(event.shiftKey) {
				end = parseInt($(this).val());
				if(end < start) {
					end   = start; start = parseInt($(this).val()); 
				}
				for(var i=start; i<=end ; i++){
					$(checkboxes + ":checkbox[value=" + i + "]").attr("checked", true);
				}
			}
			start = parseInt($(this).val()); 
		}}
	);
	
	
	
});