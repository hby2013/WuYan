//var list=[{username:"王老板",steps:12000,icon:"img/head (0).jpg"},
  ////        {username:"aaa",steps:10500,icon:"img/head (1).jpg"},
   //       {username:"bbb",steps:9020,icon:"img/head (7).jpg"},
   //       {username:"ddd",steps:7500,icon:"img/head (3).jpg"},
   //       {username:"eee",steps:5000,icon:"img/head (4).jpg"}];
var list =  !{JSON.stringify(hotels)};
var window_width = document.all ? document.getElementsByTagusername("html")[0].offsetHeight : window.innerWidth;
var single_list;
var number;
var rank_front;
var head;
var info;
var username;
var steps;
var amount_dividing;
var challenge;

for(var i = 0; i < list.length; i++) {
    single_list = document.createElement("div");
    number = document.createElement("div");
    head = document.createElement("img");
    info = document.createElement("div");
    username = document.createElement("div");
    steps = document.createElement("div");
    amount_dividing = document.createElement("hr");
    challenge = document.createElement("img");
    single_list.setAttribute("class","single_list");
    number.setAttribute("class","number");
    number.innerText = i + 1;
    head.setAttribute("class","head");
    head.src = list[i].icon;
    info.setAttribute("class","info");
    username.setAttribute("class","username");
    username.innerText = list[i].username;
    steps.setAttribute("class","steps");
    steps.innerText = list[i].steps;
    amount_dividing.setAttribute("class","amount_dividing");
    amount_dividing.style.width = (list[i].steps / list[0].steps) * window_width * 0.5 + "px";
    challenge.setAttribute("class","challenge");
    challenge.src = "img/1.png";
    challenge.value = i;
    document.body.appendChild(single_list);
    single_list.appendChild(number);
    single_list.appendChild(head);
    single_list.appendChild(info);
    single_list.appendChild(challenge);
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