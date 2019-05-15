// 冒泡
var pao = function(arr) {
    for(var i = 0; i < arr.length; i++){
        for(var j = i+1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                var temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
            }
        }
    }
        
    console.log(arr);
    return arr;
}
// 选择
var select = function(arr) {
    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < arr.length - i + 1; j++) {
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
            }
        }
    }
        
    console.log(arr);
    return arr;
}

var arr = [33, 332, 55, 22, 13, 45, 3];
select(arr);
pao(arr);

// 快排
// var quickSort = function(arr) {
//     function swap(arr, i, k) {
//         var temp = arr[i];
//         arr[i] = arr[k];
//         arr[k] = temp;
//     }

//     function calcation(arr, left, right) {
//         var storeIndex = left,
//             pivot = arr[right];
//         for(var i = left; i < right; i++){
//             if(arr[i] < pivot) {
//                 swap(arr, i, storeIndex)
//                 storeIndex++;
//             }
//         }
//         swap(arr, storeIndex, right)
//         return storeIndex
//     }

//     function sort(arr, left, right) {
//         if (left > right) {
//             return
//         }
//         var storeIndex = calcation(arr, left, right)
//         sort(arr, left, storeIndex - 1);
//         sort(arr, storeIndex+1, right)
//     }
//     sort(arr, 0, arr.length - 1)
//     console.log(arr);
    
//     return arr
// }
function quickSort(arr) {
    function swap(arr, i, k) {
        var temp = arr[i];
        arr[i] = arr[k];
        arr[k] = temp;
    }
    function banner(arr, left, right) {
        var pviot = arr[right],
            storeIndex = left;
        for (var i = left; i < right; i++) {
            if (arr[i] > pviot) {
                swap(arr, i, storeIndex);
                storeIndex++;
            }
        }
        swap(arr, storeIndex, right);
        return storeIndex;
    }
    function sort(arr, left, right) {
        if (left > right) return
        var storeIndex = banner(arr, left, right)
        sort(arr, left, storeIndex - 1);
        sort(arr, storeIndex + 1, right);
    }
    sort(arr, 0, arr.length - 1);
    console.log(arr);
    
    return arr
}
quickSort(arr)