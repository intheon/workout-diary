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

function dayOfYearCounter()
{
	var now = new Date();
	var start = new Date(now.getFullYear(), 0, 0);
	var diff = now - start;
	var oneDay = 1000 * 60 * 60 * 24;
	var day = Math.floor(diff / oneDay);
	return day;
}

function calendarHandler()
{
	// basically right, i only have a STRING of the day that i started on.
	// I need to work out what the other 6 date are from that starting date and plonk them on a calendar
	var test = "Thursday the 3rd of December";

	// very clever shit! extract any word thats split by a space
	// these are STRINGS
	var firstWord =  test.split(/\s+/).slice(0,1).join(" ");
	var secondNum = test.split(/\s+/).slice(2,3).join(" ");
		secondNum = secondNum.substr(0,secondNum.length-2);
	var thirdMonth = test.split(/\s+/).slice(4,5).join(" ");

	var days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    var numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    var dayNamePosition = jQuery.inArray(firstWord,days);
    var dayPosition = jQuery.inArray(secondNum,numbers);
    var monthPosition = jQuery.inArray(thirdMonth,months);
    
    for (i = 0; i < 6; i++)
    {
    	console.log(i);
    }

    console.log(dayNamePosition);
    console.log(dayPosition);
    console.log(monthPosition);


/*


    if (dayNamePosition == days.length - 1)
    {
    	dayNamePosition = 0;

    	    console.log(dayNamePosition);
    		console.log(days.length - 1);
    		console.log(days[dayNamePosition]);
    }
    else
    {
    	    console.log(dayNamePosition);
   	 		console.log(days.length - 1);
    		console.log(days[dayNamePosition + 1]);

    		console.log(days[dayNamePosition + 1] + " the " + (parseInt(secondNum) + 1) + " of " + months[monthPosition]);
    }





 	//console.log(days[position + 1]);
    // *****
    // lets chop this mother up
    // *****

    

*/
   
}


function getOrdinal(number)
{
	var o = number; // blank ordinal
    if ((parseInt(secondNum) + 1) >= 4 && (parseInt(secondNum) + 1) <= 20)
        {
            o = "th";
        } 
        // because numbers 4 to 20 are th's ^^
        // everything else follows the same ordinal labelling vv
    else
    {
        switch ((parseInt(secondNum)  + 1 )% 10)
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

	return ordinal;
}


