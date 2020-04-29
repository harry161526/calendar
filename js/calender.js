

var date = new Date();
function RenderCalendar()
{
    date.setDate(1)
    var day = date.getDay();
    var last_day=date.getDay(endDate)

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
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
    ];
    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    document.getElementById('date_str').innerHTML=monthNames[date.getMonth()]+"-"+date.getFullYear();

    var cells ="";

    for(x=day; x>0; x--)
    {
        cells+="<div class='prev_date'>"+(prevDate-x+1)+"</div>"
    }
    for(i=1;i<=endDate.getDate();i++)
    {
        if(i==today)
        {
            cells+="<div class='active'>"+i+"</div>"
            var today = new Date(
                date.getFullYear(),
                date.getMonth(),
                i
            ).getDay()
        
            document.getElementsByClassName("current_date")[0].innerHTML=i
            document.getElementsByClassName("current_day")[0].innerHTML=weekdays[today]
        }
        else
        
        {
            cells+="<div onclick='change(i)'>"+i+'</div>'
        }
        
    }
    for(j=endDate.getDay(),k=1;j<6;j++,k++)
    {
        cells+="<div class='next_date'>"+k+"</div>"
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

function change(i)
{
    alert(i)
}