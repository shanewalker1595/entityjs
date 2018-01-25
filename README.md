# entityjs
A wrapper for IndexedDb that provides C# Entity Framework Style operations.

## Create a Database
```javascript
// Define a Schema
var personSchema = {
   //Schema limited for brevity, refer to Creating a Schema. 
}
// Define a database.
EntityJs.CreateDb("database1", 1, function (db) { 
   // Use the db. 
}, function (error) {
   // error occurred.
}, function (oldDb) {
   // Update the old database. 
});
```

## Select items from a table by Id.
```javascript
db.Persons.getById(1, function (person) {
    console.log(p.FirstName); // Selects the person with id 1.
});
```

## Select items from a table with filter.
```javascript
db.Persons.where(x => x.Age > 100, function (oldPeople) {
    console.log(oldPeople); // Get all people whose age > 100.
});
```

## Select items with projection.
```javascript
db.Persons.select(x => x.Age, function (ages) {
    console.log(ages) // Gets the age of all people.
})