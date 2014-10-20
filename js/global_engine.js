$(document).ready(function(){

	$("#settings ul").click(function(event){
		$("#settings ul ul").slideToggle();
		$("#settings ul ul li").click(function(e){ 
			e.stopPropagation()
		});
	});

});
