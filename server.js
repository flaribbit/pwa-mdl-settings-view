const url=require("url");
const http=require("http");
const request=require("request")
const server=http.createServer();
const URL="http://api.douban.com/v2/movie/in_theaters?city=%E5%B9%BF%E5%B7%9E&start=0&count=20&apikey=0b2bdeda43b5688921839c8ecb20399b"
server.on("request",function(req,res){
    params=url.parse(req.url)
    if(params.path!="/"){
        res.writeHead(404);
        res.end();
        return;
    }
    res.writeHead(200,{
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    });
    request({
        url: URL
    },(error,response,body)=>{
        if (!error&&response.statusCode==200) {
            let data=[];
            let json=JSON.parse(body)
            for(item of json["subjects"]){
                let directors=[];
                for(director of item["directors"]){
                    directors.push(director["name"])
                }
                data.push({
                    image: item["images"]["small"],
                    title: item["title"],
                    rating: item["rating"]["average"],
                    year: item["year"],
                    actors: directors.join(",")
                })
            }
            //console.log(JSON.stringify(data))
            res.write(JSON.stringify(data))
            res.end()
        }
    })
})
server.listen(process.env.PORT||3000, function() {
    console.log("server start");
});