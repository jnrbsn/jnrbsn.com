---
layout: post
title: Redmine 0.9.3, Ubuntu 9.10, Lighttpd 1.4.x, MySQL 5.1.x
description: A simple, step-by-step guide for installing Redmine 0.9.3 (a cool project management
  webapp) on Ubuntu 9.10 using Lighttpd 1.4.x as your webserver and MySQL 5.1.x for your database.
categories:
  - how-tos
  - lighttpd
  - linux
  - mysql
keywords:
  - how to
  - install
  - mod_fastcgi
  - mod_rewrite
  - mysql 5.1
  - rails
  - redmine
  - repository
  - ruby
  - ruby on rails
  - scm
  - ubuntu
  - ubuntu 9.10
---
"Redmine is a flexible project management web application written using Ruby on Rails framework."
See [Redmine.org](http://www.redmine.org/) for more information about Redmine.

When I was installing Redmine on Ubuntu, it took me a little bit to get it right, mainly because all
of the guides I could find we're either old or didn't really match my environment close enough to be
helpful. So this post is to document what I ended up doing. This guide explains how to install
Redmine 0.9.3 (latest version as of this post) on Ubuntu 9.10 with the Lighttpd web server (version
1.4.x) and the MySQL database server (version 5.1.x).

<!--more-->

> **Note:** Pretty much all of these commands need to be run as **root**.

First, install the packages you'll need with the following command. Choose "Y" when it asks if you
want to install the dependencies.

    apt-get install lighttpd mysql-server ruby rake librmagick-ruby libmysql-ruby \
        rubygems libfcgi-ruby1.8 libopenssl-ruby1.8 ruby1.8-dev libmysqlclient-dev

Next, install Rails and the MySQL C bindings for Ruby:

    gem install rails -v=2.3.5 --no-rdoc --no-ri
    gem install mysql --no-rdoc --no-ri

> **Note:** If you're installing a version of Redmine other than 0.9.3, you should
> probably check out **[this page](http://www.redmine.org/wiki/redmine/RedmineInstall
> "Redmine Install Wiki")** to make sure you're installing the correct version of
> Rails. Also, as of this writing, the Redmine wiki says "the Ruby MySQL gem
> currently does not support MySQL 5.1." That is no longer true so don't worry about
> it.

Next, download the Redmine source code, extract it, and put it in place, respectively:

    wget http://rubyforge.org/frs/download.php/69449/redmine-0.9.3.tar.gz
    tar -xzf redmine-0.9.3.tar.gz
    mv redmine-0.9.3 /var/www/redmine

Now you need to create the MySQL database that Redmine will use to store everything and the MySQL
user that will be connecting to it. You can run the SQL queries below to set it up. Just replace all
of the **example_xyz** values with the appropriate values.

    CREATE DATABASE `example_dbname` CHARACTER SET utf8;
    CREATE USER 'example_user'@'localhost' IDENTIFIED BY 'example_password';
    GRANT ALL PRIVILEGES ON `example_dbname`.* TO 'example_user'@'localhost';

Now create Redmine's database config file by copying the example:

    cd /var/www/redmine/
    cp config/database.yml.example config/database.yml

Then edit the "production" section of the **config/database.yml** file to match the info for the
database you just created. Like this:

    production:
      adapter: mysql
      database: example_dbname
      host: localhost
      username: example_user
      password: example_password
      encoding: utf8

Now run these three commands to generate a session secret, create the database structure, and insert
the default configuration data into the database, respectively.

    rake config/initializers/session_store.rb RAILS_ENV="production"
    rake db:migrate RAILS_ENV="production"
    rake redmine:load_default_data RAILS_ENV="production"

Now you're almost done. You just need to configure Lighttpd. But before we do that, we can test the
Redmine installation by running the following command and then going to http://ipaddress:3000/ in
your web browser.

    ruby script/server webrick -e production

To configure Lighttpd, first create Redmine's FastCGI dispatch file, then set the correct ownership
on the Redmine code:

    cp public/dispatch.fcgi.example public/dispatch.fcgi
    chown -R www-data:www-data /var/www/redmine/

Finally, edit your **/etc/lighttpd/lighttpd.conf** file. Make sure that at least **mod_fastcgi** and
**mod_rewrite** are listed in the **server.modules** section. If they're not there, add them. Then
insert the following at the end of the file (be sure to replace example.org with the appropriate
domain):

    $HTTP["host"] =~ "^example\.org$" {
        server.document-root = "/var/www/redmine/public"
        server.errorlog = "/var/log/lighttpd/redmine_error.log"
        accesslog.filename = "/var/log/lighttpd/redmine_access.log"
        server.indexfiles = ("dispatch.fcgi")
        server.error-handler-404 = "/dispatch.fcgi"
        url.rewrite-once = (
            "^/(.*\..+(?!html))$" => "$0",
            "^/(.*)\.(.*)" => "$0",
        )
        fastcgi.server = (
            ".fcgi" => (
                "redmine" => (
                    "bin-path" => "/usr/bin/ruby /var/www/redmine/public/dispatch.fcgi",
                    "socket" => "/tmp/redmine.socket",
                    "min-procs" => 1,
                    "max-procs" => 4,
                    "idle-timeout" => 120,
                    "check-local" => "disable",
                    "bin-environment" => (
                        "RAILS_ENV" => "production",
                    ),
                ),
            ),
        )
    }

Restart Lighttpd and you're done.

    /etc/init.d/lighttpd restart

Enjoy your cool new project management app!
