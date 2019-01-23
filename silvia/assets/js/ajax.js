function doRequest(type, url, isAsyn, resData, callback) {
    var xhr = createXhr();
    if (type.toLowerCase() === 'get') {
        url += '?';
        for (var n in resData) {
            url += n + "=" + resData[n] + '&';
        }
        url.substr(0, url.length - 1);
        resData = null;
    } else {
        resData = encodeURIComponent(JSON.stringify(resData));
    }
    xhr.onreadystatechange = function () {
        if (xhr.status >= 200 && xhr.status > 300 || xhr.status == 304) {
            if (xhr.readyState === 4) {
                var data = JSON.parse(decodeURIComponent(xhr.responseText));
                callback && callback(data);
            }
        }
    }
    xhr.open(type, url, isAsyn);
    xhr.send(resData);
}

function createXhr () {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    } else {
        var tags = ['MSXML.XMLHttp 6.0', 'MSXML.XMLHttp 3.0', 'MSXML.XMLHttp', 'Microsoft.XMLHTTP'];
        for (var n in tags) {
            try{
                return new ActiveXObject(tags[n]);
            } catch (err) {
                console.log(err);
            }
        }
    }
}