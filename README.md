# Facebook Chatbot, using api.ai and Node.js framework

![](https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png=100x2000)



<p></p>
<img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png" width="250" height="100" align="left">
<img src="https://blog.phusion.nl/content/images/2016/07/Heroku.png" width="250" height="100" align="left">
<img src="https://res.cloudinary.com/crunchbase-production/image/upload/v1422021886/kixmf5uejurno2j4resu.png" width="250" height="100">
<p></p>

#
# Instruction
## node.js
Initiate node.js, and install express, request, body-parser
```sh
$ npm init
$ npm install express request body-parser --save
```
## Install heroku and push to heroku
```sh
brew install heroku # isntall heroku
git init
heroku --version
heroku login
heroku create
git push heroku master
```
Then you will find this link as marked below:
![](images/heroku.png)

#
# node.js
npm init
npm install express request body-parser --save


# push to heroku
brew install heroku
git init
heroku --version
heroku login
heroku create
git push heroku master
https://powerful-everglades-28477.herokuapp.com/
heroku logs

# push to github
git init
echo "# chatbot" >> README.md
git add README.md
git commit -m "add to github"
git remote set-url origin https://github.com/helq2612/chatbot.git
git push origin master
