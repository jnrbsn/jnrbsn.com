#!/bin/bash
#
# This script is for testing the site locally.
#

# Make sure we're in the correct directory.
cd "$(dirname $0)/.."

# Remove the existing site.
rm -rf _site
mkdir _site

# Remove any of those pesky '.DS_Store' files.
find . -type f -name '.DS_Store' -exec rm -f {} \;

# Test the site.
jekyll --auto --future --server 8080 --url 'http://localhost:8080'
