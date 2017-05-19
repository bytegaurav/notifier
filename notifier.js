var notifier =new  function()
{

	var template="";
	var that=this;
	this.placeholder;
	var notifications = new Object();

	var TimerObject = new Object();

	 var checkIfInIframe= function(){
    	try {
        	return window.self !== window.top;
    	} catch (e) {
        	return true;
    	}
  	 }	
	var showToast= function (message, messagetype) {
		var cpytemplate = template;
		var id= (new Date()).getTime()
		cpytemplate= cpytemplate.replace(new RegExp("{{notifId}}", "g"), id);
		cpytemplate= cpytemplate.replace(new RegExp("{{message}}", "g"), message);
		cpytemplate= cpytemplate.replace(new RegExp("{{class}}", "g"), messagetype);
		cpytemplate= cpytemplate.replace(new RegExp("{{action}}", "g"), "");
		
		$(getPlaceholderElement()).append(cpytemplate);
		$('#'+id).fadeIn();
		notifications[id]="";
		return id;
	}	


	var showAlert =function(message, messagetype)
	{
		var cpytemplate = template;
		var id= (new Date()).getTime()
		cpytemplate= cpytemplate.replace(new RegExp("{{notifId}}", "g"), id);
		cpytemplate= cpytemplate.replace(new RegExp("{{message}}", "g"), message);
		cpytemplate= cpytemplate.replace(new RegExp("{{class}}", "g"), messagetype);
		cpytemplate= cpytemplate.replace(new RegExp("{{action}}", "g"), "<a href='javascript:void(0)' class='cancel' data-id='"+id+"'>Dismiss</a>");
		
		$(getPlaceholderElement()).append(cpytemplate);
		notifications[id]="";
		$('#'+id).fadeIn();
		
		dynamicBinding();
		return id;
	}

	var closeNotif= function () {
		var id=$(this).attr("data-id");
		 $("#"+id).animate({opacity:0}, '500', 'swing', function(){

				 $("#"+id).remove();
				 	
				 });
				 
		delete notifications[id];

	}
	var confirmOk= function(){
		var id=$(this).attr("data-id");
		 $("#"+id).animate({opacity:0}, '500', 'swing', function(){

				 $("#"+id).remove();
				 	
				 });
				 
		delete notifications[id];
	
	}

	var dynamicBinding= function () {
	    //unbind evets
		var notifIds= Object.keys(notifications);
	 	for(var i=0; i<notifIds.length; i++)
	 	{
	 		$("#"+notifIds[i]).find(".cancel").off("click");
	 	}	
	 	//attach event
	    for(var i=0; i<notifIds.length; i++)
	 	{
	 		$("#"+notifIds[i]).find(".cancel").on("click", closeNotif);
 			$('#'+notifIds[i]).find(".yes").on("click",confirmOk)
	 	}	



	}
	this.notify = function(Message, type, messagetype, timeout) {
	
		type= type.toLowerCase();
		if(type=="toast")
		{  var id=showToast(Message, messagetype);
			 TimerObject[id]=setTimeout(function(){
				 $("#"+id).animate({opacity:0}, '500', 'swing', function(){

				 $("#"+id).remove();
				 	
				 });
				 
		        delete notifications[id];
				delete TimerObject[id];
			}, timeout);




		}
		else if(type=="alert")
		{	

			showAlert(Message, messagetype);
			


		}
		else if(type=="confirm")
		{
		 	
				//to do 
	 

		}

	}

	

	var getPlaceholderElement= function()
	{
		var placeholderElement;
		
				if(that.placeholder.indexOf("#")>-1)
				{
					var place = that.placeholder.replace("#", "");
					placeholderElement= parent.document.getElementById(place) || document.getElementById(place);

				}
				else if(that.placeholder.indexOf(".")>-1)
				{
					var place = that.placeholder.replace(".",  "");
					placeholderElement= parent.document.getElementsByClassName(place) || document.getElementsByClassName(place);
					placeholderElement = placeholderElement[0];
				}
				else{
					placeholderElement=	parent.document.getElementByTagName(that.placeholder) || document.getElementByTagName(that.placeholder);
				}

			return placeholderElement;

			

	}

	this.init= function(placeholderElement) {
		//load toast template
		template= $('#notiftemplate').html();
		that.placeholder=placeholderElement;


	}


}