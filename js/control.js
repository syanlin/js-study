/**
 * Created by 艳林 on 2015/9/18.
 */
var infos = new Array();
infos[0] = ['小A','女',21,'大一'];
infos[1] = ['小B','男',23,'大三'];
infos[2] = ['小C','男',24,'大四'];
infos[3] = ['小D','女',21,'大一'];
infos[4] = ['小E','女',22,'大四'];
infos[5] = ['小F','男',21,'大一'];
infos[6] = ['小G','女',22,'大二'];
infos[7] = ['小H','女',20,'大三'];
infos[8] = ['小I','女',20,'大一'];
infos[9] = ['小J','男',20,'大三'];

//第一次筛选，找出都是大一的信息
var arr = new Array;
var n = 0;
for(var i = 0; i < 10; i++)
{
    if (infos[i][3] == "大一" ){
        arr[n] = infos[i];
        document.write(arr[n] + "</br>");
        n++;}

}
document.write("大一人数：" + arr.length +"</br>")
//第二次筛选，找出都是女生的信息

for (var i = 0; i < arr.length; i++)
{
    if (arr[i][1] == "女")
    {
        document.write(arr[i][0] + "</br>");
    }
}