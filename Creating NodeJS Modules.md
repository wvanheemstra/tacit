CREATING NODEJS MODULES

See also https://quickleft.com/blog/creating-and-publishing-a-node-js-module/

Requirements:
- Have NodeJS installed on your computer (default at /usr/local/bin). See http://coolestguidesontheplanet.com/installing-node-js-osx-10-9-mavericks/
- Make sure you have the latest version and /usr/local/bin is in your $PATH. To upgrade, run: [sudo] npm install npm -g

Configure npm

Type the following:

npm set init.author.name "Willem van Heemstra"
npm set init.author.email "willem@vanheemstrasystems.com"
npm set init.author.url "http://vanheemstrasystems.com"

This next command will prompt you for an email and password, create or verify a user in the npm registry, and save the credentials to the ~/.npmrc file. If you are already added, but forgotten your password, go to https://www.npmjs.com/forgot

Type the following (as root):

npm adduser

P.S. I choose the following credentials:
Username: wvanheemstra
Password: ********
Email: (this IS public) willem@vanheemstrasystems.com

We will store the modules for tacit within the tacit repository on github, as follows:

tacit/tacit_modules/

The first module (as an example) we will call "tacit-helloworld"

Change directory to go inside tacit/tacit_modules/tacit-helloworld

Then type:

npm init

You will be prompted as follows:

This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sane defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (tacit-helloworld) tacit-helloworld
version: (1.0.0) 1.0.0
description: example of a module
entry point: (index.js) index.js
test command: grunt nodeunit
git repository: https://github.com/wvanheemstra/tacit.git
keywords: tacit example
license: (ISC) ISC

About to write to /Users/wvanheemstra/Sites/tacit.git/tacit_modules/tacit-helloworld/package.json:

{
  "name": "tacit-helloworld",
  "version": "1.0.0",
  "description": "example of a module",
  "main": "index.js",
  "scripts": {
    "test": "grunt nodeunit"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/wvanheemstra/tacit.git"
  },
  "keywords": [
    "tacit",
    "example"
  ],
  "author": "Willem van Heemstra <willem@vanheemstrasystems.com> (http://vanheemstrasystems.com)",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/wvanheemstra/tacit/issues"
  },
  "homepage": "https://github.com/wvanheemstra/tacit"
}

Is this ok? (yes) yes

Now a package.json file will have been written to /Users/wvanheemstra/Sites/tacit.git/tacit_modules/tacit-helloworld/
