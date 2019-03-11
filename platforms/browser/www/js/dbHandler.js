var db_name = "Comp_1661";
var db_version = "1.0";
var db_describe = "Comp 1661 Web SQL Database";
var db_size = 1 * (1024 * 1024);

var databaseHandler = {
    db: null,
    createDatabase: function() {
        this.db = window.openDatabase(db_name, db_version, db_describe, db_size);
        this.db.transaction(
            function(tx) {
                //Run sql here using tx
                tx.executeSql(
                    "create table if not exists storage(_id integer primary key, storage_type text, dimension real, adding_datetime numeric, storage_feature text, price real, reporter text, notes text)",
                    [],
                    function(tx, results) {},
                    function(tx, error) {
                        console.log("Error while creating the table: " + error.message);
                    },
                );
            },
            function(error) {
                console.log("Transaction error: " + error.message);
            },
            function() {
                console.log("Create DB transaction completed successfully");
            },
        );
    },
};
