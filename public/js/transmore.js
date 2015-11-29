(function(){
function load_script(xyUrl, callback){
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = xyUrl;
    //�����jQuery��script���򷽷�
    script.onload = script.onreadystatechange = function(){
        if((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")){
            callback && callback();
            // Handle memory leak in IE
            script.onload = script.onreadystatechange = null;
            if ( head && script.parentNode ) {
                head.removeChild( script );
            }
        }
    };
    // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
    head.insertBefore( script, head.firstChild );
}
function transMore(points,type,callback){
    for(var index in points){
        if(index > 50){return;}
        var xyUrl = "http://api.map.baidu.com/ag/coord/convert?from=" + type + 
        "&to=4&x=" + points[index].lng + //����Ҫѭ����������points��lng���ݣ�ֱ��points.length��ϡ�
        "&y=" + points[index].lat + 
        "&callback=callback";
        //��̬����script��ǩ
        load_script(xyUrl);
    }
}

window.BMap = window.BMap || {};
BMap.Convertor = {};
BMap.Convertor.transMore = transMore;
})();