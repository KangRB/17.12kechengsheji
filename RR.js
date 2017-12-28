/**
 * Createa by 83579 on 2017/12/21.
 */
function RR(a_array, order, s_array, b_array, f_array, t_array, W_array, time_film) {
    this.a_Array = a_array;
    this.Order = order;
    this.s_Array = s_array;
    this.b_Array = b_array;
    this.f_Array = f_array;
    this.t_Array = t_array;
    this.W_Array = W_array;
    var mark = []; // 记录进程是否执行完毕 二维数组
    var t_f = []; // mark标记数组 完毕为true否为false
    var r_t = []; // 剩余服务时间
    // 数据初始化
    for (var i = 0; i < a_array.length; i++) {
        b_array[i] = 0;
        f_array[i] = 0;
        t_array[i] = 0;
        W_array[i] = 0;
        t_f[i] = false;
        r_t[i] = 0;
    }
    mark[0] = order;
    mark[1] = t_f;
    // 先按FCFS策略排成一个就绪队列
    var len = a_array.length, a, o, s;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len; j++) {
            if (a_array[i] < a_array[j]) {
                a = a_array[j];
                a_array[j] = a_array[i];
                a_array[i] = a;

                o = order[j];
                order[j] = order[i];
                order[i] = o;

                s = s_array[j];
                s_array[j] = s_array[i];
                s_array[i] = s;
            }
        }
    }

    var new_begin_time = []; // 新一轮开始时间
    var rest_time = []; // 剩余时间 二维数组
    rest_time[0] = order;
    rest_time[1] = r_t;
    var stop_time = []; // 停止时间
    var tmp = a_array.length;
    var hhh = 1;
    while (tmp > 0) {
        // 创建进程调度信息表格
        var table = $("<table></table>");
        var tbody = $("<tbody></tbody>");
        // 第一轮进程调度
        if (tmp == order.length) {
            // 主页面插入第一轮进程调度信息表格
            var span = $("<span>第"+hhh+"轮进程调度信息</span>");
            table.append("<thead>" +
                "<tr>" +
                "<th>进程名</th>" +
                "<th>到达时间</th>" +
                "<th>服务时间</th>" +
                "<th>开始时间</th>" +
                "<th>停止时间</th>" +
                "<th>剩余时间</th>" +
                "</tr>" +
                "</thead>");

            for (var i = 0; i < order.length; i++) {
                // 计算剩余时间
                rest_time[1][i] = s_array[i] - time_film;
                // 计算开始时间
                if (i == 0) {
                    b_array[i] = a_array[i];// 第一轮第一个进程开始时间为其到达时间
                }
                else {
                    b_array[i] = stop_time[i - 1];//进程开始时间为上个进程的停止时间
                }
                // 计算停止时间
                if (rest_time[1][i] <= 0) {
                    // 进程结束后 把其最终停止时间记录在结束时间
                    stop_time[i] = b_array[i] + time_film + rest_time[1][i];
                    mark[1][i] = true;
                    f_array[i] = stop_time[i];
                    tmp--;
                }
                else {
                    stop_time[i] = b_array[i] + time_film;
                }
                // 表格插入各信息
                var tr = $("<tr></tr>");
                tbody.append(tr);
                tr.append("<td>"+ order[i] +"</td>");
                tr.append("<td>"+ a_array[i] +"</td>");
                tr.append("<td>"+ s_array[i] +"</td>");
                tr.append("<td>"+ b_array[i] +"</td>");
                tr.append("<td>"+ stop_time[i] +"</td>");
                tr.append("<td>"+ rest_time[1][i] +"</td>");
            }
            $("div.detail").append(span);
            table.append(tbody);
            $("div.detail").append(table);
            new_begin_time[0] = stop_time[order.length - 1];
        }
        // 第二轮进程调度到最后
        else {
            // 向主页面插入接下来的进程调度信息
            var span = $("<span>第"+hhh+"轮进程调度信息</span>");
            $("div.detail").append(span);
            table.append("<thead>" +
                "<tr>" +
                "<th>进程名</th>" +
                "<th>服务时间</th>" +
                "<th>开始时间</th>" +
                "<th>停止时间</th>" +
                "<th>剩余时间</th>" +
                "</tr>" +
                "</thead>");
            $("div.detail").append(table);

            // 创建新的就绪队列
            var new_order = [];
            var sum = 0;
            var new_service_time = []; //剩余服务时间->新一轮服务时间
            var new_stop_time = []; // 新一轮停止时间
            var new_rest_time = []; // 新一轮剩余时间
            // 未完成的进程插入新的就绪队列
            for (var i = 0; i < a_array.length; i++) {
                if (!mark[1][i]) {
                    new_order[sum] = order[i];
                    new_service_time[sum] = rest_time[1][i];
                    sum++;
                }
            }
            for (var i = 0; i < sum; i++) {
                new_rest_time[i] = new_service_time[i] - time_film;
                // 计算新一轮开始时间
                if (i > 0) {
                    new_begin_time[i] = new_stop_time[i - 1];
                }
                // 计算新一轮停止时间
                if (new_rest_time[i] <= 0) {
                    new_stop_time[i] = new_begin_time[i] + time_film + new_rest_time[i];
                    // 进程结束标记
                    for (var j = 0; j < a_array.length; j++) {
                        if (mark[0][j] == new_order[i]) {
                            mark[1][j] = true;
                            f_array[j] = new_stop_time[i];
                            tmp--;
                        }
                    }
                }
                else {
                    new_stop_time[i] = new_begin_time[i] + time_film;
                    // 标记新的剩余服务时间
                    for(var j=0;j<a_array.length;j++){
                        if(rest_time[0][j] == new_order[i]){
                            rest_time[1][j] = new_rest_time[i];
                        }
                    }
                }
                var tr = $("<tr></tr>");
                tbody.append(tr);
                tr.append("<td>"+ new_order[i] +"</td>");
                tr.append("<td>"+ new_service_time[i] +"</td>");
                tr.append("<td>"+ new_begin_time[i] +"</td>");
                tr.append("<td>"+ new_stop_time[i] +"</td>");
                tr.append("<td>"+ new_rest_time[i] +"</td>");
            }
            // 记录下一轮头进程开始时间
            new_begin_time[0] = new_stop_time[sum-1];
            table.append(tbody);
        }
        hhh++;
    }
    $("div.detail").append("进程调度结束</br>以下为综合信息：");

    for(var i=0;i<b_array.length;i++){
        // 计算 周转时间=完成时间-到达时间
        t_array[i]=(f_array[i]-a_array[i]).toFixed(2);
        // 计算 带权周转时间=周转时间/服务时间
        W_array[i]=(t_array[i]/s_array[i]).toFixed(2);
    }
    // 计算平均周转时间
    var Tsum = 0;
    var Wsum = 0;
    for(var i=0;i<t_array.length;i++){
        Tsum+=parseFloat(t_array[i]);
        Wsum+=parseFloat(W_array[i]);
    }
    this.T = (Tsum/t_array.length).toFixed(2);
    this.W = (Wsum/t_array.length).toFixed(2);


}