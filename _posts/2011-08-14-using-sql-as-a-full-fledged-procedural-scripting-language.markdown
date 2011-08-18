---
layout: post
title: Using SQL as a full-fledged, procedural scripting language
description: Discussion of SQL as a full-fledged, procedural scripting language with functions,
  variables, loops, conditionals, and even error handling (and much more).
categories:
  - automation
  - mysql
keywords:
  - char set
  - character set
  - collation
  - convert
  - cursor
  - gist
  - handler
  - innodb
  - myisam
  - prepared statements
  - procedures
  - routine
  - script
  - sql
  - utf8
---
My goal lately has been to write about projects as I'm working on them. That way, as long as I've got a project on which I'm working, I'll have something about which to write. A few days ago, I became an "Oracle Certified Professional, MySQL 5 Developer" (a mouthful, I know). So today I'll be writing about MySQL and some of the lesser known capabilities of the SQL language itself. Specifically, this post will demonstrate, as its title suggests, that SQL can be used as a full-fledged, procedural scripting language with functions, variables, loops, conditionals, and even error handling (and much more). I've written two scripts that automate two procedures about which I'm frequently asked: The first script converts all of the [MyISAM](http://dev.mysql.com/doc/refman/5.1/en/myisam-storage-engine.html) tables in a database to [InnoDB](http://dev.mysql.com/doc/refman/5.1/en/innodb-storage-engine.html). The second finds all tables in a database that have columns whose [collation](http://dev.mysql.com/doc/refman/5.1/en/charset-general.html) is **not** `utf8_general_ci` and converts them to that collation. The scripts are embedded and explained below.

<!--more-->

You can **download** the scripts in this post from [gist.github.com/1144336](http://gist.github.com/1144336).

### How to run the scripts

If you don't care about how the scripts work and just want to know how to run them, then read no further (well, maybe a few more lines). You can run the scripts in this post with a shell command like this:

    mysql -N example_database < convert_innodb.sql

The above command will convert all MyISAM tables in the database named `example_database` to InnoDB. The other script can be run the same way. Just change the name of the script in the command above. The purpose of the `-N` command-line option is to suppress the display of column headings when printing the result of a statement. This is necessary because the script uses `SELECT` statements to output short status messages while running.

### convert_innodb.sql

As explained above, the first script converts all of the MyISAM tables in a database to InnoDB. Here's the script:

{% gist 1144336 convert_innodb.sql %}

### Explanation of convert_innodb.sql

The first thing the script does is drop any [procedures](http://dev.mysql.com/doc/refman/5.1/en/stored-programs-defining.html) that already exist named `convert_innodb`. Then the [delimiter](http://dev.mysql.com/doc/refman/5.1/en/mysql-commands.html#id515511) is set to `//`. This is necessary if we plan to run the script using the [MySQL Command-Line Tool](http://dev.mysql.com/doc/refman/5.1/en/mysql.html), which uses a semicolon as its default delimiter. Since semicolons are used inside the procedure, it is necessary to specify a different delimiter.

Next, the actual procedure that will do all the work is created. Inside the `convert_innodb` procedure, the `var_table` variable is declared that will store the name of each table as we iterate over them. A [cursor](http://dev.mysql.com/doc/refman/5.1/en/cursors.html) named `cur` is also declared that will be used to retrieve and iterate over the list of tables to convert. That list of tables is retrieved by querying the `tables` table in the `information_schema` database. Notice the use of the `DATABASE()` function to retrieve the name of the default database.

After a simple status message is printed using a `SELECT` statement, the cursor is "opened" executing the query, and making it ready for iteration. The loop is enclosed within a `BEGIN...END` [compound statement](http://dev.mysql.com/doc/refman/5.1/en/begin-end.html) block with an [exit handler](http://dev.mysql.com/doc/refman/5.1/en/declare-handler.html) declared at the beginning. This is how it will know when to leave the loop. The exit handler declaration basically says "When you encounter [SQLSTATE 02000](http://dev.mysql.com/doc/refman/5.1/en/error-messages-server.html#error_er_sp_fetch_no_data) (a.k.a. `NOT FOUND`), do nothing and then exit the current block." The "do nothing" part is the empty `BEGIN END` statement in the handler declaration.

On each loop iteration, the next row is fetched from the cursor and saved to the `var_table` variable. This is the name of the table to convert. Then a status message is printed saying "Converting table name\_of\_table". The `ALTER TABLE` query that will do the actual conversion is then constructed and saved to the user variable `@var_sql`. The query is then prepared, executed, and deallocated as a [prepared statement](http://dev.mysql.com/doc/refman/5.1/en/sql-syntax-prepared-statements.html). This is necessary because the SQL is dynamically generated at run-time.

When the loop is done, the cursor is closed, a "Completed successfully!" status message is printed, and the procedure is done. After the procedure is created, the delimiter is set back to its default (a semicolon), the newly created `convert_innodb` procedure is called, and then the procedure is dropped because we don't need it anymore. And then the script is done.

### convert_utf8.sql

The second script finds all of the tables in a database that have columns whose collation is **not** `utf8_general_ci` and converts them to that collation. Here's the script:

{% gist 1144336 convert_utf8.sql %}

### Explanation of convert_utf8.sql

This script is incredibly similar to the InnoDB conversion script so I will only focus on the differences between them here. First, the query that retrieves the list of tables is different. It queries the `columns` table in the `information_schema` database to find all of the columns in a database whose collation is not null (i.e. columns to which collation does not apply) and is not `utf8_general_ci` and returns a list of distinct table names for those columns. Another difference is that before the loop begins, the default collation of the database itself is changed, and then [foreign key](http://dev.mysql.com/doc/refman/5.1/en/innodb-foreign-key-constraints.html) checks are disabled. A foreign key constraint might be temporarily violated during the conversion because of the inability to convert all of the constrained columns simultaneously. The only other differences are the `ALTER TABLE` query in the loop that does the actual conversion and also the re-enabling of foreign key checks at the end of the procedure.
