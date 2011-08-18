---
layout: post
title: Reclaim space from unused Git repository objects
description: An easy way to reclaim disk space in your Git repositories after removing history.
categories:
  - git
  - tips
keywords:
  - git gc
  - git reflog
  - git reset
  - how to
  - programming
  - scm
  - space
---
Sometimes, if you remove something large from a Git repository, it will leave a bunch of data in the
`.git` directory. A good example is if you run a `git reset` command to reset the repository back to
a previous commit and you don't care about the data from all the commits after the commit to which
you reset. You can remove the unused objects in your repository by the running the two commands
below.

    git reflog expire --all --expire=now
    git gc --prune=now

Be careful, though, because you can't undo it!
