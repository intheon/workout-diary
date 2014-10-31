$(document).ready(function(){

	$("#settings ul").click(function(event){
		$("#settings ul ul").slideToggle();
		$("#settings ul ul li").click(function(e){ 
			e.stopPropagation()
		});
	});

});
// this handles and assigns stuff to localstorage



var data = {};
var s;

function localStorageController(key,val,type)
{

	var stor = localStorage.getItem(type);
	var parse = JSON.parse(stor);


	// before i even submit this anywhere, build an object that groups together exercises

	if (!data.hasOwnProperty(type))
	{
		Object.defineProperty(data,type,{
			value: {},
			enumerable: true
		});
	}

	if (stor !== null)
	{
		for (keys in parse)
		{
			Object.defineProperty(data[type],keys,{
			value: parse[keys],
			enumerable: true
			});
		}
	}



		// now start appending 
		Object.defineProperty(data[type],key,{
			value: val,
			enumerable: true
		});

		// build a json string
		// the vars are global so everything gets appended
		s = JSON.stringify(data[type]);

		localStorage.setItem(type,s);

}

function overwriteController(jsonString)
{
	// this in essence 'deletes' properties because it overwrites the old string
	// with a new one, except the new one has the new one has the one you want to remove gone
	console.log(jsonString);
}



