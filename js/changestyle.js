/*
 * Created by 艳林 on 2015/9/14.
 */
//改变颜色
 function changecolor()
{   var yl = document.getElementById("xing");
    yl.style.color = "red";
    yl.style.backgroundColor = "blue";
}
//改变高低
function changewidth()
{
    var yl = document.getElementById("xing");
    yl.style.width = "300px";
    yl.style.height = "500px";
}
//显示内容
function display()
{
    var yl = document.getElementById("xing");
    yl.style.display = "block";
}
//隐藏内容
function hide()
{
    var yl = document.getElementById("xing");
    yl.style.display = "none";
}
//取消设置
function cancel()
{
    var yl = document.getElementById("xing")
    var xx = confirm("是否取消设置");
    if (xx == true)
    {
        xing.removeAttribute("style");
    }
    else
    {
    }
}