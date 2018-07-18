;(function (Object, Array, String) {
    var proto = Array.prototype, sort = proto.sort, call = newCmp.call.bind(newCmp.call),
            apply = newCmp.apply.bind(newCmp.apply);

    function wrap(obj) {
        obj = Object(obj);
        var len = obj.length >>> 0;
        var A = new Array(len);
        for (var k = 0; k < len; ++k) {
            if (k in obj) {
                A[k] = [obj[k], k];
            }
        }
        return A;
    }

    function newCmp(fn) {
        // https://tc39.github.io/ecma262/#sec-sortcompare
        return fn ? function (x, y) {
            return +call(fn, undefined, x[0], y[0]) || x[1] - y[1];
        } : function (x, y) {
            var xString = String(x[0]), yString = String(y[0]);
            if (xString < yString)
                return -1;
            if (yString < xString)
                return 1;
            return x[1] - y[1];
        };
    }

    if (!function () {
        // longer than 22
        var expando = 'stable-sort-expando-' + Math.random();
        return expando.split('').sort(function () {
            return 0;
        }).join('') === expando;
    }()) {
        proto.sort = function (cmp) {
            var obj = Object(this), tmp, sorted;
            // FIXED Array.from({length:30},(x,i)=>({value:i,toString(){return 'null'}})).sort();
            if (typeof cmp === 'function' || typeof cmp === 'undefined') {
                sorted = call(sort, wrap(obj), newCmp(cmp));
                // FIXED Array.prototype.sort.call({0:1,1:0,get length(){return 2}},(x,y)=>x-y)
                // FIXED [,,,1,2,3].sort(()=>0);
                for (var i = 0, length = sorted.length; i < length; ++i) {
                    (tmp = sorted[i]) ? (obj[i] = tmp[0]) : (delete obj[i]);
                }
                return obj;
            }
            // usually a TypeError is thrown
            return apply(sort, obj, arguments);
        };
    }

})(Object, Array, String);
