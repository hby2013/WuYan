var item_list = [
{name:"attention",price:50},
{name:"near_user",price:200},
{name:"shoes",price:160},
{name:"bicycle",price:300},
{name:"motor",price:400},
{name:"car",price:500},
{name:"ballon",price:10},
{name:"train",price:200},
{name:"plane",price:350},
{name:"rocket",price:500}]

function refresh_list(json_data) {
    if(json_data.attention == 100) {
        document.getElementById("attention").style.opacity = "0.5";
        document.getElementById("attention").onclick = function(){};
    }
    if(json_data.near_user == 1) {
        document.getElementById("near_user").style.opacity = "0.5";
        document.getElementById("near_user").onclick = function(){};
    }
    if(json_data.f_vehicle != "nothing") {
        document.getElementById("shoes").style.opacity = "0.5";
        document.getElementById("shoes").onclick = function(){};
        if(json_data.f_vehicle != "shoes") {
            document.getElementById("bicycle").style.opacity = "0.5";
            document.getElementById("bicycle").onclick = function(){};
            if(json_data.f_vehicle != "bicycle") {
                document.getElementById("motor").style.opacity = "0.5";
                document.getElementById("motor").onclick = function(){};
                if(json_data.f_vehicle != "motor") {
                    document.getElementById("car").style.opacity = "0.5";
                    document.getElementById("car").onclick = function(){};
                }
            }
        }
    }
    if(json_data.vehicle != "nothing") {
        document.getElementById("ballon").style.opacity = "0.5";
        document.getElementById("ballon").onclick = function(){};
        if(json_data.vehicle != "ballon") {
            document.getElementById("train").style.opacity = "0.5";
            document.getElementById("train").onclick = function(){};
            if(json_data.vehicle != "train") {
                document.getElementById("plane").style.opacity = "0.5";
                document.getElementById("plane").onclick = function(){};
                if(json_data.vehicle != "plane") {
                    document.getElementById("rocket").style.opacity = "0.5";
                    document.getElementById("rocket").onclick = function(){};
                }
            }
        }
    }
    if(json_data.coins < 500) {
        document.getElementById("rocket").style.opacity = "0.5";
        document.getElementById("rocket").onclick = function(){};
        document.getElementById("car").style.opacity = "0.5";
        document.getElementById("car").onclick = function(){};
        if(json_data.coins < 400) {
            document.getElementById("motor").style.opacity = "0.5";
            document.getElementById("motor").onclick = function(){};
            if(json_data.coins < 350) {
                document.getElementById("plane").style.opacity = "0.5";
                document.getElementById("plane").onclick = function(){};
                if(json_data.coins < 300) {
                    document.getElementById("bicycle").style.opacity = "0.5";
                    document.getElementById("bicycle").onclick = function(){};
                    if(json_data.coins < 200) {
                        document.getElementById("train").style.opacity = "0.5";
                        document.getElementById("train").onclick = function(){};
                        document.getElementById("near_user").style.opacity = "0.5";
                        document.getElementById("near_user").onclick = function(){};
                        if(json_data.coins < 160) {
                            document.getElementById("shoes").style.opacity = "0.5";
                            document.getElementById("shoes").onclick = function(){};
                            if(json_data.coins < 50) {
                                document.getElementById("attention").style.opacity = "0.5";
                                document.getElementById("attention").onclick = function(){};
                                if(json_data.coins < 10) {
                                    document.getElementById("ballon").style.opacity = "0.5";
                                    document.getElementById("ballon").onclick = function(){};
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function buy_item(a) {
    if(a.alt > parseInt(document.getElementById("coins_num").innerText)) {
        alert("ÄãÃ»ÓÐ×ã¹»µÄÇ®");
        return;
    }
    var thisURL = document.URL; 
    var getval =thisURL.split('?')[1];
    var openid = getval.split("=")[1];
    $.ajax({
        type:'post',
        url:"/buy_item",
        data:{"openid":openid,"cost":a.alt,"item":a.id},
        dataType:"json",
        success:
            function(json_data) {
                refresh_list(json_data);
                document.getElementById("coins_num").innerText = json_data.coins;
            }
    });
}