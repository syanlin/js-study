/**
 * Created by 艳林 on 2015/9/14.
 */
function openw()
{
    var message = confirm("是否打开新窗口?");
    if  (message == true)
    {
        window.open("https://www.baidu.com/", '_blank', 'width = 400, height = 500, menubar = no, toolbar = no');
    }
}
