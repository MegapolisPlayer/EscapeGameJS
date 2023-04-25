#empty package
cp /dev/null "package.js"

#copy files to package
cat "renderBase.js" >> "package.js"
cat "escape.js" >> "package.js"

#cat "package.js" #prints out
