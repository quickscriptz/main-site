$(document).ready(function(){

	// detect mobile browser
	(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
	var isiPad = /ipad/i.test(navigator.userAgent.toLowerCase());


	/***************************
	 * Services
	 ***************************/
	 // button to list all services
	 $("#listservices").click(function(){
		$(this).fadeOut(function(){
			$(".servp").hide();
			scrollToElement('#services', 500, -30);
			$("#servoffer").fadeIn(); 
			$("#scrollforport").fadeIn();
			ga('send', 'event', 'button', 'click', 'view-services'); // let google analytics know
		});
	 });
	 
	 var buttonCount = 0;
	 var servArray = [];
	 $("#services > #servoffer > .pure-u-1-4").click(function(){
		bgcol = $(this).children(".servcont").css("background-color");
		servName = $(this).attr("name");
	 	if(bgcol == "rgb(246, 246, 246)"){
		 	$(this).children(".servcont").css("background-color", "#EEE").css("border", "solid 1px #3A7EA0");
		 	buttonCount++;
		 	// add item to array
		 	servArray.push(servName);
		}else{
			$(this).children(".servcont").css("background-color", "#F6F6F6").css("border", "solid 1px #FFF");
			buttonCount--;
			// remove item that was just de-selected from array
			servArray.splice( $.inArray(servName, servArray), 1 );
		}
		if(buttonCount > 0){
			// array has items, show the button
			$("#scrollforport").fadeOut("fast");
			$("#servquote").delay(180).fadeIn();
		}else{
			// array is empty, hide the button
			$("#servquote").fadeOut("fast");
			$("#scrollforport").delay(180).fadeIn();
		}
	 });
	 
	 // jump to portfolio
	 $("#scrollforport").click(function(){scrollToElement('#portfolio', 500, -100);});
	 
	 // hover effects for service buttons
	 $("#services > #servoffer > .pure-u-1-4").hover(function(){
		 $(this).children(".servcont").css("border", "solid 1px #3A7EA0");
	 }, function(){
		 servName = $(this).attr("name");
		 if(jQuery.inArray(servName, servArray) == -1){
			// only erase border if not selected
			$(this).children(".servcont").css("border", "solid 1px #FFF");	 
		 }
	 });
	 
	 // pre-fill the contact us form based on user selections
	 $("#servquote").click(function(){
		arrayText = servArray.join();
		msgText = "I am interested in:" + arrayText;
		$("textarea[name=message]").val(msgText);
		$("textarea[name=poutline]").val(msgText);
		$("#contact2").modal({fadeDuration: 100}); // open contact us modalc
		ga('send', 'event', 'button', 'click', 'services-request-info'); // let google analytics know
	});


	/***************************
	 * Portfolio & Labs
	 ***************************/
	
	// page navigation
	$("#port-open").click(function(){ // show portfolio categories
		$("#portlinks").animate({
			opacity: 0.5,
			margin: "3em 0 0 0"
  		}, 1500);
  		if($("#labcats").is(":visible")){ $("#labcats").hide( "slide", { direction: "right" }, 2000); }
		$("#portcats").show( "slide", { direction: "left" }, 2000);
		ga('send', 'event', 'button', 'click', 'view-portfolio'); // let google analytics know
	});
	$("#labs-open").click(function(){ // show lab categories
		$("#portlinks").animate({
			opacity: 0.5,
			margin: "3em 0 0 0"
  		}, 1500);
  		if($("#portcats").is(":visible")){ $("#portcats").hide( "slide", { direction: "left" }, 2000); }
		$("#labcats").show( "slide", { direction: "right" }, 2000);
		ga('send', 'event', 'button', 'click', 'view-labs'); // let google analytics know
	});
	
	// portfolio sub-sections
	$("#webdesign-o").click(function(){$("#webdesign").modal();});
	$("#powerpoint-o").click(function(){$("#powerpoint").modal();});
	
	// labs sub-sections
	$("#scripts-o").click(function(){$("#scripts").modal();});
	$("#unfinished-o").click(function(){$("#unfinished").modal();});
	$("#experiments-o").click(function(){$("#experiments").modal();});
	
	// free script descriptions
	$("#scripts-a  a").hover(function(){
		newtext = $(this).attr('rel');
		$("#scripts-d").text(newtext);
	}, function(){
		$("#scripts-d").html("&nbsp;");
	});
	
	// photography slider
	var slideCount = $("#slider ul li").length;
	var slideWidth = $("#slider ul li").width();
	var slideHeight = $("#slider ul li").height();
	var sliderUlWidth = slideCount * slideWidth;
	$("#slider").css({ width: slideWidth, height: slideHeight });
	$("#slider ul").css({ width: sliderUlWidth, marginLeft: - slideWidth });
    $("#slider ul li:last-child").prependTo("#slider ul");
    if(jQuery.browser.mobile || isiPad){
	    // mobile no-hover
	    $("a.control_prev, a.control_next, a.close-modaltr").fadeTo("fast", 0.6);
	}else{
		// desktop hover behaviour
		$("#photography").hover(function(){ // fade in next/previous buttons on hover
	    $("a.control_prev, a.control_next, a.close-modal").fadeTo("fast", 0.6);
    }, function(){$("a.control_prev, a.control_next, a.close-modal").fadeOut("fast");});

	}
    function moveLeft() { // previous slide
        $("#slider ul").animate({left: + slideWidth}, 800, function () {
            $("#slider ul li:last-child").prependTo("#slider ul");
            $("#slider ul").css("left", "");
        });};
    function moveRight() { // next slide
        $("#slider ul").animate({left: - slideWidth}, 800, function () {
            $("#slider ul li:first-child").appendTo("#slider ul");
            $("#slider ul").css("left", "");
        });};
    $("#backward").click(function(){moveLeft();});
    $("#forward").click(function(){moveRight();}); 
	 

	/***************************
	 * Contact form
	 ***************************/
	 
	 var contactType,
	 	 fname,
	 	 lname,
	 	 email,
	 	 message,
	 	 cname,
	 	 csite,
	 	 ctitle,
	 	 pbudget,
	 	 pdate,
	 	 poutline;

	// load the contact us modal
	$("#contact1").click(function(){
		$("#contact1-2").modal({fadeDuration: 100});
		ga('send', 'event', 'button', 'click', 'contact-us'); // let google analytics know
	});
	$("#useForm").click(function(){
		$("#contact2").modal({fadeDuration: 100});
		ga('send', 'event', 'button', 'click', 'contact-form'); // let google analytics know
	});
	$("#useEmail").click(function(){
		$("#contact1-3").modal({fadeDuration: 100});
		ga('send', 'event', 'button', 'click', 'contact-email'); // let google analytics know
	});
	
	// check the first page (name/email)
	$("#cont2").click(function() {
		fname = $('input[name=fname]').val();
		lname = $('input[name=lname]').val();
		email = $('input[name=email]').val();
		var proceed = true;
		if(fname == ""){$('input[name=fname]').css('background-color','#FCC');proceed = false;}
		if(lname == ""){$('input[name=lname]').css('background-color','#FCC');proceed = false;}
		if(email == "" || !isValidEmailAddress(email)){$('input[name=email]').css('background-color','#FCC');proceed = false;}
		if(proceed){
			$("#contact3").modal();
			ga('send', 'event', 'form', 'submit', 'personalinfo'); // let google analytics know
		}
	});
	
	// check the GI (general info) message
	$("#cont4-gi").click(function() {
		contactType = "gi";
		message = $('textarea[name=message]').val();
		var proceed = true;
		if(message == ""){$('textarea[name=message]').css('background-color','#FCC');proceed = false;}
		if(proceed){
			$("#contact-end").modal();
			ga('send', 'event', 'form', 'submit', 'generalinfo'); // let google analytics know
		}
	});
	
	// check the PQ (project quote) details
	$("#cont4-pq").click(function() {
		contactType = "pq";
		cname = $('input[name=cname]').val();
		csite = $('input[name=csite]').val();
		ctitle = $('input[name=ctitle]').val();
		pbudget = $('input[name=pbudget]').val();
		pdate = $('input[name=pdate]').val();
		var proceed = true;
		if(cname == ""){$('input[name=cname]').css('background-color','#FCC');proceed = false;}
		if(csite == ""){$('input[name=csite]').css('background-color','#FCC');proceed = false;}
		if(ctitle == ""){$('input[name=ctitle]').css('background-color','#FCC');proceed = false;}
		if(pbudget == ""){$('input[name=pbudget]').css('background-color','#FCC');proceed = false;}
		if(pdate == ""){$('input[name=pdate]').css('background-color','#FCC');proceed = false;}
		if(proceed){$("#contact5-pq").modal();}
	});

	// check the PQ outline
	$("#cont5-pq").click(function() {
		poutline = $('textarea[name=poutline]').val();
		var proceed = true;
		if(poutline == ""){$('input[name=poutline]').css('background-color','#FCC');proceed = false;}
		if(proceed){
			$("#contact-end").modal();
			ga('send', 'event', 'form', 'submit', 'projectquote'); // let google analytics know
		}
	});
	
	// check captcha
	$("#cont6").click(function() {
		challengeField = $("input#recaptcha_challenge_field").val();
		responseField = $("input#recaptcha_response_field").val();
	    var html = $.ajax({
	        type: "POST",
	        url: "mail.php?validate=TRUE&recaptcha_challenge_field=" + challengeField + "&recaptcha_response_field=" + responseField,
	        async: false
	        }).responseText;
		if(html == "success") {
			if(contactType == "gi"){
				post_data = {'type':contactType, 'fname':fname, 'lname':lname, 'email':email, 'message':message};
			}else if(contactType == "pq"){
				post_data = {'type':contactType, 'fname':fname, 'lname':lname, 'email':email, 'cname':cname, 'csite':csite, 'ctitle':ctitle, 'pbudget':pbudget, 'pdate':pdate, 'poutline':poutline};	
			}
			// perform the ajax call
			$.post('mail.php', post_data, function(response){      
				if(response.type == 'error'){
					// an error occured
					output = response.text;
					$("#contact-fail").modal();
				}else{
					// success!
                    output = response.text;
                    $("#contact-success").modal();
                    //reset values
					$('textarea[name=message]').val(''); 
					$('input[name=pbudget]').val(''); 
					$('input[name=pdate]').val(''); 
					$('textarea[name=poutline]').val(''); 
					$("input#recaptcha_response_field").val('').css('background-color','').attr("placeholder", "Type the text");
					Recaptcha.reload();
                }
            }, 'json');

		} else {
			// Incorrect captcha
			$("input#recaptcha_response_field").css('background-color','#FCC').attr("placeholder", "Oops, that's not right! Try again.");
        	Recaptcha.reload();
		}
	});

	// reset background colour (from red if field left blank)
	$(".pure-form input, .pure-form textarea").keyup(function(){
		$(this).css('background-color',''); 
	});
	
	// check if email is valid format
	function isValidEmailAddress(emailAddress) {
    	var pattern = new RegExp(/^(("[\w-+\s]+")|([\w-+]+(?:\.[\w-+]+)*)|("[\w-+\s]+")([\w-+]+(?:\.[\w-+]+)*))(@((?:[\w-+]+\.)*\w[\w-+]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][\d]\.|1[\d]{2}\.|[\d]{1,2}\.))((25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\.){2}(25[0-5]|2[0-4][\d]|1[\d]{2}|[\d]{1,2})\]?$)/i);
		return pattern.test(emailAddress);
	};



	/***************************
	 * Scrolling & moving menu
	 ***************************/
	 
	 // ensure everything is below the fold
	 windHeight = $(window).height();
	 firstDistance = $("#company").offset().top;
	 if(firstDistance < windHeight){
		 $("#company").css("margin-top", windHeight/2);
	 }

	// auto-menu scrolling function
	var firstPass = 0
	function scrollToElement(selector, time, verticalOffset) {
		topDistance = $(selector).offset();
		distFromTop = $(document).scrollTop();
		windowHeight = $(window).height();
		if(firstPass == 0 && distFromTop < windowHeight){
			// bug fix: scrolls too far the first time function is invoked
			// but only when you start at the very top of page
			scrollToLocn = topDistance.top + verticalOffset - 50;
		}else {
			scrollToLocn = topDistance.top + verticalOffset;	
		}
		$('html, body').animate({scrollTop: scrollToLocn}, time);
		firstPass++;
	}
   	
   	// setup scrolling behaviour
   	$('a.company').click(function(){
	   	scrollToElement('#company', 500, -100);
	   	ga('send', 'event', 'menu', 'click', 'company');});
   	$('a.services').click(function(){
	   	if($("#servoffer").is(":visible")){
		   	scrollToElement('#services', 500, -30);
	   	}else{
		 	scrollToElement('#services', 500, -100);
	   	}
	   	ga('send', 'event', 'menu', 'click', 'services');});
   	$('a.portfolio').click(function(){
	   	scrollToElement('#portfolio', 500, -100);
	   	ga('send', 'event', 'menu', 'click', 'portfolio');});
   	$('a.contact').click(function(){
	   	scrollToElement('#contact', 500, -100);
	   	ga('send', 'event', 'menu', 'click', 'contact');});
   	
   	// vertically center the header
	windowHeight = $(window).height();
	headerHeight = $("header").height();
	paddingHeight = (windowHeight - headerHeight) / 2 - 100;
   	$("header").css("margin-top", paddingHeight);   
	
	// move the menu while scrolling
	var origPos = $("#movingmenu").offset().top;
	var posWas;
	var scrollDir;
	var origColour = "#FFF";
	var scrollColour = "#EEE";
	$(window).scroll(function() {
		
		//determine scroll direction	
		var pos = $(window).scrollTop();
		if(pos > posWas){
			scrollDir = "down";
		} else if(pos < posWas){
			scrollDir = "up";
		}
		posWas = pos; //new location value
	
		var distFromTop = $(document).scrollTop(); //current distance from the top
		var menuPosType = $("#movingmenu").css("position"); //whether menu is fixed or absolute
		var menuPostTop = $("#movingmenu").css("top"); //current menu distance from top
		if (distFromTop < origPos){
			if(menuPosType == "fixed" && menuPostTop == "0px"){ //if at top of page, ensure menu is below logo
				$("#movingmenu").css("position", "absolute").css("top", origPos).css("background", origColour);
				$("#menu").css("background", origColour);
			}else{
				$("#movingmenu").css("position", "absolute").css("background", origColour);
				$("#menu").css("background", origColour);
			}
		} else if(distFromTop > origPos-5 && distFromTop < origPos+5) { //covers a range to account for fast scrolling
			if(scrollDir == "down"){
				$("#movingmenu").css("position", "fixed").css("top", "0").css("background", scrollColour); //fix to top when scrolling down
				$("#menu").css("background", scrollColour);
			}else if (scrollDir == "up"){
				$("#movingmenu").css("position", "absolute").css("top", origPos).css("background", scrollColour); //place below logo when scrolling up
				$("#menu").css("background", scrollColour);
			}
		} else if (distFromTop > 95 && menuPostTop != "0px"){ //if scrolling, ensure menu is fixed at top
			$("#movingmenu").css("position", "fixed").css("top", "0px").css("background", scrollColour);
			$("#menu").css("background", scrollColour);
		}
	});
	


	/***************************
	 * Menu hover behaviour
	 ***************************/
 	
	// hide all menu icons
	$("#menu > ul > li > b").hide();
	
	// set all menu items to the width of the biggest one
	var biggestItem = 0;
	$('#menu > ul > li').each(function(i,j){
		if($(this).width() > biggestItem) {
			biggestItem = $(this).width();
		}
	});
	$('#menu > ul > li').each(function(i,j){
		$(this).width(biggestItem);
	});
	
	// define hover (icon swap) behaviour
	var origText;
	var origIcon;
	$("#menu > ul > li").hover(
		function(){
			origText = $(this).children("a").text();
			origIcon = $(this).children("b").html();
			$(this).children("a").html(origIcon);
		},function(){
			$(this).children("a").text(origText);
			$(this).children("b").html(origIcon);
			$(this).children("b").hide();
		}
	);

});