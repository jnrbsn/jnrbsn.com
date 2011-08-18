#!/bin/bash
#
# This script is used for building and publishing the site.
#

# The YUI Compressor command to use.
YUICOMPRESSOR='java -jar /usr/local/libexec/yuicompressor-2.4.6.jar --charset utf-8 --line-break 100'

# Make sure we're in the correct directory.
cd "$(dirname $0)/.."

# Remove the existing site.
rm -rf _site
mkdir _site

# Remove any of those pesky '.DS_Store' files.
find . -type f -name '.DS_Store' -exec rm -f {} \;

# Build the site.
printf '\n\e[1;34m%s\e[0m\n\n' 'Building Jekyll site...'
jekyll --no-future $@

# Remove `<!--more-->` tags and then empty lines from HTML files.
find _site -type f -name '*.html' -exec sed -i '' 's/<!--more-->//' {} \; -exec sed -i '' '/^[ \t]*$/d' {} \;

# Remove empty lines from XML files.
find _site -type f -name '*.xml' -exec sed -i '' '/^[ \t]*$/d' {} \;

# Minify JavaScript and CSS files.
$YUICOMPRESSOR --type js -o _site/js/main.js _site/js/main.js
$YUICOMPRESSOR --type css -o _site/css/main.css _site/css/main.css

# Push the site to the server.
printf '\n\e[1;34m%s\e[0m\n\n' 'Pushing site to EC2 instance...'
rsync -rzc --progress --stats --delete _site/ ec2-v01:~/jnrbsn.com

# Publish the site.
printf '\n\e[1;34m%s\e[0m\n\n' 'Publishing site...'
ssh -t ec2-v01 'sudo ~/publi.sh'

# Done!
printf '\n\e[1;34m%s\e[0m\n\n' 'Done!'
