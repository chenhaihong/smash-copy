#!/usr/bin/env node

const assert = require('assert');
const path = require('path');
const Copier = require('.');
const cwd = process.cwd();

// 测试拷贝文件
{
    let i = 0;
    const fileSrc = path.resolve(cwd, './index.js');
    const fileDst = path.resolve(cwd, './temp/index.js');
    while (++i <= 100) {
        let timeName = `测试拷贝文件-${i}`;
        console.time(timeName);
        const { error } = Copier.copySync(fileSrc, fileDst);
        console.timeEnd(timeName);
        assert.equal(error, null);
    }
}

// 测试拷贝文件夹
{
    let i = 0;
    const dirSrc = path.resolve(cwd, './temp');
    const dirDst = path.resolve(cwd, './temp.copy');
    while (++i <= 100) {
        let timeName = `测试拷贝文件夹-${i}`;
        console.time(timeName);
        const { error } = Copier.copySync(dirSrc, dirDst);
        console.timeEnd(timeName);
        assert.equal(error, null);
    }
}

