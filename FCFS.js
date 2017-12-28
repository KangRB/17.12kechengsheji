/**
 * Created by 83579 on 2017/12/21.
 */
function FCFS(a_array,order,s_array,b_array,f_array,t_array,W_array){
    this.a_Array = a_array;
    this.Order = order;
    this.s_Array = s_array;
    this.b_Array = b_array;
    this.f_Array = f_array;
    this.t_Array = t_array;
    this.W_Array = W_array;
    // 数据初始化
    for(var i = 0;i < a_array.length;i++){
        b_array[i] = 0;
        f_array[i] = 0;
        t_array[i] = 0;
        W_array[i] = 0;
    }
    // 按照到达时间排序进程执行顺序
    var len = a_array.length, a, o, s;
    for(var i=0; i<len; i++){
        for(var j=0; j<len; j++){
            if(a_array[i] < a_array[j]){
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
    for(var i=0;i<b_array.length;i++){
        // 计算开始时间
        if(i<1){
            b_array[0] = a_array[0];
        }
        else{
            b_array[i] = s_array[i-1]+b_array[i-1];
        }
        // 计算结束时间
        f_array[i]=s_array[i]+b_array[i];
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













