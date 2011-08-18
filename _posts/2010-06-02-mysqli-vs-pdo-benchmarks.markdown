---
layout: post
title: MySQLi vs. PDO Benchmarks
description: A few simple benchmarks comparing the speed of the PDO and MySQLi extensions for PHP.
categories:
  - mysql
  - php
  - statistics
keywords:
  - benchmark
  - database
  - faster
  - mysql 5.1
  - mysqli
  - mysqlnd
  - pdo
  - performance
  - prepared statements
  - programming
  - slow
---
I've seen a lot of people claim that MySQLi is faster than PDO and that PDO is not worth the
performance hit. Unfortunately, I haven't really seen any benchmarks to back that up. So that is
what I've done here.

All of the tests were done using PHP 5.3.1 (64-bit) with the [MySQL Native
Driver](http://dev.mysql.com/downloads/connector/php-mysqlnd/) for MySQLi and PDO and MySQL 5.1.42
(64-bit) on a 2.66GHz Intel Core 2 Duo with 4GB of RAM and a 7200rpm hard drive. Each test was run
100 times. The results are the average number of milliseconds the test took plus or minus the
standard deviation as a percentage of the average. Shorter bars means faster.

Each test consisted of making a connection by calling the class's constructor
(`MySQLi::__construct()` for `MySQLi and PDO::__construct()` for PDO), running the queries, and then
closing the connection by calling `MySQLi::close()` for MySQLi and setting the object to null for
PDO. The times include making the connection and closing it.

These tests were very simple, but that was the point. I wanted a simple comparison that represented
basic usage.

<!--more-->

### Test #1: Create a table and insert 1000 rows

Functions used:

* `MySQLi::query()`
* `PDO::exec()`

![insert_regular](/resources/2010/06/mysqli-vs-pdo-benchmarks/insert_regular.png)

### Test #2: Create a table and insert 1000 rows with prepared statements

Functions used:

* `MySQLi::prepare()`, `MySQLi_STMT::bind_param()`, and a series of calls to
`MySQLi_STMT::execute()`
* `PDO::prepare()` and a series of calls to `PDOStatement::execute()`

With the "PDO (emulated)" test, prepared statements were emulated by setting the
`PDO::ATTR_EMULATE_PREPARES` attribute to `true` using `PDO::setAttribute()`.

![insert_prepared](/resources/2010/06/mysqli-vs-pdo-benchmarks/insert_prepared.png)

### Test #3: 100 selects using a "LIKE" string comparison

Functions used:

* `MySQLi::query()`, `MySQLi_Result::fetch_array()`, and `MySQLi_Result::free()`
* `PDO::query()` and `PDOStatement::fetch()`

![select_regular](/resources/2010/06/mysqli-vs-pdo-benchmarks/select_regular.png)

### Test #4: 100 selects using a "LIKE" string comparison with prepared statements

Functions used:

* `MySQLi::prepare()`, `MySQLi_STMT::bind_param()`, and a series of calls to
`MySQLi_STMT::execute()`, `MySQLi_STMT::bind_result()`, `MySQLi_STMT::fetch()`, and
`MySQLi_STMT::free_result()`
* `PDO::prepare()` and a series of calls to `PDOStatement::execute()` and `PDOStatement::fetch()`

With the "PDO (emulated)" test, prepared statements were emulated by setting the
`PDO::ATTR_EMULATE_PREPARES` attribute to `true` using `PDO::setAttribute()`.

![select_prepared](/resources/2010/06/mysqli-vs-pdo-benchmarks/select_prepared.png)

### Conclusion

For inserts, there was no significant difference between MySQLi and PDO (prepared statements or
not). For selects, MySQLi was about 2.5% faster for non-prepared statements and about 6.7% faster
for prepared statements. Even though PDO is considered an abstraction library, there's is very
little overhead as you can see. After all, the PDO MySQL driver driver uses the same client library
as MySQLi. In my opinion, the features and flexibility of PDO far outweigh the very slight
performance hit. What do you think?
