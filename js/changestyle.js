/**
 * Created by 艳林 on 2015/9/14.
 */
//改变颜色函数
 function changecolor()
{
    mychar = document.style.color;
    mychar = document.style.backgroundColor;
}

function changewidth()
{
    mychar = document.style.width;
    mychar = document.style.height;
}
function display()
{
    mychar = document.style.display = none;
}

function hide()
{
    mychar = document.style.display = none
}

function cancel()
{
    mychar = confirm("是否取消设置")
    if (mychar == true)
    {

    }
}