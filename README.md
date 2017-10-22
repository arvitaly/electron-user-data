# electron-user-data

Lib for manipulation user data in Electron

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

# Install

    npm install electron-user-data --save

# Usage

    ```typescript
    import {import as Import, export as Export} from "electron-user-data";
    //...
    const data = await Import("...userData");
    data.cookies[0][0].value = "Hi";
    await Export("...userData2");
    ```

# API



# Test

    npm install
    npm test

[npm-image]: https://badge.fury.io/js/electron-user-data.svg
[npm-url]: https://npmjs.org/package/electron-user-data
[travis-image]: https://travis-ci.org/arvitaly/electron-user-data.svg?branch=master
[travis-url]: https://travis-ci.org/arvitaly/electron-user-data
[daviddm-image]: https://david-dm.org/arvitaly/electron-user-data.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/arvitaly/electron-user-data
[coveralls-image]: https://coveralls.io/repos/arvitaly/electron-user-data/badge.svg
[coveralls-url]: https://coveralls.io/r/arvitaly/electron-user-data