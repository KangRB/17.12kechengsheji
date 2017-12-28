/**
 * Created by 83579 on 2017/12/21.
 */
var ABC = ["A","B","C","D","E","F","G","H",
    "I","J","K","L","M","N","O","P","Q",
    "R","S","T","U","V","W","X","Y","Z"];
var a_time = []; // 到达时间
var s_time = []; // 服务时间
var b_time = []; // 开始时间
var f_time = []; // 完成时间
var t_time = []; // 周转时间
var W_time = []; // 带权周转时间
var order = [];  // 执行顺序
var time_film = 0;

function checkNumber (obj){
    var reg = /^[0-9]+.?[0-9]*$/;
    if(reg.test(obj)){
        return true;
    }
    else{
        return false;
    }
}
$(function(){
    //  数据录入初始化--begin
    $("#TbIN").empty();
    $(".readin").one("click","button",function(){
        var str = $("#in").val();
        if(checkNumber(str)){
            var Num = parseInt(str);
            if(Num>26){
                Num = 26;
                alert("进程数太多啦！！！");
            }
            for(var i = 0;i < Num;i++){
                var ainput = $("<input type='text' class='ai'>").attr("id","a"+i);
                var ainput_td = $("<td></td>");
                var sinput = $("<input type='text'>").attr("id","s"+i);
                var sinput_td = $("<td></td>");
                var trTemp = $("<tr></tr>");
                trTemp.append("<td>请输入进程"+(i+1)+"的信息：</td>");
                trTemp.append("<td>"+ABC[i]+"</td>");
                trTemp.append(ainput_td);
                ainput_td.append(ainput);
                trTemp.append(sinput_td);
                sinput_td.append(sinput);
                $("#TbIn").append(trTemp);
                order[i] = ABC[i];
            }
        }
        else{
            alert("请输入数字");
            window.location.reload();
        }
    });
    // 数据录入初始化--end
    // 数据收集并调用算法计算--begin
    $("#calculation").one("click",function(){
        var ainp = $(".ai");
        for(var i = 0;i < ainp.length;i++){
            var tmp1 = "#a"+ i;
            var tmp2 = "#s"+ i;
            a_time[i] = parseFloat($(tmp1).val());
            s_time[i] = parseFloat($(tmp2).val());
        }
        time_film = parseInt($(".time-film input").val());
        var str = "";
        // SJF--begin
        var sjf = new SJF(a_time,order,s_time,b_time,f_time,t_time,W_time);
        for(var i=0;i<order.length;i++){
            if(i!=order.length-1){
                str=str+sjf.Order[i]+"-->";
            }
            else{
                str=str+sjf.Order[i];
            }
        }
        $("#SJF_span1 b").text(str);
        for(var i=0;i<order.length;i++){
            var trTemp = $("<tr></tr>");
            trTemp.append("<td>"+sjf.Order[i]+"</td>");
            trTemp.append("<td>"+sjf.a_Array[i]+"</td>");
            trTemp.append("<td>"+sjf.s_Array[i]+"</td>");
            trTemp.append("<td>"+sjf.b_Array[i]+"</td>");
            trTemp.append("<td>"+sjf.f_Array[i]+"</td>");
            trTemp.append("<td>"+sjf.t_Array[i]+"</td>");
            trTemp.append("<td>"+sjf.W_Array[i]+"</td>");
            $("#SJF_table").append(trTemp);
        }
        $("#SJF_span2 b").text(sjf.T);
        $("#SJF_span3 b").text(sjf.W);
        // SJF--end

        // JCJS--begin
        var fcfs = new FCFS(a_time,order,s_time,b_time,f_time,t_time,W_time);
        str = "";
        for(var i=0;i<order.length;i++){
            if(i!=order.length-1){
                str=str+fcfs.Order[i]+"-->";
            }
            else{
                str=str+fcfs.Order[i];
            }
        }
        $("#FCFS_span1 b").text(str);
        for(var i=0;i<order.length;i++){
            var trTemp = $("<tr></tr>");
            trTemp.append("<td>"+fcfs.Order[i]+"</td>");
            trTemp.append("<td>"+fcfs.a_Array[i]+"</td>");
            trTemp.append("<td>"+fcfs.s_Array[i]+"</td>");
            trTemp.append("<td>"+fcfs.b_Array[i]+"</td>");
            trTemp.append("<td>"+fcfs.f_Array[i]+"</td>");
            trTemp.append("<td>"+fcfs.t_Array[i]+"</td>");
            trTemp.append("<td>"+fcfs.W_Array[i]+"</td>");
            $("#FCFS_table").append(trTemp);
        }
        $("#FCFS_span2 b").text(fcfs.T);
        $("#FCFS_span3 b").text(fcfs.W);
        // JCJS--end
        // RR--begin
        var rr = new RR(a_time,order,s_time,b_time,f_time,t_time,W_time,time_film);
        str = "";
        for(var i=0;i<order.length;i++){
            if(i!=order.length-1){
                str=str+rr.Order[i]+"-->";
            }
            else{
                str=str+rr.Order[i];
            }
        }
        $("#RR_span1 b").text(str);
        for(var i=0;i<order.length;i++){
            var trTemp = $("<tr></tr>");
            trTemp.append("<td>"+rr.Order[i]+"</td>");
            trTemp.append("<td>"+rr.a_Array[i]+"</td>");
            trTemp.append("<td>"+rr.s_Array[i]+"</td>");
            trTemp.append("<td>"+rr.b_Array[i]+"</td>");
            trTemp.append("<td>"+rr.f_Array[i]+"</td>");
            trTemp.append("<td>"+fcfs.t_Array[i]+"</td>");
            trTemp.append("<td>"+fcfs.W_Array[i]+"</td>");
            $("#RR_table").append(trTemp);
        }
        $("#RR_span2 b").text(rr.T);
        $("#RR_span3 b").text(rr.W);
        // RR--end
    });
    // 数据收集并调用算法计算--end
});