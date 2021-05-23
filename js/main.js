jQuery(document).ready(function(){

		// Get country data
		jQuery('#country').load('php/getCountry.php');

		jQuery('#phoneType').change(function(){
			let type = jQuery('#phoneType').val();
			console.log(type);
			if(type == "phone" || type == "mobile"){
				jQuery('#phone').show();
				jQuery('#fax').hide();
			}
			else if(type == "fax"){
				jQuery('#phone').hide();
				jQuery('#fax').show();
			}
		});

		/*********** Get State *************/
		jQuery('#country').change(function(){
			let country_id = jQuery('#country').val();
			console.log(country);
			let id = 'cid='+country_id;
			jQuery.ajax({
				url : 'php/getState.php',
				type : 'get',
				data : id,
				success: function(data){
					jQuery('#state').empty();
					jQuery('#state').append(data);
				}
			});

		});

		/*********** Get City *************/
		jQuery('#state').change(function(){
			let state_id = jQuery('#state').val();
			console.log(state);
			let id = 'id='+state_id;
			jQuery.ajax({
				url : 'php/getCity.php',
				type : 'get',
				data : id,
				success: function(data){
					jQuery('#city').empty();
					jQuery('#city').append(data);
				}
			});

		});

		// Image Gallery
		jQuery('#multiImg img').on({
			mouseover : function(){
				jQuery(this).css({'border-color':'red', 'width':'110px', 'height':'110px'});
			},
			mouseout : function(){
				jQuery(this).css({'border-color':'gray','width':'100px', 'height':'100px'});
			},
			click : function(){
				let selectedImg = jQuery(this).attr('src');
				jQuery('#mainImg').fadeOut(400,function(){
					jQuery(this).attr('src',selectedImg);
				}).fadeIn(400);
				// console.log(selectImg);
			},
		});
		//delete Image
		jQuery('.deleteImg').click(function(){
				let deleteImg = jQuery(this).parent('div').children('img').attr('src');
				let mainImg = jQuery('#mainImg').attr('src');
				console.log(mainImg);
				console.log(deleteImg);
				if(mainImg == deleteImg){
					jQuery('#mainImg').attr('src','images/Default.png');
				}
				jQuery(this).parent('div').remove();
				// jQuery('#mainImg').attr('src',imgSrc);
		});

		jQuery('#companyType').change(function(){
			let type = jQuery('#companyType').val();
			console.log(type);
			if(type == "other"){
				jQuery('#othertype').show();
			}else{
				jQuery('#othertype').hide();
			}
		});

		jQuery('#othertype').change(function(){
			let other = jQuery('#othertype').val();
			jQuery('#companyType').append("<option value='" + other + "' selected>" + other + "</option>");
		});

	//multiselect
	jQuery('#companyProduct').multiselect({
		columns:1,
		addSearchBox:true,
		addActionBox:true,
		animateSearch:true,
		placeholder:"Select Company Product",
		submitDataAsArray:true,
	});

	//Validation with validate plugin
//create own rules
	//addMethod('rule name',rule function,message)
	jQuery.validator.addMethod("strongPassword",function(value){
		return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/.test(value);
	},"Password UpperCase, LowerCase and Number");

	jQuery('#form').validate({
		rules:{
			fname:{
				required:true,
				minlength:3,
				maxlength:10,
				nowhitespace:true,
				lettersonly:true
			},
			lname:{
				required:true,
				minlength:3,
				maxlength:10,
				nowhitespace:true,
				lettersonly:true
			},
			email:{
				required:true,
				email:true
			},
			pass:{
				required:true,
				minlength:8,
				strongPassword:true
				// alphanumeric:true  //letters and numbers only
			},
			cpass:{
				required:true,
				minlength:8,
				equalTo:'#pass'
			},
			company:{
				required:true
			},
			logo:{
				required:true
			},
			country:{
				required:true
			},
			state:{
				required:true
			},
			city:{
				required:true
			},
			description:{
				required:true,
				letterswithbasicpunc:true
			},
			phone:{
				required:true,
				minlength:10,
				// number:true // accept Int and float
				digits:true //only accept digits
			},
			companyType:{
				required:true
			},
			othertype:{
				required:true
			},
			starDate:{
				required:true,
				// date:true // only for input type=text and formate is year-month-date
			},
			'companyProduct[]':{
				required:true
			},
			'hobbies[]':{
				required:true
			},
			'exist[]':{
				required:true
			},
			check:{
				required:true
			}
		},
		messages:{
			fname:{
				required:"Please Enter First Name"
			},
			lname:{
				required:"Please Enter Last Name"
			},
			email:{
				required:"Email is required",
				email:"Invalid Email"
			},
			pass:{
				required:"Password is required",
				minlength:"Passwords must contain at least 8 characters"
			},
			cpass:{
				required:"Password is required",
				minlength:"Passwords must contain at least 8 characters",
				equalTo:"Both Password are not match"
			},
			company:{
				required:"Company name required"
			},
			logo:{
				required:"logo required"
			},
			country:{
				required:"Please select your Country"
			},
			state:{
				required:"Please select your State"
			},
			city:{
				required:"Please select your City"
			},
			description:{
				required:"Please fill Description field"
			},
			phone:{
				required:"Contact Number is must required",
			},
			companyType:{
				required:"Please select company type"
			},
			othertype:{
				required:"Please define your company type"
			},
			starDate:{
				required:"Please enter start date of company",
			},
			'companyProduct[]':{
				required:"Please select company product"
			},
			'hobbies[]':{
				required:"Please choose your hobbies"
			},
			'exist[]':{
				required:"Please Answer Yes or No"
			},
			check:{
				required:"Please agree terms and conditions"
			}
		},
		highlight:function(element){
			jQuery(element).addClass('e1');
		},
		unhighlight:function(element){
			jQuery(element).removeClass('e1');
		},
		invalidHandler:function(element){
			let validator = jQuery('#form').validate();
			jQuery('#numInvalid').text(validator.numberOfInvalids() + " fields are invalid...");
		}
	});

	jQuery('#phone').keyup(function(){
		let phone = jQuery(this).val();
		let regx = /^[9][0-9]{9}$/;
		if(!regx.test(phone)){
			jQuery('label[for=phone]').css('display','block').text('Phone Number Must be start with 9');
		}
	});
	jQuery('#fax').keyup(function(){
		let fax = jQuery(this).val();
		let regx = /^(\+?\d{1,}(\s?|\-?)\d*(\s?|\-?)\(?\d{2,}\)?(\s?|\-?)\d{3,}\s?\d{3,})$/;
		if(!regx.test(fax)){
			jQuery('label[for=phone]').css('display','block').text('Formate: [+(contry code)(area code)(fax number)]');
		}
	});

	jQuery('#form').on('submit',function(event){
		event.preventDefault();

		let formData = new FormData();
		console.log(formData);
		// jQuery.ajax({
		// 	url : 'php/submit',
		// 	type : 'post',
		// 	data :
		// });
	});

	

});