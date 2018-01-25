;(function () {
    var db = function () {
        
    },
    table = function () {

    };
    db.prototype.createTable = function (tableName) {

    };
    db.prototype.deleteTable = function (tableName) {

    };
    table.prototype.getById = function (id) {

    };
    table.prototype.select = function (selectorFn) {
        
    };
    table.prototype.removeById = function (id) {

    };
    table.prototype.remove = function (entity) {

    };
    table.prototype.update = function (entity) {

    };
    table.prototype.where = function (whereFn) {
        
    }

    // Creates an EntityJs db from and IIndexedDb object.
    function _createDb(indexDb) {
        var newDb = new db();
        newDb.originalDb = indexDb;
        return newDb;
    }

    window.EntityJs = {
        CreateDb: function (databaseName, version, success, fail, update) {
            var request = window.indexedDB.open(databaseName, version);
            request.onsuccess = function (e) {
                success(_createDb(request.result));
            }
            request.onerror = function (e) {
                fail(e);
            }
            request.onupgradeneeded = function (e) {
                var db = _createDb(request.result);
                upgrade(db);
                success(db);
            }
        }
    }
})();