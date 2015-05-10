CREATING NODEJS MODULES

See also https://quickleft.com/blog/creating-and-publishing-a-node-js-module/

Requirements:
- Have NodeJS installed on your computer (default at /usr/local/bin). See http://coolestguidesontheplanet.com/installing-node-js-osx-10-9-mavericks/
- Make sure you have the latest version and /usr/local/bin is in your $PATH. To upgrade, run: [sudo] npm install npm -g

========= Creating a NPM Account ==========

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

========= Creating a Package File ==========

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
version: (1.0.0) 0.1.0
description: example of a module
entry point: (index.js) index.js
test command: make test
git repository: https://github.com/wvanheemstra/tacit-helloworld.git
keywords: tacit example
license: (ISC) MIT

About to write to /Users/wvanheemstra/Sites/tacit-helloworld/package.json:

{
  "name": "tacit-helloworld",
  "version": "0.1.0",
  "description": "example of a module",
  "main": "index.js",
  "scripts": {
    "test": "make test"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/wvanheemstra/tacit-helloworld.git"
  },
  "keywords": [
    "tacit",
    "example"
  ],
  "author": "Willem van Heemstra <willem@vanheemstrasystems.com> (http://vanheemstrasystems.com)",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/wvanheemstra/tacit-helloworld/issues"
  },
  "homepage": "https://github.com/wvanheemstra/tacit-helloworld"
}

Is this ok? (yes) yes

Now a package.json file will have been written to /Users/wvanheemstra/Sites/tacit.git/tacit_modules/tacit-helloworld/

========= Creating a Module ==========

Now we can actually get on to the business of writing code. Create an index.js file to hold the primary module code. It’ll look something like the following.

Content of index.js:

/**
 * Escape special characters in the given string of html.
 *
 * @param  {String} html
 * @return {String}
 */
module.exports = {
  escape: function(html) {
    return String(html)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  },

  /**
   * Unescape special characters in the given string of html.
   *
   * @param  {String} html
   * @return {String}
   */
  unescape: function(html) {
    return String(html)
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }
};

Note the use of module.exports, which we discussed previously, and is needed to make code available for use by other modules.
Further, as our module is not reliant on any other modules, we did not need to require anything.

Next, we’ll surely want to write some tests. Perhaps it would have been preferable to write them first. Regardless, I prefer to use the Mocha and Chai frameworks, but you can use whatever you like. These can be installed and persisted to the package.json file with the following commands.
Note that they are added to the ‘devDependencies’ section, as they are only required during development and not at runtime.

Type the following whilst still inside the tacit-helloworld directory where the package.json file resides:

npm install mocha --save-dev
npm install chai --save-dev

The above commands will also create a node_modules folder in your project directory containing those dependencies. Following best practices, we’ll want to keep the node_modules folder out of the git repository.
We can do that by adding a .gitignore file to our project root, with the following contents.

node_modules

========= Creating a Test ==========

Continuing on, let’s create a test directory to hold our tests. As our primary module file is called index.js, within the test directory I will create a file by the same name – a simple convention. Mocha will by default run all tests in this directory. Our test should look something like the following.

Content of tacit/tacit_modules/tacit-helloworld/test/index.js:

var should = require('chai').should(),
    helloworld = require('../index'),
    escape = helloworld.escape,
    unescape = helloworld.unescape;

describe('#escape', function() {
  it('converts & into &amp;', function() {
    escape('&').should.equal('&amp;');
  });

  it('converts " into &quot;', function() {
    escape('"').should.equal('&quot;');
  });

  it("converts ' into &#39;", function() {
    escape("'").should.equal('&#39;');
  });

  it('converts < into &lt;', function() {
    escape('<').should.equal('&lt;');
  });

  it('converts > into &gt;', function() {
    escape('>').should.equal('&gt;');
  });
});

describe('#unescape', function() {
  it('converts &amp; into &', function() {
    unescape('&amp;').should.equal('&');
  });

  it('converts &quot; into "', function() {
    unescape('&quot;').should.equal('"');
  });

  it("converts &#39; into '", function() {
    unescape('&#39;').should.equal("'");
  });

  it('converts &lt; into <', function() {
    unescape('&lt;').should.equal('<');
  });

  it('converts &gt; into >', function() {
    unescape('&gt;').should.equal('>');
  });
});

Note that I am using the should syntax provided by the Chai framework. Also note the use of require to pull in our module code into the test.

========= Running a Test ==========

But how do we actually run the tests? Following the Mocha docs and to keep things simple, we’ll add a Makefile to the root of the project with an associated test target. Note that most projects seem to be using Grunt rather than Make these days. Regardless, our file should contain the following.

Content of /tacit/tacit_modules/tacit-helloworld/Makefile:

test:
	./node_modules/.bin/mocha --reporter spec

 .PHONY: test

Note that the indentation after the test target must be a tab and not spaces.

After doing so, we can then execute the tests by entering following command:

sudo make test

The result will be like so:

./node_modules/.bin/mocha --reporter spec


  #escape
    ✓ converts & into &amp;
    ✓ converts " into &quot;
    ✓ converts ' into &#39;
    ✓ converts < into &lt;
    ✓ converts > into &gt;

  #unescape
    ✓ converts &amp; into &
    ✓ converts &quot; into "
    ✓ converts &#39; into '
    ✓ converts &lt; into <
    ✓ converts &gt; into >


  10 passing (15ms)

To improve upon this, we can now tell npm how to run our tests by simply adjusting the scripts:test section of our package.json file.  

"scripts": {
  "test": "make test"
},

After doing so, we can then run the following command to run our tests.

npm test

The output should look something like the following.

> tacit-helloworld@1.0.0 test /Users/wvanheemstra/Sites/tacit-helloworld.git
> make test

./node_modules/.bin/mocha --reporter spec


  #escape
    ✓ converts & into &amp;
    ✓ converts " into &quot;
    ✓ converts ' into &#39;
    ✓ converts < into &lt;
    ✓ converts > into &gt;

  #unescape
    ✓ converts &amp; into &
    ✓ converts &quot; into "
    ✓ converts &#39; into '
    ✓ converts &lt; into <
    ✓ converts &gt; into >


  10 passing (14ms)

Great, the module is complete. Prior to publishing to npm, let’s first ensure that any changes have been committed to git and that everything has been pushed up to Github. It is also a good idea to create a version tag as well. Here’s how to do just that.

git tag 0.1.0
git push origin master --tags

========= Create a Submodule on Git ==========

Make tacit-helloworld a submodule of tacit, by going into the tacit repository and typing the following:

git submodule add git://github.com/wvanheemstra/tacit-helloworld.git tacit-helloworld

The outcome will be as follows:

Cloning into 'tacit'...
remote: Counting objects: 14, done.
remote: Compressing objects: 100% (9/9), done.
remote: Total 14 (delta 2), reused 11 (delta 2), pack-reused 0
Receiving objects: 100% (14/14), done.
Resolving deltas: 100% (2/2), done.

Now you should see a directory ('tacit-helloworld') been created inside tacit. It has its own .git folder, so it can be referenced like any other repository:

git://github.com/wvanheemstra/tacit/tacit-helloworld.git

Inside tacit there will be a file .gitmodules with the following content:

[submodule "tacit-helloworld"]
	path = tacit-helloworld
	url = git://github.com/wvanheemstra/tacit-helloworld.git

========= Publishing to NPM ==========
