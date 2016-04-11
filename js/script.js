$(function() {

	/* Navigation Scroll to id*/


	$(".main-nav a, .read-more ").mPageScroll2id({
		offset : -30,
		scrollSpeed : 1000,
		scrollingEasing: "easeInOutCirc"
	});




	/**************** Form Submit *******************/

	var textFields = $("#gform input[type='text']");

	var regExp = {
		firstName : /^[а-яА-ЯёЁa-zA-Z]+$/i,
		lastName : /^[а-яА-ЯёЁa-zA-Z]+$/i,
		email :  /^.+@.+\..+[^а-яА-ЯёЁ]+$/i,
		phone : /^[^а-яА-ЯёЁa-zA-Z]+$/
	};

	/* Real-time validation */
	textFields.change(function(){
		var field = $(this);
		var value = field.val();
		var name = field.attr("name");

		if( regExp[name].test(value) ) {
			field.removeClass("invalid").addClass("valid");
		} else {
			field.removeClass("valid").addClass("invalid");
		};
	});

	/* Validation before submitting the form */
	function validForm() {
		var validFlag;

		textFields.each(function(i, elem) {

			if($(elem).hasClass("invalid") ){
				validFlag = false;
				return false;
			} else if($(elem).hasClass("valid")){
				validFlag = true;
			} else {
				validFlag = false;
				return false;
			};
		});

		return validFlag;
	};

	function noteTheFields() {
		textFields.each(function(i, elem) {

			if(!$(elem).hasClass("invalid") && !$(elem).hasClass("valid")) {
				$(elem).addClass("invalid");
			};
		});

		$("input.invalid").first().trigger("focus"); // focus invalid fields

	};
	
  /* Get all data in form and return object */

	function getFormData() {
		var formData = {};
		$("#gform input[type='text'], #gform textarea").each(function(i, elem){
			formData[$(elem).attr("name")] = $(elem).val();
		});
		console.log(formData);
		return formData;
	};

	function resetForm(){
		$("#gform").trigger("reset");
		textFields.removeClass("valid").removeClass("invalid");
	};

	$("#gform").on("submit", function(event){

		event.preventDefault();
		var data = getFormData();
		
		if( !validForm() ) {
			noteTheFields();
			return false;
		} else {
			var url = event.target.action;
			var xhr = new XMLHttpRequest();
			xhr.open("POST", url);
		// xhr.withCredentials = true;
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.onreadystatechange = function() {
				console.log( xhr.status, xhr.statusText )
				console.log(xhr.responseText);
				
				return;
			};
	     // url encode form data for sending as post data
			var encoded = Object.keys(data).map(function(k) {
				return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
			}).join("&")
			xhr.send(encoded);
				
			$("#thankyou_message").fadeIn(1000);

			setTimeout(function() { 
				$("#thankyou_message").fadeOut(1000);
			}, 7000);

			resetForm();
				
		};
	});
	
	$("#gform input[type='reset']").click(resetForm);

});