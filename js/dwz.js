var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D',
    'E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T',
    'U','V','W','X','Y','Z','a','b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
    'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
function get_dwz(long_url)
{
    var ret = "";
    for (var i = 0; i < 5; i++)
    {
        var index = Math.ceil(Math.random() * (chars.length - 1));
        ret += chars[index];
    }
    return "http://dwz.cn/" + ret;
}
$(document).ready(function(){
    $("button").click(function() {
        var cwz = $("#long_url").val();
        console.log("cwz: " + cwz)
        if (cwz.length == 0)
        {
            alert("ÇëÊäÈë³¤ÍøÖ·");
        } else {
            $("#dwz").html("¶ÌÍøÖ·: " + get_dwz(cwz));
        }
    });

});
