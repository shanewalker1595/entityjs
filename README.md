# entityjs
A wrapper for IndexedDb that provides C# Entity Framework Style operations.

## Create a Database
```javascript
// Define a Schema
var personSchema = {
   //Schema limited for brevity, refer to Creating a Schema. 
}
// Define a database.
var db = EntityJs.CreateDb("database1", 1, function (db) { 
   // Use the db. 
}, function (error) {
   // error occurred.
}, function (oldDb) {
   // Update the old database. 
});
```
