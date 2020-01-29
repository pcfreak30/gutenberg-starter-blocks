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

The `build` command will transpile your JS included in the *blocks/* folder, and send it
to the *dist/* folder. The `watch` command will sit in the terminal and wait for files to
change, then run the `build` script.

