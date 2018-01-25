;(function () {
    var db = function () {
    },
    table = function () {

    };
    db.prototype.createTable = function (tableName, schema, drop) {
        if (drop) {
            this.originalDb.deleteObjectStore(tableName);
        }
        var store = this.originalDb.createObjectStore(tableName);
        for (var prop in schema) {
            store.createIndex(prop, prop, schema[prop]);
        }
        return _createEntityTable.call(this, store);
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
    // Creates an EntityJs table from an IIndexedDbObjectStore object.
    function _createEntityTable(objectStore) {
        var newTable = new table();
        this[objectStore.name] = newTable;
        newTable.originalStore = objectStore;
    }

    window.EntityJs = {
        CreateDb: function (databaseName, version, success, fail, upgrade) {
            var request = window.indexedDB.open(databaseName, version),
                upgraded = false,
                newDb;
            request.onsuccess = function (e) {
                upgraded ? success(newDb) : success(_createDb(request.result));
            }
            request.onerror = function (e) {
                fail(e);
            }
            request.onupgradeneeded = function (e) {
                upgraded = true;
                newDb = _createDb(request.result);
                upgrade(newDb);
            }
        }
    }
})();