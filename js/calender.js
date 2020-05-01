const monthNames = ["January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

var date = new Date();
//function for rendering the dates
function RenderCalendar()
{
    date.setDate(1);
    var day = date.getDay();
    var endDate = new Date(
        date.getFullYear(),
        date.getMonth()+1,
        0
    )
    var prevDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDate();
    var today = new Date().getDate();
    document.getElementById('date_str').innerHTML=monthNames[date.getMonth()]+"-"+date.getFullYear();
    var cells ="";
    for(x=day; x>0; x--)
    {
        cells+="<div class='prev_date dates' onclick='change()'>"+(prevDate-x+1)+"</div>"
    }
    for(i=1;i<=endDate.getDate();i++)
    {
        if(i==today)
        {
            if(i<10)
            {
                console.log(i);
                cells+="<div class='dates' onclick='change()'>0"+i+"</div>"
            }
            else
            {
                cells+="<div class='dates' onclick='change()'>"+i+"</div>"
            }
            
            var today = new Date(
                date.getFullYear(),
                date.getMonth(),
                i
            )
            if(today.getDate()<10)
                document.getElementsByClassName("current_date")[0].innerHTML="0"+today.getDate();
            else
                document.getElementsByClassName("current_date")[0].innerHTML=today.getDate();
            document.getElementsByClassName("current_day")[0].innerHTML=weekdays[today.getDay()]
        }
        else
        {
            if(i<10)
                cells+="<div class='dates' onclick='change()'>0"+i+'</div>'
            else
            {
                cells+="<div class='dates' onclick='change()'>"+i+'</div>'
            }
            
            
        }
    }
    for(j=endDate.getDay(),k=1;j<6;j++,k++)
    {
        cells+="<div class='next_date dates' onclick='change()'>0"+k+"</div>"
    }
    document.getElementsByClassName('date')[0].innerHTML=cells;
}
function movemonth(parm)
{
    if(parm == 'prev')
    {
        date.setMonth(date.getMonth()-1)
    }
    else
    {
        date.setMonth(date.getMonth()+1)
    }
    RenderCalendar();
}
//function for displaying other dates on right side
function change()
{
    var dates = document.getElementsByClassName("date")[0];
    dates.onclick = e => {
        var clicked = Number(e.target.textContent);
        if(clicked != NaN && clicked<32)
        {
            if(e.target.className.includes("prev_date"))
            {
                console.log(e.target.className);
                movemonth("prev")
            }
            if(e.target.className.includes("next_date"))
            {
                console.log(e.target.className);
                movemonth("")
            }
            document.getElementsByClassName("current_date")[0].innerHTML = clicked;
            var today = new Date(
                date.getFullYear(),
                date.getMonth(),
                clicked
            ).getDay()
            document.getElementsByClassName("current_day")[0].innerHTML=weekdays[today];
            //validating if the selected date has added event
           check()
        }
    }  
}
function check()
{
    var result = getkey();
    console.log(result[0])
    if(result[0] in localStorage)
    {
        console.log(result)
        document.getElementById("event_info").innerHTML=localStorage.getItem(result[0]);
        document.getElementsByClassName("event")[0].style.display="none";
    }
    else
    {
        console.log("entered it...")
        document.getElementById("event_input").value=null;
        document.getElementById("event_info").innerHTML=null;
        document.getElementsByClassName("event")[0].style.display="inline";
    }
}
//function for storing the event
function add_event()
{
    var result =  getkey();
    localStorage.setItem(result[0],result[1]);
    document.getElementsByClassName("event")[0].style.display="none";
}
//function for getting the current date as key and event as value
function getkey()
{
    var date = Number(document.getElementsByClassName("current_date")[0].textContent);
    var month = document.getElementById("date_str").textContent;
    var key_str = date+"-"+month;
    var event = document.getElementById("event_input").value;
    return [key_str,event]
}
window.addEventListener("keyup",checkpressed,false);
function checkpressed(key)
{
    if(key.keyCode=="40")
    {
         changeDate("prev")            
    }
    if(key.keyCode=="38")
    {
        changeDate("next")
    }
}

function changeDate(key)
{
    var current_date=Number(document.getElementsByClassName("current_date")[0].textContent);
    //var current_day=document.getElementsByClassName("current_day")[0].innerHTML
    if(key=="prev")
    {
        if(current_date==1)
        {
            movemonth("prev")
            var pre = new Date(
                date.getFullYear(),
                date.getMonth()+1,
                0
            )
            console.log(pre.getDate())
                document.getElementsByClassName("current_date")[0].innerHTML=pre.getDate();
            document.getElementsByClassName("current_day")[0].innerHTML=weekdays[pre.getDay()];
        }
        else
        {
            current_date-=1;
            var current = new Date(
                date.getFullYear(),
                date.getMonth(),
                current_date
            ).getDay()
            if(current_date<10)
                document.getElementsByClassName("current_date")[0].innerHTML="0"+current_date;
            else
                document.getElementsByClassName("current_date")[0].innerHTML=current_date;
            document.getElementsByClassName("current_day")[0].innerHTML=weekdays[current];
        }
        check()
    }
    else
    {
        var current = new Date(
            date.getFullYear(),
            date.getMonth()+1,
            0
        ).getDate()
        console.log(current)
            //console.log(current_date)
        if(current_date==current)
        {
            movemonth("next")
            document.getElementsByClassName("current_date")[0].innerHTML="0"+date.getDate();
            document.getElementsByClassName("current_day")[0].innerHTML=weekdays[date.getDay()];
        }
        else
            {
                if(current_date==1)
                {
                    console.log("entered...")
                    //current_date+=1;
                    document.getElementsByClassName("current_date")[0].innerHTML="0"+(current_date+1);
                    document.getElementsByClassName("current_day")[0].innerHTML=weekdays[date.getDay()];
                    
                }
                else
                {
                    console.log("entered else block...")
                    current_date+=1;
                    var current = new Date(
                        date.getFullYear(),
                        date.getMonth(),
                        current_date
                        ).getDay()
                    if(current_date<10)
                        document.getElementsByClassName("current_date")[0].innerHTML="0"+current_date;
                    else
                        document.getElementsByClassName("current_date")[0].innerHTML=current_date;
                    
                    document.getElementsByClassName("current_day")[0].innerHTML=weekdays[current];
                    
                }
                
            }
            check()
    }
}

