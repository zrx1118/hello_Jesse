// 100块钱分配给10个人，最少6块最多12,10个人之和是100元

function fenpei() {
    var money = 100,
        num = 10,
        min = 6,
        max = 12,
        arr = [],
        sum = 0;
    for(var i = 0; i< num; i++) {
        var random = getRandom(min, max);
        sum += random;
        if (sum <= money) {
            arr.push(random);
        } else {
            arr.push(min);
        }
    }
    while(sum < 100) {
        for (var i = 0; i < num; i++) {
            if (arr[i] < max) {
                var random = getRandom(0, max - arr[i]);
                sum += random;
                if (sum <= money) {
                    arr[i] = arr[i] + random;
                } else {
                    sum -= random;
                }
            }
        }
    }
    console.log(sum);
    
    return arr
    
}
function getRandom(min, max) {
    return Math.floor(Math.random()*(max - min + 1) + min)
}
console.log(fenpei())