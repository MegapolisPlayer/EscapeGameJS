echo "Packaging into package.js"

#empty package
cp /dev/null "package.js"

#copy files to package

#base files
cat "renderBase.js" >> "package.js"
cat "money.js" >> "package.js"
cat "dialogue.js" >> "package.js"
cat "translation.js" >> "package.js"

#gui files
cat "soundmgr.js" >> "package.js"
cat "settings.js" >> "package.js"
cat "credits.js" >> "package.js"

#location files
cat "HraniceNaMorave.js" >> "package.js"
cat "Prerov.js" >> "package.js"
cat "NemciceNadHanou.js" >> "package.js"
cat "Prostejov.js" >> "package.js"
cat "Olomouc.js" >> "package.js"
cat "Studenka.js" >> "package.js"
cat "Ostrava.js" >> "package.js"

#other
cat "pause.js" >> "package.js"

#main file
cat "escape.js" >> "package.js"

#add maybe some stuff

echo "Done!"
