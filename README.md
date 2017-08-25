# chatbot

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

heroku logs

# push to github
git init
echo "# chatbot" >> README.md
git add README.md
git commit -m "add to github"
git remote set-url origin https://github.com/helq2612/chatbot.git
git push origin master
