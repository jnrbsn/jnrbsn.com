---
layout: post
title: How to setup gitweb with lighttpd on Ubuntu
description: A simple, step-by-step guide for setting up Gitweb on Ubuntu using lighttpd as your
  webserver.
categories:
  - git
  - how-tos
  - lighttpd
  - linux
keywords:
  - gitweb
  - how to
  - install
  - mod_alias
  - mod_cgi
  - perl
  - repository
  - scm
  - ubuntu
---
[Gitweb](http://git.or.cz/gitwiki/Gitweb) is a web interface for browsing a
[git](http://git-scm.com/) repository (or a set of git repositories) using your web browser. This
post will explain how to set it up on [Ubuntu](http://www.ubuntu.com/) and
[lighttpd](http://www.lighttpd.net/).

<!--more-->

I'm assuming:

* you have git and lighttpd installed
* you know how to use git
* you have some git repositories that you want to put on gitweb

First, install gitweb from the Ubuntu repositories:

    sudo apt-get install gitweb

After it installs, open the file **/etc/gitweb.conf** with your favorite text editor, find the line
that defines the **$projectroot** variable, and change it to use the path of the directory with all
of your git repositories in it. For example, if all of your git repositories are in
**/home/git/projects**, edit the line to say

    $projectroot = "/home/git/projects";

Now edit **/etc/lighttpd/lighttpd.conf**. If you don't already have them enabled, you'll need to add
**mod_alias** and **mod_cgi** to the **server.modules** list.

    server.modules += (
        "mod_alias",
        "mod_cgi"
    )

Next, you'll want to make a section that looks something like this:

    $HTTP["host"] =~ "^git.example.com$" {
        cgi.assign = (
            ".cgi" => "/usr/bin/perl"
        )
        alias.url += (
            "/gitweb.css"      => "/usr/share/gitweb/gitweb.css",
            "/git-logo.png"    => "/usr/share/gitweb/git-logo.png",
            "/git-favicon.png" => "/usr/share/gitweb/git-favicon.png",
            "/"                => "/usr/lib/cgi-bin/gitweb.cgi"
        )
    }

This assumes you want gitweb to be available at **http://git.example.com/**. You'll obviously want
to change the hostname to the domain your using. If you want to use a sub-directory like
**http://git.example.com/gitweb/**, just change the last alias to say **"/gitweb/"** instead of
**"/"**.

Gitweb should now be setup at the URL with which you configured it, but you'll probably notice that
the "description" field and the "owner" field in your project list is not what you'd expect. To fix
this, add a description to the **/.git/description** file in each repository, and add something like
this to the **/.git/config** in each repository:

    [gitweb]
        owner = "Your Name"

You can also, optionally, create an **indextext.html** file and put it in **/usr/lib/cgi-bin/** (or
somewhere else if you make an alias for it in your lighttpd.conf). That file will contain the HTML
content displayed on the main page above the project list.

That's it.
