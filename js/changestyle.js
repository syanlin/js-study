/*
 * Created by ���� on 2015/9/14.
 */
//�ı���ɫ
 function changecolor()
{   var yl = document.getElementById("xing");
    yl.style.color = "red";
    yl.style.backgroundColor = "blue";
}
//�ı�ߵ�
function changewidth()
{
    var yl = document.getElementById("xing");
    yl.style.width = "300px";
    yl.style.height = "500px";
}
//��ʾ����
function display()
{
    var yl = document.getElementById("xing");
    yl.style.display = "block";
}
//��������
function hide()
{
    var yl = document.getElementById("xing");
    yl.style.display = "none";
}
//ȡ������
function cancel()
{
    var yl = document.getElementById("xing")
    var xx = confirm("�Ƿ�ȡ������");
    if (xx == true)
    {
        xing.removeAttribute("style");
    }
    else
    {
    }
}