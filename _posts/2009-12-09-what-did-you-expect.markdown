---
layout: post
title: What did you expect?
description: An example of using an expect script for automated SCP/SSH password authentication.
categories:
  - automation
  - linux
  - tips
keywords:
  - expect
  - password
  - scp
  - script
  - secure
  - ssh
  - tcl
  - unix
---
So I needed an automated way of **scp**-ing a file to a bunch of different linux machines. The
problem was that each machine could be using any one of three different passwords and/or an SSH key
and it may or may not be in the **~/.ssh/known_hosts** file on the local machine. So there are eight
possible combinations of circumstances. Sounds like an **[expect](http://expect.nist.gov/)**
nightmare, doesn't it? Seriously, I had a nightmare about this.

<!--more-->

Anyway, below is the code that finally did the job. Enjoy.

    #!/usr/bin/expect

    set REMOTE_HOST [lindex $argv 0]
    set REMOTE_USER "username"
    set REMOTE_PASSWORD_1 "firstpassword"
    set REMOTE_PASSWORD_2 "secondpassword"
    set REMOTE_PASSWORD_3 "thirdpassword"
    set LOCAL_PATH "/path/to/local/file"
    set REMOTE_PATH "/path/to/remote/destination"

    spawn scp $LOCAL_PATH $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH
    expect {
        "*yes/no*" {
            send "yes\n"
            expect {
                "*assword:*" {
                    send "$REMOTE_PASSWORD_1\n"
                    expect {
                        "*assword:*" {
                            send "$REMOTE_PASSWORD_2\n"
                            expect {
                                "*assword:*" {
                                    send "$REMOTE_PASSWORD_3\n"
                                    exp_continue
                                }
                                eof
                            }
                        }
                        eof
                    }
                }
                eof
            }
        }
        "*assword:*" {
            send "$REMOTE_PASSWORD_1\n"
            expect {
                "*assword:*" {
                    send "$REMOTE_PASSWORD_2\n"
                    expect {
                        "*assword:*" {
                            send "$REMOTE_PASSWORD_3\n"
                            exp_continue
                        }
                        eof
                    }
                }
                eof
            }
        }
        eof
    }
