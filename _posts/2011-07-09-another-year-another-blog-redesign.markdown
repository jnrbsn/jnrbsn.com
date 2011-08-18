---
layout: post
title: Another year, another blog redesign
description: How and why I switched from WordPress to Jekyll and from Slicehost to Amazon EC2.
categories:
  - blogging
keywords:
  - amazon
  - aws
  - ec2
  - git
  - github
  - jekyll
  - lighttpd
  - markdown
  - slicehost
  - wordpress
---
Hello and welcome to [jnrbsn.com](http://jnrbsn.com/), formerly
[jonathanrobson.me](http://jonathanrobson.me/). Exactly a year ago today, I wrote about my [blogging
platform indecision](/2010/07/my-blogging-platform-indecision-plus-a-new-theme), and unfortunately,
the indecision continues. You're looking at my new website/blog.

The first change that affects you, the reader, the most is the new design. It was built using clean
standards-compliant HTML5 markup to create an extremely minimalistic and content-focused design. My
goal with the new design (as well as other changes described below) was to minimize distractions and
overhead and maximize simplicity and accessibility.

The second change you probably noticed is the new domain, [jnrbsn.com](http://jnrbsn.com/). I wanted
something shorter and more consistent with my online social identity. Everything from the old domain
should automatically redirect to the correct place at the new domain. Also, my RSS feed is now
located at <http://feeds.feedburner.com/jnrbsn> (the old address will remain working as well).

### From WordPress to Jekyll

Another, slightly less noticeable, but important, change is that I switched from
[WordPress](http://wordpress.org/), the uber-popular personal publishing platform powered by PHP and
MySQL, to [Jekyll](http://jekyllrb.com/), a "simple, blog aware, static site generator" written by
[Tom Preston-Werner](http://tom.preston-werner.com/) of [GitHub](http://github.com/). Here's the
description from [Jekyll's README file](https://github.com/mojombo/jekyll/#readme):

> Jekyll is a simple, blog aware, static site generator. It takes a template directory (representing
> the raw form of a website), runs it through Textile or Markdown and Liquid converters, and spits
> out a complete, static website suitable for serving with Apache or your favorite web server. This
> is also the engine behind [GitHub Pages](http://pages.github.com/), which you can use to host your
> project’s page or blog right here from GitHub.

So why did I switch? In short, for simplicity. I love WordPress. I think it's one of the most
well-written PHP apps out there, but I barely used a fraction of its many features, and I always
felt that it was kind of pointless to have a dynamic, database-driven website that mainly serves
static content. So I found Jekyll. It gives me more control and more simplicity at the same time. It
allowed me to get rid of a lot of overhead and focus on the content that people actually see. No
more messing with PHP and MySQL and trying to tune them (in fact, the EC2 instance that hosts this
site is running a minimal [Lighttpd](http://www.lighttpd.net/) web server and almost nothing else).
No more constant WordPress security updates (and worrying about exploits). Also, the static pages
allow me to make my site super-fast. It makes me a little nostalgic about the internet with which I
grew up...

> "Jekyll is a well-architected throwback to a time before WordPress, when men were men, and HTML
> was static..." — [Mike West](http://mikewest.org/)

Migrating was easy too. Jekyll even has an automated WordPress migration tool. Although, I didn't
use that feature since it wasn't hard for me to migrate manually, because I didn't have very many
posts and I was already using [Markdown](http://daringfireball.net/projects/markdown/) formatting.
And now, with Jekyll, I can store my entire site (including content) in a [Git](http://git-scm.com/)
repository for better, more consistent revision control for my code and my content. I'll be typing
up another post in the near future describing my process and open sourcing my code so stay tuned for
that.

### From Slicehost to Amazon EC2

Lastly, I switched hosting providers as well. I've been using [Slicehost](http://www.slicehost.com/)
for a few years, and for the most part, I've had hardly any problems. My biggest issue with
Slicehost is their lack of an SLA, and unfortunately, I've been faced with the downside of that a
couple times.

Firstly, I've experienced unreasonable amounts of downtime for which I received no notifications and
was not reimbursed at all. So basically, you could have an entire day of downtime and never be
notified about it and still have to pay your normal monthly bill.

The other really bad experience I've had with them was actually at work. The company for which I
work was using Slicehost for an external monitoring server. One day, out of the blue, the people at
Slicehost noticed what they thought was an unusual amount of outbound traffic (this was from the
monitoring server, of course). First of all, any experienced system/network admin should have been
able to figure out exactly what the traffic was from with a little investigation, but that's another
story. The real problem is that they assumed the VPS had been compromised and immediately shut it
down and changed the root password without asking us. The only notification we got was one email
that was sent after the fact. I shouldn't need to explain why that was a problem.

So I switched to [Amazon EC2](http://aws.amazon.com/ec2/). First of all, they guarantee 99.95%
uptime and reimburse you when it drops below that. Also, it ends up being less expensive than
Slicehost for my usage (with Amazon, you pay only for what you use rather than a fixed monthly
cost). There's also a ton of other benefits like better security and scalability and the ability to
create and destroy as many VMs as I want without having to change my hosting plan. In short, Amazon
gives me more peace of mind and flexibility.
