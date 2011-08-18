---
layout: post
title: Defragment Firefox&#39;s SQLite databases
description: Defragment all of the SQLite databases in your Firefox profile (used for cache,
  history, etc.) with (almost) one command.
categories:
  - linux
  - mac
  - tips
keywords:
  - bash
  - browser
  - database
  - defragment
  - faster
  - firefox
  - mac os x
  - optimize
  - script
  - slow
  - sqlite
---
**UPDATE:** In case you were wondering, this guide is **NOT** for Windows.

Firefox uses SQLite databases to store a lot of your browsing data. Unfortunately, these databases
can get very fragmented over time and slow things to a screeching halt and Firefox does nothing to
prevent/fix this. This post will explain how to defragment those databases yourself. It's really
easy!

<!--more-->

First, you'll want to make sure you have sqlite3 installed. If you're using a Mac, it's already
installed. If your using Linux, you can install the **sqlite3** package using disto's package
manager.

Next, open your Terminal application and go to the directory where Firefox stores your profiles. If
you're using a Mac, type this then hit enter:

    cd ~/Library/Application\ Support/Firefox/Profiles

If you're using Linux, type this instead then hit enter:

    cd ~/.mozilla/firefox

Okay, now make sure Firefox is **NOT** running, and copy and paste the following command into your
terminal and hit enter (this is all one big command):

    find . -name '*.sqlite' -exec echo -n 'Optimizing {}... ' \; \
        -exec sqlite3 {} 'VACUUM' \; \
        -exec echo 'Done.' \;

That's it. You're done. Close your terminal and relaunch Firefox. Depending on how slow it was
before, you might notice the difference right away.
