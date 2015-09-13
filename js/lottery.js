var App = {};
/* 加密数据 */
App.secret = function (param) {
    var appkey = "1711394416800",
        secret = "cc1745453991ec29bfedd5f80a2d5bf0";
    var array = new Array();
    for (var key in param) {
        array.push(key);
    }
    array.sort();
    var paramArray = [];
    paramArray.push(appkey);
    for (var index in array) {
        var key = array[index];
        paramArray.push(key + (( typeof param[key] == "object" ) ? JSON.stringify(param[key]) : param[key]));
    }
    paramArray.push(secret);
    var shaSource = paramArray.join("");
    var sign = new String(CryptoJS.SHA1(encodeURIComponent(shaSource))).toUpperCase();
    return sign;
};

function getTime(dateStr) {
    dateStr = dateStr.trim();
    console.log("dateStr: " + dateStr);
    var arr = dateStr.split(' ');
    var arr1 = arr[0].split('-');
    var arr2 = arr[1].split(':');
    var date = new Date(arr1[0], arr1[1]-1, arr1[2], arr2[0], arr2[1], arr2[2]);
    console.log("date: " + date);
    return date.getTime() / 1000;
}

function getSelectActId() {
    var ret = parseInt($("#actName option:selected").val());
    if (ret == 'NaN')
        return 0;
    else
        return ret;
}

function getChooseRange(isWin) {
    if (isWin) {
        return $("#winChooseRange option:selected").val();
    } else {
        return $("#chooseRange option:selected").val();
    }

}

function getChooseAwardItem(isWin) {
    var arr = new Array();
    var idStr;
    if (isWin) {
        idStr = '#winChooseAwardItem';
    } else {
        idStr = '#chooseAwardItem';
    }
    if ($(idStr + ' option:selected').val() == undefined)
        return 0;
    arr.push($(idStr + " option:selected").val(), $(idStr + " option:selected").text().trim());
    return arr;
}

function emptyStr(str) {
    return str == null || str == '';
}

var confObj;

$(function(){
    $('.time_select').datetimepicker({
        showSecond: true,
        timeFormat: 'hh:mm:ss'
    });
    var paramObj = {"actType": 3};
    paramObj['sign'] = App.secret(paramObj);
    $.ajax({
        dataType: "json",
        data: paramObj,
        type: "GET",
        url: "/lottery/act_info",
        success: function (data) {
            if (data.success == true) {
                var dataList = data.list;
                for (var i = 0; i < dataList.length; i++) {
                    $("#actName").append("<option value=" + dataList[i].activityId + ">" + dataList[i].activityName + "</option>");
                }
            }
        }
    });

    $("#actName").change(function () {
        $("#chooseRange").empty();
        $("#chooseAwardItem").empty();
        $("#winChooseRange").empty();
        $("#winChooseAwardItem").empty();
        var actId = getSelectActId();
        if (actId) {
            var paramObj = {"actId" : actId};
            paramObj['sign'] = App.secret(paramObj);
            $.ajax({
                dataType: "json",
                type: "GET",
                data: paramObj,
                url: "/lottery/conf_info",
                success: function (data) {
                    if (data.success == true) {
                        confObj = data.data;
                        for (var i = 0; i < confObj.awardItems.length; i++) {
                            var item = confObj.awardItems[i];
                            if (item.num > 0) {
                                $("#chooseAwardItem").append("<option value=" + item.id + ">" + item.name + "</option>");
                            }
                        }
                        for (var i = 0; i < confObj.timeRanges.length; i++) {
                            var range = confObj.timeRanges[i];
                            $("#chooseRange").append("<option value=" + range.id + ">" + range.startTimeStr + " ~ " + range.endTimeStr +  "</option>");
                            $("#winChooseRange").append("<option value=" + range.id + ">" + range.startTimeStr + " ~ " + range.endTimeStr +  "</option>");
                        }
                    } else {
                        $("#s5").html(data.message);
                    }
                }
            })
        }
    });

    $("#addAward").click(function () {
        $("#s2").html("");
        var actId = getSelectActId();
        if (emptyStr($("#awardName").val()) || emptyStr($("#awardNum").val())
            || emptyStr($("#awardLevel").val())) {
            $("#s2").html("参数不能为空");
        } else if (!actId) {
            $("#s2").html("请选择活动");
        } else {
            var awardName = $("#awardName").val();
            var awardNum = parseInt($("#awardNum").val());
            var awardLevel = parseInt($("#awardLevel").val());
            var awardObj = {"action": 1, "name": awardName, "num": awardNum, "awardLevel": awardLevel, "actId": actId};
            awardObj['sign'] = App.secret(awardObj);
            $.ajax({
                data: awardObj,
                type: "GET",
                dataType: "json",
                url: "/lottery/add_config",
                success: function (data) {
                    if (data.success == true) {
                        $("#s2").html("添加成功");
                        $(".awardAddClass").val('');
                    } else {
                        $("#s2").html(data.message);
                    }
                }
            })
        }
    });

    $("#addPeriod").click(function() {
        $("#s3").html("")
        var actId = getSelectActId();
        if (emptyStr($("#d3_startTime").val()) || emptyStr($("#d3_endTime").val())) {
            $("#s3").html("选择日期");
        } else if (!actId) {
            $("#s3").html("请选择活动");
        } else {
            var paramObj = {"action": 2, "startTime": getTime($("#d3_startTime").val()), "endTime": getTime($("#d3_endTime").val()), "actId": actId};
            paramObj['sign'] = App.secret(paramObj);
            $.ajax({
                data: paramObj,
                type: "GET",
                dataType: "json",
                url: "/lottery/add_config",
                success: function (data) {
                    if (data.success == true) {
                        $("#s3").html("添加成功");
                    } else {
                        $("#d3_startTime").val("");
                        $("#d3_endTime").val("");
                        $("#s3").html(data.message);
                    }
                }
            });
        }
    });

    $("#addRange").click(function() {
        $("#s4").html("");
        var actId = getSelectActId();
        if (emptyStr($("#d4_startTime").val()) || emptyStr($("#d4_endTime").val())) {
            $("#s4").html("选择日期");
        } else if (!actId) {
            $("#s4").html("请选择活动");
        } else {
            var paramObj = {"action": 3, "startTime": getTime($("#d4_startTime").val()), "endTime": getTime($("#d4_endTime").val()), "actId": actId};
            paramObj['sign'] = App.secret(paramObj);
            $.ajax({
                data: paramObj,
                type: "GET",
                dataType: "json",
                url: "/lottery/add_config",
                success: function (data) {
                    if (data.success == true) {
                        $("#s4").html("添加成功");
                    } else {
                        $("#d4_startTime").val("");
                        $("#d4_endTime").val("");
                        $("#s4").html(data.message);
                    }
                }
            });
        }
    });

    $("#addSku").click(function() {
        $("#s5").html("");
        var actId = getSelectActId();
        var skuSize = parseInt($("#skuSize").val());
        var awardArr = getChooseAwardItem(0);
        if (!actId) {
            $("#s5").html("请选择活动");
        } else if (skuSize == "NaN" || skuSize < 1){
            $("#s5").html("填写有效地添加数目");
        } else if (!awardArr) {
            $("#s5").html("没有有效商品");
        } else {
            var paramObj = {"action": 4, "num": skuSize, "awardItemId": awardArr[0], "name": awardArr[1], "rangeId": getChooseRange(0),"actId": actId};
            paramObj['sign'] = App.secret(paramObj);
            $.ajax({
                data: paramObj,
                type: "GET",
                dataType: "json",
                url: "/lottery/add_config",
                success: function (data) {
                    if (data.success == true) {
                        $("#s5").html("添加成功");
                        $("#skuSize").val("");
                    } else {
                        $("#s5").html(data.message);
                    }
                }
            });
        }
    });

    $("#winChooseRange").change(function() {
        if (confObj) {
            var rangeId = getChooseRange(1);
            var skuNum;
            for(var i = 0; i < confObj.timeRanges.length; i++) {
                var dateObj = confObj.timeRanges[i];
                if (rangeId == dateObj.id) {
                    skuNum = dateObj.skuNum;
                    break;
                }
            }
            $("#winChooseAwardItem").empty();
            if (skuNum === null) skuNum = {};
            for (var i = 0; i < confObj.awardItems.length; i++) {
                var item = confObj.awardItems[i];
                if (item.num > 0 && (item.id in skuNum)) {
                    $("#winChooseAwardItem").append("<option value=" + item.id + ">" + item.name + "</option>");
                }
            }
        }
    });

    $("#winAward").click(function() {
        $("#s6").html("");
        var actId = getSelectActId();
        var rangeId = getChooseRange(1);
        var uid = parseInt($('#userId').val());
        var awardArr = getChooseAwardItem(1);
        if (!actId) {
            $("#s6").html("请选择活动");
        } else if (uid == "NaN") {
            $("#s6").html("填写的用户Id不正确");
        } else if (!awardArr) {
            $("#s6").html("没有有效商品");
        } else {
            var paramObj = {"action": 5, "uid": uid, "awardItemId": awardArr[0], "rangeId": rangeId, "actId": actId};
            paramObj['sign'] = App.secret(paramObj);
            $.ajax({
                data: paramObj,
                type: "GET",
                dataType: "json",
                url: "/lottery/add_config",
                success: function (data) {
                    if (data.success == true) {
                        $("#s6").html("添加成功");
                        $("#userId").val("");
                    } else {
                        $("#s6").html(data.message);
                    }
                }
            });
        }
    });

});
