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
			enumerable: true,
			writable: true
		});
	}

	if (stor !== null)
	{
		for (keys in parse)
		{
			Object.defineProperty(data[type],keys,{
			value: parse[keys],
			enumerable: true,
			writable: true
			});
		}
	}

		// now start appending 
		Object.defineProperty(data[type],key,{
			value: val,
			enumerable: true,
			writable: true
		});

		// build a json string
		// the vars are global so everything gets appended
		s = JSON.stringify(data[type]);

		localStorage.setItem(type,s);

}

function whatDate()
{
	var date = new Date(); // create a date object
    var dayOfMonth = date.getDate(); // get our day of the month;
    var dayOfWeek = date.getDay(); // get our day of the week
    var month = date.getMonth();
    var result = dayOfMonth % 10; // modulo to get remainder, will give val within range 1-4
    var o; // blank ordinal
    if (dayOfMonth >= 4 && dayOfMonth <= 20)
        {
            o = "th";
        } 
        // because numbers 4 to 20 are th's ^^
        // everything else follows the same ordinal labelling vv
    else
    {
        switch (result)
        {
            case 1:
            o = "st";
            break;
            case 2:
            o = "nd";
            break;
            case 3:
            o = "rd";
            break;
            default:
            o = "th";
            break;
        }
    } 

    var days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var write = days[dayOfWeek-1] + " the " + dayOfMonth + o + " of " + months[month];
    return write;
}


function showWarning(msg)
{
	$("body").append("<div class='warning'>\
	"+msg+"<br /><br />\
	<span class='dismiss'>close x</span>\
	</div>");

		$(".warning").hide().fadeIn();

		$(".warning").click(function(){
			$(this).fadeOut(500, function(){
			$(this).remove()
		})
	});
}

