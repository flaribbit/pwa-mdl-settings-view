const http=require("http");
const requests=require("requests");
const server=http.createServer();
const URL="http://api.douban.com/v2/movie/in_theaters?city=%E5%B9%BF%E5%B7%9E&start=0&count=10&apikey=0b2bdeda43b5688921839c8ecb20399b"
server.on("request",function(req,res){
    res.writeHead(200,{
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });
    try{
        http.get(URL,function(r){
            r.on("data",function(data){
                res.write(data);
            })
            r.on("end",function(){
                res.end()
            })
        })
    }catch(error){
        res.end()
    }
})
server.listen(80, function() {
    console.log("server start 80");
});