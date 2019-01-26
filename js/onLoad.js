var page = 1;
var str;
timer();
/*var counter = 0;*/
function onLoad(str) {
    var foo = "";
    counter = 0;
    if (str === "") {
        /*alert("Please enter value in search field!");*/
        $('#query').css('border', '1px solid red');
        $('#query').attr('placeholder', 'Enter value to search');
    } else {
        $.ajax({
            url: "https://newsapi.org/v2/everything?q=" + str + "&apiKey=1e193f2dbabe48d68a350f997b41b607&pageSize=10&page=" + page,
            type: 'GET',
            success: function(data) {
                console.log(status);
                var obj = data;
                console.log(obj);
                var status = obj.status;
                console.log(obj.status);
                var articles = data.articles;
                for (var i = 0; i < articles.length; i++) {
                    var author = articles[i]['author'];
                    var title = articles[i]['title'];
                    var description = articles[i]['description'];
                    var url = articles[i]['url'];
                    var urlToImage = articles[i]['urlToImage'];
                    var publishedAt = articles[i]['publishedAt'];
                    /*var content = articles[i]['content'];*/
                    /*console.log(author);
                    console.log(title);
                    console.log(description);
                    console.log(url);
                    console.log(urlToImage);
                    console.log(publishedAt);
                    console.log(content);*/
                    foo = foo + '<div class="column">' +
                        '<div class="card animated pulse">' +
                        '<div class="two-col">' +
                        '<div class="col-img">' +
                        '<img data-src="' + urlToImage + '" class="lazyload"/>' +
                        '</div>' +
                        '<div class="col-desc">' +
                        '<div class="title">' + title +
                        '</div>' +
                        '<div class="title-author">' + author +
                        '</div>' +
                        '<div class="description">' + description +
                        '</div>' +
                        '<div class="published">' + publishedAt +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }
                $(".div-thumb").html(foo);
                page++;
            },
            error: function(data) {
                foo = foo + '<div>Please Try Again After Some Time! Good Day </div>';
                $(".div-thumb").html(foo);
            }
        });
    }
}

function timer() {
    var counter = 0;
    var interval = setInterval(function() {
        counter++;
        if (counter == 30) {
            counter = 0;
            setTimeout(onLoad($('#query').val()), setInterval(1000));
        }
        $('.refresh').html('<span>Auto refresh in ' + counter + ' seconds</span>');
    }, 1000);
}