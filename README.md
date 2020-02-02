# Gutenberg Starter Blocks

Some sample code to help you get started. Please feel free to fork, but I would love to know how you used my code, or how it helped you. Here's some notes ...

## Build Scripts

This sample code was built to be as low-dependency as possible, but if you need to target
compatibility with real old browsers, even IE11, some kind of transpiling to old JS syntax
is going to be necessary. For this purpose, included are appropriate NPM build scripts. 

To use the included npm build scripts, install them first by running the following terminal command from inside this folder.

```
npm install
```

And that should be it! Now you've got two terminal commands at your disposal,

```
npm run build
npm run watch
```

The `build` command will compile the SCSS and JS included in the *blocks/* folder, and send 
it to the *dist/* folder. The `watch` command will sit in the terminal and wait for files to
change, then run the `build` script.

**OR, you could just ignore all this transpiling jazz. If all your users run a modern 
browser, there's no need for it.**

So instead, open up *gutenberg-starter-blocks.php* (or whatever you've renamed it to), and
set the $use_node property to `false`. And then forget about it! The only handy
thing you'll lose is automatic cache busting, as the transpilation script also does a
version bump - but you can manually set this by updating the version number of your plugin.

## Blocks Included

### Simple Block

An image with title, caption, and descriptive text.