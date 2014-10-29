$(document).ready(function(){

	$("#settings ul").click(function(event){
		$("#settings ul ul").slideToggle();
		$("#settings ul ul li").click(function(e){ 
			e.stopPropagation()
		});
	});

});
// this handles and assigns stuff to localstorage

function localStorageController(key,val,type)
{

var data = {};

	// before i even submit this anywhere, build an object that groups together exercises

	if (!data.hasOwnProperty(type))
	{
		Object.defineProperty(data,type,{
			value: {},
			enumerable: true
		});
	}

		Object.defineProperty(data[type],key,{
			value: val,
			enumerable: true
		});

	// now that the object is built, make a json string ready to be stored in localstorage
	// this is just going to be overwritten each time it updates.

		var s = JSON.stringify(data[type]);

	// submit to localstorage

		localStorage.setItem(type,s);

}

