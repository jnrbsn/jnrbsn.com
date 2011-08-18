---
layout: post
title: The most demographically average counties in the US
description: The most demographically average counties in the US based on 82 different demographics
  from the US Census Bureau.
categories:
  - fun
  - statistics
keywords:
  - average
  - census
  - demographic
  - map
---
This is the first in a series of posts where I will discuss various statistical analyses I've done
with data collected by the US Census Bureau. The data used for the analyses was
[downloaded](http://quickfacts.census.gov/qfd/download_data.html) from the US Census Bureau's
[State and County QuickFacts](http://quickfacts.census.gov/) site.

For awhile now I've had some ideas for interesting statistics I could calculate from Census data,
but I had never really played around with it until yesterday. The first idea I decided to pursue was
to calculate the most demographically average county in the US. In other words, the county that is,
on average, the closest to the average for each of the 82 different demographics available.

<!--more-->

First, I will explain how I calculated the results. If you don't care, you can skip this paragraph.
Basically, for each of the 82 demographics, I calculated the average and the standard deviation.
Then for each of the 3146 counties, I calculated the average of the distances from each average as a
percentage of each standard deviation (in order to normalize it). That gave me a single value for
each county that should represent the overall averageness of each county. The lower the number, the
more average the county.

Below, I've listed the top ten most demographically average counties in the US. If you're interested
in a breakdown of all of the demographics for these counties,
[click here](/resources/2010/11/census_table_average_counties.html) to see them all in one big
table. Keep in mind, when looking at this data, that this does _not_ represent the average person
nor the area in which they live. These are average _places_ based on demographics. More than 50% of
people in the US live in less than 5% of the counties in the US (none of which are even close to any
of the averages).

1. El Paso, Colorado
1. Fairfield, Ohio
1. Miami, Ohio
1. Oldham, Kentucky
1. York, South Carolina
1. Ouachita, Louisiana
1. Blair, Pennsylvania
1. Marion, Oregon
1. Wood, West Virginia
1. Sumner, Tennessee

Also, below is the first in a series of maps that go along with this series of posts. It represents
the demographical averageness of all US counties. The darker the color, the more average the county.
Click on it to enlarge.

[![Demographical averageness of US counties](http://farm5.static.flickr.com/4106/5175874442_fe977e81bf.jpg "click to enlarge")](http://farm5.static.flickr.com/4106/5175874442_8593fd147b_o.png)

That's all for now. Feel free to make suggestions in the comments for other interesting calculations
I could do with Census data.
