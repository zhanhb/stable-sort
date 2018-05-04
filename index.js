;(function () {
    var proto = Array.prototype, sort = proto.sort, map = proto.map, splice = proto.splice,
        concat = proto.concat;
    proto.sort = function (compareFunction) {
        let self = this;
        if (typeof compareFunction !== 'function') {
            return sort.apply(self, arguments);
        }
        self = map.call(self, (item, index) => [item, index]);
        splice.call(this, concat.call([0, self.length], map.call(sort.call(self, (a, b) => compareFunction(a[0], b[0]) || a[1] - b[1]), x => x[0])));
        return this;
    }
})();
