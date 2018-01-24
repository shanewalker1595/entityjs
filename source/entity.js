;(function () {
    var db = function () {
        this.CreateTable =  function (tableName, databaseName) {
            if (typeof databaseName === "undefined") databaseName = this.databaseName;
            if (typeof databaseName === "undefined") throw "You must provide a database name when creating a table.";
            var request = window.indexedDB.open(databaseName);
        }
        return this;
    }
    db.prototype = IDBDatabase;

    window.Entityjs = {
        CreateDb: function (databaseName, version, success, fail, upgrade) {
            var request = window.indexedDB.open(databaseName, version);
            request.onsuccess = function (e) {
                Object.setPrototypeOf(e.target.result, new db());
                success(e.target.result);
            }
            request.onerror = function (e) {
                fail(e.target.result);
            }
            request.onupgradeneeded = function (e) {
                Object.setPrototypeOf(e.target.result, x);
                e.target.result.prototype = db;
                upgrade(e.target.result);
                success(e.target.result);
            }
        }
    }
})();