$(document).ready(function() {

    // 清空 product-list
    $('#product-list').empty();
    $('#page').hide()

    var items = null
    var pageCount = 21
    var showItems = (page) => {
        if (items == null) return
        var start = (page - 1) * pageCount
        var end = start + pageCount - 1
        $('#product-list').empty();
        for (var i = start; i <= end; i++) {
            newItem(items[i])
        }
    }

    var newItem = (item) => {
        $img = $('<img>').attr('class', 'image').attr('src', item.image)
        $h3 = $('<h3>').attr('class', 'name').text(item.name)
        $p = $('<p>').attr('class', 'price').text('NT$ ' + item.price)

        $item = $('<div>').attr('class', 'item').append($img).append($h3).append($p)
        $col = $('<div>').attr('class', 'col-md-4').append($item)

        $('#product-list').append($col)
    }

    var newPage = (n) => {
        var pageNum = n / 20
        pageNum = (n % 20 != 0) ? pageNum + 1 : pageNum

        $('#page-number').empty()

        $la = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').attr('aria-disabled', 'true').text('«')
        $lli = $('<li>').attr('class', 'page-item').addClass('disabled').append($la)

        $('#page-number').append($lli)

        // 插入分頁數字
        for (var i = 1; i <= pageNum; i++) {
            var strActive = ((i == 1) ? ' active' : '')
            $a = $('<a>').attr('class', 'page-link'+strActive).attr('href', '#').text(i)

            $a.on('click', function() {
                var i = $(this).text()
                showItems(Number(i))
            })

            //var strActive = ((i == 1) ? ' active' : '')
            //$li = $('<li>').attr('class', 'page-item' + strActive).append($a)
            $li = $('<li>').attr('class', 'page-item').append($a)
            $('#page-number').append($li)
            
        }
        $ra = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').attr('aria-disabled', 'true').text('»')
        $rli = $('<li>').attr('class', 'page-item').addClass('disabled').append($ra)
        $('#page-number').append($rli)
    }

    $('#query').on('click', function(){
        $.get('https://js.kchen.club/B05505023/query', function(response) {
            if (response) {
                // 伺服器有回傳資料
                if (response.result) {
                    $('#product-list').empty();
                    // 資料庫有回傳資料
                    items = response.items

                    // for (var i = 0; i < items.length; i++) {
                    //     newItem(items[i])
                    // }

                    // 加了分頁效果，預設顯示第一頁
                    showItems(1)

                    // 顯示分頁和設定分頁的函式
                    $('#page').show()
                    newPage(items.length)

                } else {
                    $('#message').text('查無相關資料')
                    $('#dialog').modal('show')
                }
            } else {
                $('#message').text('伺服器出錯')
                $('#dialog').modal('show')
            }

            console.log(response)
        }, "json")
    })

        $(document).on("click",".pagination li a",function(){
            var str =$(this).html();
            if(!isNaN(str)){
                //移除之前的active
                $(".pagination li a").removeClass("active");
                $(this).attr("class","page-link active");
                
            }
        })

        
        $('#query').on('click', function(){
            $.get('https://js.kchen.club/B05505023/query', function(response) {
                if (response) {
                    // 伺服器有回傳資料
                    if (response.result) {
                        $('#product-list').empty();
                        // 資料庫有回傳資料
                        items = response.items
    
                        // for (var i = 0; i < items.length; i++) {
                        //     newItem(items[i])
                        // }
    
                        // 加了分頁效果，預設顯示第一頁
                        showItems(1)
    
                        // 顯示分頁和設定分頁的函式
                        $('#page').show()
                        newPage(items.length)
    
                    } else {
                        $('#message').text('查無相關資料')
                        $('#dialog').modal('show')
                    }
                } else {
                    $('#message').text('伺服器出錯')
                    $('#dialog').modal('show')
                }
    
                console.log(response)
            }, "json")
        })
        $('#add').on('click', function() {
            

            var modal = document.getElementById('myModal');

            // Get the button that opens the modal
            var btn = document.getElementById("add");
            
            // Get the <span> element that closes the modal
            var span = document.getElementsByClassName("close")[0];
            
            // When the user clicks the button, open the modal 

                modal.style.display = "block";
           
            
            // When the user clicks on <span> (x), close the modal
            span.onclick = function() {
                modal.style.display = "none";
            }

            console.log(price);
        })
        $('#finish').on('click', function() {
            var name = document.getElementById("Name").value 
            var price = document.getElementById( "Price" ).value
            var count = document.getElementById( "Count" ).value
            var image =document.getElementById("Image").value
            console.log(price);
            new_data = {
                item: {
                    "name": name,
                    "price": price,
                    "count": count,
                    "image": image
                }
            };
            newItem(new_data);
            $.post('https://js.kchen.club/B05505023/insert', new_data, function(response) {
                if (response) {
                    if (response.result) {
                        var item = response.items
                            //newItem(item);
                    }
                }
                console.log(response);
            }, "json")


        })
        $('#add_auto').on('click', function() {
            new_data = {
                item: {
                    "name": "dog",
                    "price": 123,
                    "count": 2,
                    "image": "https://simon0987.github.io/hw2/image/test.png"
                }
            };
            newItem(new_data);
            $.post('https://js.kchen.club/B05505023/insert', new_data, function(response) {
                if (response) {
                    if (response.result) {
                        var item = response.items
                            //newItem(item);
                    }
                }
                console.log(response);
            }, "json")




        })

        $("#gotop").click(function(){
            jQuery("html,body").animate({
                scrollTop:0
            },1000);
        });
        $(window).scroll(function() {
            if ( $(this).scrollTop() > 300){
                $('#gotop').fadeIn("fast");
            } else {
                $('#gotop').stop().fadeOut("fast");
            }
        });
        $('.carousel').carousel({
            interval: 2000
          });
 
    
})

