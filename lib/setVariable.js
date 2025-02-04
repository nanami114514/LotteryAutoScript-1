const Util = require("./Util");
const GlobalVar = require("./GlobalVar");
const config = require("./config");

const key_map = new Map([['DedeUserID', 'myUID'], ['bili_jct', 'csrf']]);

/**
 * 生成全局变量文件
 * 更新config
 * @param {string} cookie
 * @param {number} n
 */
async function setVariable(cookie, n) {
    if (cookie) {
        config.updata(process.env.NUMBER);

        GlobalVar.set('cookie', cookie);

        cookie.split(/\s*;\s*/).forEach(item => {
            const _item = item.split('=');
            if (key_map.has(_item[0]))
                GlobalVar.set(key_map.get(_item[0]), _item[1]);
        });

        const { UIDs = [], TAGs = [], Articles = [] } = config;
        GlobalVar.set('Lottery', [
            ...UIDs.map(it => ['UIDs', it]),
            ...TAGs.map(it => ['TAGs', it]),
            ...Articles.map(it => ['Articles', it])
        ]);

        GlobalVar.set('remoteconfig', await Util.getRemoteConfig());
    }
    await Util.createDir('dyids');
    await Util.createFile(n < 2 ? 'dyid.txt' : `dyid${n}.txt`, '', 'a')
    return
}


module.exports = { setVariable };