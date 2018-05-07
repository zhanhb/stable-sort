// https://tc39.github.io/ecma262/#sec-sortcompare
;(function (Array) {
    var proto = Array.prototype, sort = proto.sort, map = proto.map;

    function wrap(item, index) {
        return [item, index];
    }

    function newCmp(fn) {
        return function (a, b) {
            return +fn(a[0], b[0]) || a[1] - b[1];
        };
    }

    if (!function () {
            var expando = +new Date() + '';
            return expando.split('').sort(function () {
                return 0;
            }).join('') === expando;
        }()) {
        proto.sort = function (cmp) {
            var obj = Object(this), tmp, sorted;
            if (typeof cmp === 'function') {
                sorted = sort.call(map.call(obj, wrap), newCmp(cmp));
                // FIXED Array.prototype.sort.call({0:1,1:0,get length(){return 2}},(x,y)=>x-y)
                // FIXED [,,,1,2,3].sort(()=>0);
                for (var i = 0, length = sorted.length; i < length; ++i) {
                    (tmp = sorted[i]) ? (obj[i] = tmp[0]) : (delete obj[i]);
                }
                return obj;
            }
            // TODO not implements when compareFunction is undefined
            return sort.apply(obj, arguments);
        };
    }

})(Array);
