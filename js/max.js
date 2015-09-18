/**
 * Created by 艳林 on 2015/9/18.
 */
function max(a, b)
{
    if (a > b){
        return a;}
    else if (a == b){
        return "一样大";}
    else{
        return b;}
}
document.write(" 5 和 4 的较大值是:"+ max(5, 4) + "<br>");
document.write(" 6 和 3 的较大值是:" + max(6, 3));