'use strict';

//项目路径
var urlprefix = getRootPath_webT();
var wssh = {};

//ajax请求的url(需要加http)
var ajaxUrl = 'http://{{ webssh_ip }}:{{ webssh_port }}/';
//ajax请求完接口成功之后跳转的路径(前面不用加http)
var ajaxcallbackUrl = '/{{ webssh_ip }}:{{ webssh_port }}/';

//这个变量记录登录的主机ip名称会显示在索引框上
var Hostiplogin;

//过滤器容器
var deployrighttitle = $(".deploy-right-title");
//过滤器箭头
var arrow = $("#arrow");
//装搜索容器的盒子
var righttop = $("#righttop");
//点击过滤器触发事件
deployrighttitle.click(function () {
    var arrowclass = arrow.attr("class");
    //这个为true代表是收起状态
    if (arrowclass == "downarrow") {
        arrow.removeClass("downarrow");
        arrow.addClass("uparrow");
        deployrighttitle.removeClass("titleactive");
        deployrighttitle.addClass("titledestroy");
        righttop.show();
    } else {
        righttop.hide();
        arrow.removeClass('uparrow');
        arrow.addClass("downarrow");
        deployrighttitle.removeClass("titledestroy");
        deployrighttitle.addClass("titleactive");
    }
});

//点击操作全屏按钮事件
function fullscreen(that) {
    var image = $(that).find("img");
    var imagestate = $(that).find("img").attr("data-index");

    if (imagestate == 'open') {
        image.attr("src", "./static/img/shrink.png");
        image.attr("data-index", "shrink");
    } else {
        image.attr("src", "./static/img/open.png");
        image.attr("data-index", "open");
    }
}

//动态设置左侧框的高度
function initData() {
    var deployleft = document.getElementById('searchbox');
    var top = getOffsetTop(deployleft);
    var height = window.innerHeight;
    var boxHeight = height - top - 20;
    deployleft.style.height = boxHeight + 'px';
}

//动态设置右侧框的高度
function initData2() {
    var deployleft = document.getElementById('rightbox');
    var top = getOffsetTop(deployleft);
    var height = window.innerHeight;
    var boxHeight = height - top - 20;
    deployleft.style.height = boxHeight + 'px';
}

function getOffsetTop(el) {
    var t = el.offsetTop;
    var p = el.offsetParent;
    while (p) {
        t += p.offsetTop;
        p = p.offsetParent;
    }
    return t;
}

initData();
initData2();

layui.use(['element', 'form', 'table', 'layer', 'laypage', 'upload', 'tree'], function () {
    var $ = layui.jquery,
        element = layui.element //Tab的切换功能，切换事件监听等，需要依赖element模块
        ,
        form = layui.form //全选
        ,
        table = layui.table,
        laypage = layui.laypage //分页
        ,
        upload = layui.upload,
        layer = layui.layer; //独立版的layer无需执行这一句

    var layloadindex;
    //分页
    //完整功能
    laypage.render({
        elem: 'layui-table-page2',
        count: 100,
        layout: ['count', 'prev', 'page', 'next', 'limit', 'skip'],
        jump: function jump(obj) {
        }
    });

    var configurepopup;

    //查询主机的ajax方法
    function groupselectajax(value) {
        var valobj = {
            ip: value
        };
        $.ajax({
            type: "get",
            async: true,
            url: urlprefix + '/soss-zabbix/zbx/newData/host/getHostsAndIp.do',
            data: valobj,
            success: function success(res) {

                var searchhostdiv = $("#searchhostdiv");
                searchhostdiv.empty();
                var resdata = JSON.parse(res);
                var spanstr = '';
                var resList2 = [];
                for (var i = 0; i < resdata.length; i++) {
                    var obj = {
                        description: resdata[i].description,
                        host: resdata[i].host,
                        hostid: resdata[i].hostid,
                        interfaces: resdata[i].interfaces,
                        sortip: resdata[i].interfaces[0].ip.split(".")[3]
                    };
                    resList2.push(obj);
                }

                function sortId(a, b) {
                    return a.sortip - b.sortip;
                }

                var resList3 = resList2.sort(sortId);
                for (var j = 0; j < resList3.length; j++) {
                    spanstr += '<p class="searchhostp">\n                              <img src="static/img/computer.png" class="computerimg"/>\n                               <span class="spanfonsize color_c">' + resList3[j].interfaces[0].ip + '</span>\n                                 <span class="spanfonsize color_c spanhostip">(' + resList3[j].host + ')</span>\n                            </p>';
                }
                searchhostdiv.append(spanstr);
            },
            error: function error(errorMsg) {
            }
        });
    }

    groupselectajax();

    //搜索按钮点击事件
    $("#searchbtn").click(function () {

        var inputvalue = $("#searchhost").val();

        groupselectajax(inputvalue);
    });

    //主机鼠标滑过事件
    $("#searchhostdiv").on("mouseover", "p", function (event) {
        if (event.type == "mouseover") {
            $(this).addClass("back_d");
            $(this).siblings().removeClass("back_d");
        }
    });

    //主机鼠标点击事件
    $("#searchhostdiv").on("click", "p", function (event) {
        //主机ip
        var hostIp = $(this).find("span").eq(0).text();
        //登录名
        var username = $("#username");
        //登录密码
        var userpassword = $("#userpassword");
        username.val("");
        userpassword.val("");
        configurepopup = layer.open({
            type: 1,
            title: ['登录', 'color: #fff;background: #2b2b2b;font-size:16px;'],
            offset: 'auto',
            id: 'layerDemo2' //防止重复弹出
            , content: $('#configureformPopup'),
            btn: ['登录', '取消'],
            shade: 0.3,
            area: ['500px', '380px'],
            yes: function yes(index) {
                if (!username.val()) {
                    layer.msg('用户名不能为空', {
                        icon: 2,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    });
                    return;
                }

                if (!userpassword.val()) {
                    layer.msg('密码不能为空', {
                        icon: 2,
                        time: 2000 //2秒关闭（如果不配置，默认是3秒）
                    });
                    return;
                }
                layloadindex = layer.load();
                var formData = new FormData();
                var obj = {
                    hostname: hostIp,
                    port: '22',
                    username: username.val(),
                    password: userpassword.val()
                };
                Hostiplogin = hostIp;
                formData.append("hostname", obj.hostname);
                formData.append("port", obj.port);
                formData.append("username", obj.username);
                formData.append("password", obj.password);
                $.ajax({
                    url: ajaxUrl,
                    type: 'POST',
                    data: formData,
                    success: callback,
                    cache: false,
                    contentType: false,
                    processData: false
                });
            }
        });
    });

    //索引框点击删除按钮事件
    $("#logeheadbox").on("click", "p,img", function (e) {
        //阻止事件冒泡
        e.stopPropagation();
        //IE浏览器阻止事件冒泡
        e.cancelBubble = true;

        var imagethis = $(this);

        var dataindex = imagethis.parent().attr("data-index");

        //这个div是每一个登录黑框的盒子
        var terminaldiv = $(".terminal");

        if ($(this).hasClass("closeimg")) {
            //首先判断必须点的是删除按钮才处理
            if ($(this).parent().hasClass("otherhead")) {
                //在判断删除的是选中的索引框还是非选中的索引框，非选中索引框直接删除就行了,选中删除再决定往前显示还是往后显示
                //非选中状态删除
                layer.confirm('确认关闭?', function (index) {
                    if (index) {
                        for (var i = 0; i < terminaldiv.length; i++) {
                            //删掉对应的登录黑框
                            var termindex = terminaldiv.eq(i).attr("data-index");
                            if (dataindex == termindex) {
                                terminaldiv.eq(i).remove();
                            }
                        }
                        imagethis.parent().remove();
                        layer.close(index);
                    }
                });
            } else {
                //选中状态删除
                if (imagethis.parent().prev().hasClass("logehead")) {
                    //判断删除的索引框，有没有前面的索引框，如果有，删完当前框显示前面框
                    var previndex = imagethis.parent().prev().attr("data-index");
                    layer.confirm('确认关闭?', function (index) {
                        if (index) {
                            imagethis.parent().prev().removeClass("otherhead");
                            imagethis.parent().prev().addClass("currenthead");
                            //勾的图标
                            var hookimg = imagethis.parent().prev().find("img").eq(0);
                            //叉的图标
                            var closeimg = imagethis.parent().prev().find("img").eq(1);
                            hookimg.attr("src", "static/img/currenthook.png");
                            closeimg.attr("src", "static/img/currentclose.png");
                            for (var i = 0; i < terminaldiv.length; i++) {
                                //删掉对应的登录黑框,显示前面的黑框
                                var termindex = terminaldiv.eq(i).attr("data-index");
                                if (dataindex == termindex) {
                                    terminaldiv.eq(i).remove();
                                }
                                if (previndex == termindex) {
                                    terminaldiv.eq(i).show();
                                }
                            }
                            imagethis.parent().remove();

                            layer.close(index);
                        }
                    });
                } else {
                    //没有前面索引框情况下,再判断有没有当前框有没有后面框，如果有，就显示后面框，如果没有说明当前是最后一个框，直接删除就行了

                    if (imagethis.parent().next().hasClass("logehead")) {
                        //如果有后面索引框
                        var nextindex = imagethis.parent().next().attr("data-index");

                        layer.confirm('确认关闭?', function (index) {
                            if (index) {
                                imagethis.parent().next().removeClass("otherhead");
                                imagethis.parent().next().addClass("currenthead");
                                //勾的图标
                                var hookimg = imagethis.parent().next().find("img").eq(0);
                                //叉的图标
                                var closeimg = imagethis.parent().next().find("img").eq(1);
                                hookimg.attr("src", "static/img/currenthook.png");
                                closeimg.attr("src", "static/img/currentclose.png");
                                for (var i = 0; i < terminaldiv.length; i++) {
                                    //删掉对应的登录黑框,显示前面的黑框
                                    var termindex = terminaldiv.eq(i).attr("data-index");
                                    if (dataindex == termindex) {
                                        terminaldiv.eq(i).remove();
                                    }
                                    if (nextindex == termindex) {
                                        terminaldiv.eq(i).show();
                                    }
                                }
                                imagethis.parent().remove();
                                layer.close(index);
                            }
                        });
                    } else {
                        //如果没有前面框没有后面框说明就剩最后一个当前框，直接删除掉就行了
                        layer.confirm('确认关闭?', function (index) {
                            if (index) {
                                for (var i = 0; i < terminaldiv.length; i++) {
                                    //删掉对应的登录黑框
                                    var termindex = terminaldiv.eq(i).attr("data-index");
                                    if (dataindex == termindex) {
                                        terminaldiv.eq(i).remove();
                                    }
                                }
                                imagethis.parent().remove();
                                layer.close(index);
                            }
                        });
                    }
                }
            }
        }
    });

    //索引框点击事件
    $("#logeheadbox").on("click", "p", function () {
        if ($(this).hasClass("otherhead")) {
            //判断点击的是非选中状态索引才处理
            //索引用来显示和隐藏对应的登录黑框
            var dataindex = $(this).attr("data-index");
            //这个div是每一个登录黑框的盒子
            var terminaldiv = $(".terminal");

            for (var i = 0; i < terminaldiv.length; i++) {
                var termindex = terminaldiv.eq(i).attr("data-index");
                if (dataindex == termindex) {
                    terminaldiv.eq(i).show();
                } else {
                    terminaldiv.eq(i).hide();
                }
            }

            //当前点击的变为选中状态
            $(this).removeClass("otherhead");
            $(this).addClass("currenthead");
            //让其他非选中的兄弟节点变为非选中状态
            $(this).siblings().removeClass("currenthead");
            $(this).siblings().addClass("otherhead");
            //将非选中的索引框的勾和叉置为非选中状态的图标
            var sibpimgs = $(this).siblings().find("img");
            for (var _i = 0; _i < sibpimgs.length; _i++) {
                if (sibpimgs.eq(_i).hasClass("hookimg")) {
                    sibpimgs.eq(_i).attr("src", "static/img/otherhook.png");
                }
                if (sibpimgs.eq(_i).hasClass("closeimg")) {
                    sibpimgs.eq(_i).attr("src", "static/img/otherclose.png");
                }
            }

            //勾的图标
            var hookimg = $(this).find("img").eq(0);
            //叉的图标
            var closeimg = $(this).find("img").eq(1);
            hookimg.attr("src", "static/img/currenthook.png");
            closeimg.attr("src", "static/img/currentclose.png");
        }
    });

    var status = $('#status'),
        btn = $('.btn-primary'),
        style = {};

    function parse_xterm_style() {
        var text = $('.xterm-helpers style').text();
        var arr = text.split('xterm-normal-char{width:');
        style.width = parseFloat(arr[1]);
        arr = text.split('div{height:');
        style.height = parseFloat(arr[1]);
    }

    function current_geometry() {
        if (!style.width || !style.height) {
            parse_xterm_style();
        }

        var cols = parseInt(window.innerWidth / style.width, 10) - 1;

        var rows = parseInt(window.innerHeight / style.height, 10);

        return {'cols': cols, 'rows': rows};
    }

    function resize_term(term, sock) {
        var boxheight = $("#rightbox").height();
        var boxwidth = Math.floor($("#rightbox").width());
        var geometry = current_geometry();
        var cols = Math.floor(boxwidth / 8.4);
        var rows = Math.floor(boxheight / 16);
        if (cols !== term.geometry[0] || rows !== term.geometry[1]) {
            term.resize(cols, rows);
            sock.send(JSON.stringify({'resize': [cols, rows]}));
        }
    }

    function callback(msg) {
        if (msg.status) {
            layer.close(layloadindex);
            layer.msg(msg.status, {
                icon: 2,
                time: 2000 //2秒关闭（如果不配置，默认是3秒）
            });

            return;
        }
        var ws_url = window.location.href.replace('http', 'ws');

        var join = ws_url[ws_url.length - 1] === '/' ? '' : '/';

        var url = 'ws:' + ajaxcallbackUrl + 'ws?id=' + msg.id;

        var sock = new window.WebSocket(url);

        var encoding = msg.encoding;

        var terminal = document.getElementById('#terminal');

        layer.close(layloadindex);
        layer.close(configurepopup);
        var term = new window.Terminal({
            cursorBlink: true
        });

        wssh.sock = sock;
        wssh.term = term;

        term.on('data', function (data) {
            sock.send(JSON.stringify({'data': data}));
        });

        sock.onopen = function () {
            $('.container').hide();
            term.open(terminal, true);
            term.toggleFullscreen(true);
            //这个div是每一个登录黑框的盒子
            var terminaldiv = $(".terminal");

            var ss2 = document.getElementById('rightbox');
            var top2 = getOffsetTop(ss2);
            terminaldiv.css("top", top2 + 'px');

            var searchboxdiv = document.getElementById('searchbox');
            var searchboxtop = getOffsetTop(searchboxdiv);
            var searchboxwidth = searchboxdiv.offsetWidth;
            var searchdivs = $(".searchdiv");
            searchdivs.css("top", searchboxtop + 'px');
            searchdivs.css("width", searchboxwidth + 'px');

            //登录框索引框盒子
            var logeheadbox = $("#logeheadbox");
            //所有的索引框
            var loginheadp = logeheadbox.find("p");
            if (loginheadp.length > 0) {
                //判断里面有没有索引框，有则之前所有框盒子都置为没有选中状态
                for (var i = 0; i < loginheadp.length; i++) {
                    if (loginheadp.eq(i).hasClass("currenthead")) {
                        //将之前有这个选中状态索引框置为非选中状态
                        loginheadp.eq(i).removeClass("currenthead");
                        loginheadp.eq(i).addClass("otherhead");
                        //勾的图标
                        var hookimg = loginheadp.eq(i).find("img").eq(0);
                        //叉的图标
                        var closeimg = loginheadp.eq(i).find("img").eq(1);
                        hookimg.attr("src", "static/img/otherhook.png");
                        closeimg.attr("src", "static/img/otherclose.png");
                    }
                }
            }
            //给每一个登录黑框打上一个索引，方便查找和删除
            for (var j = 0; j < terminaldiv.length; j++) {
                if (j == terminaldiv.length - 1) {
                    terminaldiv.eq(j).show();
                } else {
                    terminaldiv.eq(j).hide();
                }
                terminaldiv.eq(j).attr("data-index", j);
            }

            var addloginp = '<p class="logehead currenthead" data-index="' + (terminaldiv.length - 1) + '">\n                             <img class="hookimg" src="static/img/currenthook.png"/>\n                              <span class="spanfonsize ">' + Hostiplogin + '</span>  \n                               <img src="static/img/currentclose.png" class="closeimg"/></p>';
            logeheadbox.prepend(addloginp);
        };

        sock.onmessage = function (msg) {
            var reader = new window.FileReader();
            reader.onloadend = function () {
                var decoder = new window.TextDecoder(encoding);
                var text = decoder.decode(reader.result);
                term.write(text);
                if (!term.resized) {
                    resize_term(term, sock);
                    // term.resized = true;
                }
            };

            reader.readAsArrayBuffer(msg.data);
        };

        sock.onerror = function (e) {
            console.log(e);
        };

        sock.onclose = function (e) {
            var termindex = term.element.getAttribute("data-index");
            var logeheadbox = $("#logeheadbox");
            var loginP = logeheadbox.find("p");
            //登出黑框之后，将对应的索引框也删除掉
            for (var i = 0; i < loginP.length; i++) {
                if (loginP.eq(i).attr("data-index") == termindex) {
                    loginP.eq(i).remove();
                    term.destroy();
                    wssh.term = undefined;
                    wssh.sock = undefined;
                    $('.container').show();
                    status.text(e.reason);
                }
            }

            //判断登出之后，还有其他的索引框，将第一个置为选中状态，对应的黑框也显示出现
            if (logeheadbox.find("p").length > 0) {
                var terminaldiv = $(".terminal");
                var firstp = logeheadbox.find("p").eq(0);
                firstp.removeClass("otherhead");
                firstp.addClass("currenthead");
                //勾的图标
                var hookimg = firstp.find("img").eq(0);
                //叉的图标
                var closeimg = firstp.find("img").eq(1);
                hookimg.attr("src", "static/img/currenthook.png");
                closeimg.attr("src", "static/img/currentclose.png");
                hookimg.attr("src", "static/img/currenthook.png");
                closeimg.attr("src", "static/img/currentclose.png");
                var firstpindex = firstp.attr("data-index");
                for (var _i2 = 0; _i2 < terminaldiv.length; _i2++) {
                    var terminaldivindex = terminaldiv.eq(_i2).attr("data-index");
                    if (terminaldivindex == firstpindex) {
                        terminaldiv.eq(_i2).show();
                    }
                }
            }
        };
    }
});
