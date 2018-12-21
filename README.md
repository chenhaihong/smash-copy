# smash-copy

Copy file or directory.

# Install

```bash
npm i --save smash-copy
# or
yarn add smash-copy
```

# Usage

## Copy file.

```javascript
const Copier = require('smash-copy');

const fileSrc = path.resolve(cwd, './index.js');
const fileDst = path.resolve(cwd, './temp/index.js');
const { error } = Copier.copySync(fileSrc, fileDst);
if (error) {
    console.error(error.message);
} else {
    // TODO Finish copying.
}
```

## Copy directory.

```javascript
const Copier = require('smash-copy');

const dirSrc = path.resolve(cwd, './temp');
const dirDst = path.resolve(cwd, './temp.copy');
const { error } = Copier.copySync(dirSrc, dirDst);
if (error) {
    console.error(error.message);
} else {
    // TODO Finish copying.
}
```

# Links

- [smash-cli](https://github.com/chenhaihong/smash-cli)