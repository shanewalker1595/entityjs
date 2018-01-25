; (function () {
    var Database = function () {
    },
        Table = function (tableName, database) {
            this.name = tableName;
            this.database = database;
        };
    Database.prototype.createTable = function (tableName, schema, drop) {
        if (drop) {
            try {
                this.deleteTable(tableName);
            } catch (e) {

            }
        }
        var store = this.originalDb.createObjectStore(tableName, schema.Key);
        for (var prop in schema) {
            if (prop != "Key") {
                store.createIndex(prop, prop, schema[prop]);
            }
        }
        return _createEntityTable.call(this, store);
    };
    Database.prototype.deleteTable = function (tableName) {
        this.originalDb.deleteObjectStore(tableName);
    };

    // --------------- Create
    Table.prototype.add = function (entity, callback) {
        var request = this.database.originalDb.transaction(this.name, "readwrite").objectStore(this.name).add(entity);
        request.onsuccess = function (evt) {
            callback(evt.target.result);
        }
    }
    // -------------- Read
    Table.prototype.getById = function (id, callback) {
        var request = this.database.originalDb.transaction(this.name, "readwrite").objectStore(this.name).get(id);
        request.onsuccess = function (evt) {
            callback(evt.target.result);
        }
    };
    Table.prototype.select = function (selectorFn, callback) {
        var request = this.database.originalDb.transaction(this.name, "readwrite").objectStore(this.name).getAll();
        request.onsuccess = function (evt) {
            var allItems = evt.target.result;
            var selectedItems = [];
            for (var i = 0; i < allItems.length; i++) {
                selectedItems.push(selectorFn.call(this, allItems[i]));
            }
            callback(selectedItems);
        }
    };
    Table.prototype.where = function (whereFn, callback) {
        var request = this.database.originalDb.transaction(this.name, "readwrite").objectStore(this.name).getAll();
        request.onsuccess = function (evt) {
            var allItems = evt.target.result;
            var selectedItems = [];
            for (var i = 0; i < allItems.length; i++) {
                if (whereFn.call(this, allItems[i]) === true) {
                    selectedItems.push(allItems[i]);
                }
            }
            callback(selectedItems);
        }
    }
    // -------------- Update
    Table.prototype.update = function (entity, callback) {
        var request = this.database.originalDb.transaction(this.name, "readwrite").objectStore(this.name).put(entity);
        if (typeof callback === "function") {
            request.onsuccess = function (evt) {
                callback(evt.target.result);
            }
        }
    };
    // -------------- Delete
    Table.prototype.removeById = function (id) {
        var request = this.database.originalDb.transaction(this.name, "readwrite").objectStore(this.name).delete(id);
        request.onsuccess = function (evt) {
            callback(evt.target.result);
        }
    };
    Table.prototype.remove = function (entity) {
        this.removeById(entity.Id);
    };


    // Creates an EntityJs Database from and IIndexedDb object.
    function _createDb(indexDb) {
        var newDb = new Database();
        newDb.originalDb = indexDb;
        for (var i = 0; i < newDb.originalDb.objectStoreNames.length; i++) {
            var tblName = newDb.originalDb.objectStoreNames[i],
                objectStore = indexDb.transaction(tblName, "readonly").objectStore(tblName);
            newDb[tblName] = _createEntityTable(objectStore, newDb);
        }
        return newDb;
    }
    // Creates an EntityJs Table from an IIndexedDbObjectStore object.
    function _createEntityTable(objectStore, database) {
        var newTable = new Table(objectStore.name, database);
        this[objectStore.name] = newTable;
        return newTable;
    }

    window.EntityJs = {
        CreateDb: function (databaseName, version, success, fail, upgrade, drop) {
            if (drop) {
                window.indexedDB.deleteDatabase(databaseName);
            }
            var request = window.indexedDB.open(databaseName, version);
            request.onsuccess = function (e) {
                success(_createDb(e.target.result));
            }
            request.onerror = function (e) {
                fail(e);
            }
            request.onupgradeneeded = function (e) {
                db = new Database();
                db.originalDb = e.target.result
                upgrade(db);
            }
        }
    }
})();