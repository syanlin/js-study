/**
 * Created by ���� on 2015/9/18.
 */
var infos = new Array();
infos[0] = ['СA','Ů',21,'��һ'];
infos[1] = ['СB','��',23,'����'];
infos[2] = ['СC','��',24,'����'];
infos[3] = ['СD','Ů',21,'��һ'];
infos[4] = ['СE','Ů',22,'����'];
infos[5] = ['СF','��',21,'��һ'];
infos[6] = ['СG','Ů',22,'���'];
infos[7] = ['СH','Ů',20,'����'];
infos[8] = ['СI','Ů',20,'��һ'];
infos[9] = ['СJ','��',20,'����'];

//��һ��ɸѡ���ҳ����Ǵ�һ����Ϣ
var arr = new Array;
var n = 0;
for(var i = 0; i < 10; i++)
{
    if (infos[i][3] == "��һ" ){
        arr[n] = infos[i];
        document.write(arr[n] + "</br>");
        n++;}

}
document.write("��һ������" + arr.length +"</br>")
//�ڶ���ɸѡ���ҳ�����Ů������Ϣ

for (var i = 0; i < arr.length; i++)
{
    if (arr[i][1] == "Ů")
    {
        document.write(arr[i][0] + "</br>");
    }
}