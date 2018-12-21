/**
 * 文件（夹）拷贝方法
 */

const fs = require('fs');
const path = require('path');
const ERROR_MESSAGE = require('./errorMessage.json');

class Copier {
    /**
     * 这里只处理2种情况：
     * （1）src=文件，dst=文件：将文件写入到目标文件；
     * （2）src=目录，dst=目录：将目录内的文件拷贝到目标目录。
     * @param {String} src 源目录|文件
     * @param {String} dest 目标目录|文件path
     * @param {Function} callback 回调函数
     */
    static copySync(src, dest, callback) {
        let returnValue = { error: null };
        try {
            // （1）判断源是否存在
            const stats = fs.statSync(src); // 如果目录|文件不存在，这里会抛出错误
            // （2.1）如果是文件，执行拷贝文件的逻辑
            if (stats.isFile()) {
                // （3）创建父级目录：必须父级目录才能拷贝文件。
                this.mkDir(path.dirname(dest));
                // （4）拷贝文件到目标文件
                returnValue = this.copyFileSync(src, dest);
            }
            // （2.2）如果文件夹，执行拷贝文件夹的逻辑
            else if (stats.isDirectory()) {
                // （3）拷贝目录内的文件到目标目录。
                returnValue = this.copyDirSync(src, dest, callback);
            }
            // （2.3）不是文件（夹）时，丢出错误
            else {
                returnValue.error = new Error(ERROR_MESSAGE.SRC_MUST_BE_FILE_OR_DIR);
            }
        } catch (error) {
            returnValue.error = error;
        }
        return returnValue;
    }

    /**
     * 递归创建目录
     * @param {String} dir 目录
     */
    static mkDir(dir) {
        try {
            return !!fs.statSync(dir); // 如果目录不存在，这里会抛出错误
        } catch (error) {
            if (this.mkDir(path.dirname(dir))) {
                fs.mkdirSync(dir);
                return true;
            }
        }

        // node v10.12.0+
        // The second argument can now be an options object with recursive and mode properties.
        // try {
        //     fs.statSync(dir);
        // } catch (error) {
        //     fs.mkdirSync(dir, { recursive: true });
        // }
    }

    /**
     * 将文件写入到目标文件
     * @param {String} src 源文件地址
     * @param {String} dest 目标文件地址
     */
    static copyFileSync(src, dest) {
        let returnValue = { error: null };
        // node  v8.5.0+
        // fs.copyFileSync(src, dest[, flags])
        // http://nodejs.cn/api/fs.html#fs_fs_copyfilesync_src_dest_flags
        try {
            fs.copyFileSync(src, dest);
        } catch (error) {
            returnValue.error = error;
        } finally {
            return returnValue;
        }
    }

    /**
     * 将目录内的文件拷贝到目标目录
     * @param {String} dirSrc 源目录
     * @param {String} dirDst 目标目录
     */
    static copyDirSync(dirSrc, dirDst) {
        let returnValue = { error: null };

        this.mkDir(dirDst);

        // （1）读取源目录
        const files = fs.readdirSync(dirSrc);
        for (const file of files) {
            if (returnValue.error) break;

            const pathSrc = `${dirSrc}/${file}`;
            const pathDst = `${dirDst}/${file}`;
            const stats = fs.statSync(pathSrc);
            // （4.1）拷贝文件
            if (stats.isFile()) {
                returnValue = this.copyFileSync(pathSrc, pathDst); // 写入文件
            }
            // （4.2）拷贝目录
            else if (stats.isDirectory()) {
                returnValue = this.copyDirSync(pathSrc, pathDst); // 递归拷贝目录内的文件
            }
        }

        return returnValue;
    }
}

module.exports = Copier;