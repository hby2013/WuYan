//var list=[{username:"王老板",steps:12000,icon:"img/head (0).jpg"},
  ////        {username:"aaa",steps:10500,icon:"img/head (1).jpg"},
   //       {username:"bbb",steps:9020,icon:"img/head (7).jpg"},
   //       {username:"ddd",steps:7500,icon:"img/head (3).jpg"},
   //       {username:"eee",steps:5000,icon:"img/head (4).jpg"}];

window.onload = function () {
    var thisURL = document.URL; 
    var getval =thisURL.split('?')[1];
    var openid = getval.split("=")[1];
    $.ajax({
        type:'post',
        url:"/ranking",
        data:{"openid":openid},
        dataType:"json",
        success:function(data){
            if(data){
                show_list(data);
            } else{
                alert("返回值为空");
            }
        }
    });
};

function show_list(data){
    var len = data.list.length;
    $("#map_entry").attr("href", "/map.html?myid="+data.myid);
    for(var i=0; i < len;i++){
        single_list = document.createElement("div");
        number = document.createElement("div");
        head = document.createElement("img");
        info = document.createElement("div");
        username = document.createElement("div");
        steps = document.createElement("div");
        amount_dividing = document.createElement("hr");
        //challenge = document.createElement("img");
        single_list.setAttribute("class","single_list");
        number.setAttribute("class","number");
        number.innerText = i + 1;
        head.setAttribute("class","head");
        head.src = data.list[i].icon;
        info.setAttribute("class","info");
        username.setAttribute("class","username");
        username.innerText = data.list[i].nickname;
        steps.setAttribute("class","steps");
        steps.innerText = data.list[i].similarity+"%";
        amount_dividing.setAttribute("class","amount_dividing");
        amount_dividing.setAttribute("value",data.list[i].similarity);
        amount_dividing.style.width = (data.list[i].steps / data.list[0].steps) * window_width * 0.5 + "px";
        //challenge.setAttribute("class","challenge");
        //challenge.src = "img/1.png";
        //challenge.value = i;
        document.body.appendChild(single_list);
        single_list.appendChild(number);
        single_list.appendChild(head);
        single_list.appendChild(info);
        //single_list.appendChild(challenge);
        info.appendChild(username);
        info.appendChild(steps);
        info.appendChild(amount_dividing);
        if(i < 3) {
            rank_front = document.createElement("img");
            rank_front.setAttribute("class", "rank_front");
            rank_front.src = "img/number"+(i+1)+".png";
            number.innerText="";
            number.appendChild(rank_front);
        }
    }
    var longest_dividing = document.createElement("div");
    longest_dividing.setAttribute("id","longest_dividing");
    if(data.list.length>0)
        $("#longest_dividing").val(data.list[0].similarity);
    document.body.appendChild(longest_dividing);
    var map_entry = document.createElement("a");
    map_entry.setAttribute("href","/invitation.html?myid="+data.myid);
    document.body.appendChild(map_entry);
    var input = document.createElement("input");
    input.setAttribute("type","button");
    input.setAttribute("value","进入邀请");
    input.style.float = "right";
    map_entry.appendChild(input);
    var rank_front;
    var number;
    var window_width = document.all ? document.getElementsByTagusername("html")[0].offsetHeight : window.innerWidth;
    $(".number").each(function(){
        if(parseInt($(this).text()) <= 3){
            rank_front = $("<img src = '/img/number"+ (parseInt($(this).text()))+".png' class = 'rank_front'/>");
            $(this).empty();
            rank_front.appendTo($(this));
        }
    });
    $(".amount_dividing").each(function(){
        $(this).css("width", parseInt($(this).attr("value"))/parseInt($("#longest_dividing").attr("value")) * window_width * 0.5 + "px");
    });
}
