var tools = require("./routes/tools");

var my_menu = {
 "button":[
 {  
      "name":"步数",
      "sub_button":[
                    {"type":"click","name":"当日","key":"WALK_TODAY"},
                    {"type":"click","name":"本周","key":"WALK_WEEK"}
                    ]
  },
  {
       "type":"click",
      "name":"睡眠",
      "key":"SLEEP"
   },
   {
      "name":"其它",
      "sub_button":[
                    {"type":"click","name":"排行榜","key":"RANKING"},
                    {"type":"click","name":"成就系统","key":"ACHIEVEMENTS"}
                    ]
   }]
}
tools.menuCreate(my_menu, function(err, result){

});