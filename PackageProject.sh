#empty package
cp /dev/null "package.js"

#copy files to package
cat "renderBase.js" >> "package.js"
cat "HraniceNaMorave.js" >> "package.js"
cat "Prerov.js" >> "package.js"
cat "NemciceNadHanou.js" >> "package.js"
cat "Prostejov.js" >> "package.js"
cat "Olomouc.js" >> "package.js"
cat "Studenka.js" >> "package.js"
cat "Ostrava.js" >> "package.js"
cat "Credits.js" >> "package.js"
cat "escape.js" >> "package.js"

#cat "package.js" #prints out
