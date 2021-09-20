/**
 * @name DiscordNitroScreenShare
 * @author es3n1n
 * @version 1.0.0
 * @authorLink https://github.com/es3n1n
 * @description Unlock 1080p 60fps screen share
 * @source https://github.com/es3n1n/discord-nitro-screen-share
 * @updateUrl https://github.com/es3n1n/discord-nitro-screen-share/blob/main/DNSS.plugin.js
 */
module.exports = (() => {
    const config = {
        info: {
            name: "DiscordNitroScreenShare",
            authors: [{
                name: "es3n1n",
                github_username: "es3n1n"
            }],
            version: "1.0.0",
            description: "Unlock 1080p 60fps screen share",
        },
        changelog: [{
            title: "Update",
            items: ["First release!"]
        }],
        defaultConfig: [],
        main: "index.js"
    };

    return !global.ZeresPluginLibrary ? class {
        constructor() {
            this._config = config;
        }
        getName() {
            return config.info.name;
        }
        getAuthor() {
            return config.info.authors.map(a => a.name).join(", ");
        }
        getDescription() {
            return config.info.description;
        }
        getVersion() {
            return config.info.version;
        }
        load() {
            BdApi.showConfirmationModal("Plugin request BD Plugin Library", `Download ?`, {
                confirmText: "Confirm",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
        }
        start() {}
        stop() {}
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {
            return class ReadIFGay extends Plugin {
                getModule(filter) {
                    const name = typeof filter === 'string' ? filter : null;
                    const modules = Object.values(webpackJsonp.push([
                        [], {
                            ['']: (_, e, r) => {
                                e.cache = r.c
                            }
                        },
                        [
                            ['']
                        ]
                    ]).cache);
                    for (const mdl of modules) {
                        const m = mdl.exports;
                        if (m && m.__esModule && m.default && (name ? m.default[name] : filter(m.default))) return m.default;
                        if (m && (name ? m[name] : filter(m))) return m;
                    }
                    return null;
                }

                onStart() {
                    this._backup = this.getModule('getCurrentUser').getCurrentUser().premiumType;
                    this.getModule('getCurrentUser').getCurrentUser().premiumType = 2;
                }

                onStop() {
                    this.getModule('getCurrentUser').getCurrentUser().premiumType = this._backup;
                }
            };
        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
