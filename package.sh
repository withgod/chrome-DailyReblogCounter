#!/bin/sh

mkdir -p ./build 2> /dev/null

v=`grep version ./src/manifest.json | awk -F':' '{print $2}' | sed 's/[ ",]//g'`
target="daily_reblog_counter-$v"

crxmake --pack-extension="src" \
	--extension-output="./build/$target.crx" \
	--pack-extension-key="../withgod.pem" \
	--verbose

