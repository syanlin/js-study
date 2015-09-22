/**
 * Created by ячаж on 2015/9/22.
 */
function count()
{
    var x = parseInt(document.getElementById("one").value);
    var y = parseInt(document.getElementById("two").value);
    var select = document.getElementById("select").value;
    var rs = '';
    switch(select)
    {
        case "+":
            rs = x + y;
            break;
        case "-":
            rs = x - y;
            break;
        case "*":
            rs = x * y;
            break;
        case "/":
            rs = x / y;
            break;
    }
    rs = document.getElementById("rs").value;
}