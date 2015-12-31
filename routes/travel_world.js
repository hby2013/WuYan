var all_country_info = [];


function f_vehicle(f_vehicle) {
    if(f_vehicle == "shoes") {
        return 1.05;
    }else if(f_vehicle == "bicycle") {
        return 1.1;
    }else if(f_vehicle == "motor") {
        return 1.15;
    }else if(f_vehicle == "car") {
        return 1.2;
    }else {
        return 1;
    }
}

function vehicle(vehicle) {
    if(vehicle == "ballon") {
        return 0.9;
    }else if(vehicle == "train") {
        return 1.5;
    }else if(vehicle == "plane") {
        return 2;
    }else if(vehicle == "rocket") {
        return 10;
    }else {
        return 1;
    }
}

exports.get_worldmap1 = function(db) {
    return function(req, res) {
        var data = {Cname1:"",Cname2:"",Cname3:"",Ename1:"",Ename2:"",Ename3:"",step:20000,cur_country:0,f_vehicle:"nothing",vehicle:"nothing",icon:"",nickname:"",intro1:"",intro2:""};
        var world = db.get('travel_world');
        var user_info = db.get('basic');
        var country_info = db.get('country_info');
        var openid = req.body.openid;
        country_info.find({},function(err,doc){
            for(var j=0;j<doc.length;j++){
                all_country_info[doc[j].seq_id] = doc[j];
            }
            world.find({"openid":openid},function(err,docs) {
                var current_country = parseInt(docs[0].trans_step/20000);
                var new_trans_step = parseInt(docs[0].trans_step+(docs[0].now_step-docs[0].last_step)*f_vehicle(docs[0].f_vehicle)*vehicle(docs[0].vehicle));
                data.f_vehicle = docs[0].f_vehicle;
                data.vehicle = docs[0].vehicle;
                if(new_trans_step > (current_country+1)*20000) {
                    new_trans_step = parseInt((current_country+1)*20000 +(docs[0].now_step-docs[0].last_step-(((current_country+1)*20000 - docs[0].trans_step)/(vehicle(docs[0].vehicle)*f_vehicle(docs[0].f_vehicle))))*f_vehicle(docs[0].f_vehicle));
                    world.update({"openid":openid},{$set:{"vehicle":"nothing"}});
                    data.vehicle = "nothing";
                }
                var next_country = parseInt(new_trans_step/20000);
                data.Cname1 = all_country_info[current_country].Cname;
                data.Ename1 = all_country_info[current_country].Ename;
                data.intro1 = all_country_info[current_country].intro;
                data.step = (next_country + 1) * 20000 - new_trans_step;
                data.last_country = current_country;
                if(docs[0].last_step == 0)
                    data.last_country = -1;
                data.cur_country = next_country;
                if(current_country == next_country) {
                    data.Cname2 = all_country_info[current_country + 1].Cname;
                    data.Ename2 = all_country_info[current_country + 1].Ename;
                    data.intro2 = "";
                }else {
                    data.Cname2 = all_country_info[next_country].Cname;
                    data.Ename2 = all_country_info[next_country].Ename;
                    data.Cname3 = all_country_info[next_country + 1].Cname;
                    data.Ename3 = all_country_info[next_country + 1].Ename;
                    data.intro2 = all_country_info[next_country].intro;
                }
                world.update({"openid":openid},{$set:{"trans_step":new_trans_step,"last_step":docs[0].now_step}});
                user_info.find({"openid":openid},function(err,docs) {
                    data.icon = docs[0].icon;
                    data.nickname = docs[0].nickname;
                    console.log(data);
                    res.send(JSON.stringify(data));
                });
            });
        })
    }
};

exports.post_country_info = function(db){
    return function(req, res) {
        res.send(JSON.stringify(all_country_info));
    }
}