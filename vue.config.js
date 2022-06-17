const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pluginOptions: {
    electronBuilder: {
      preload: "src/preload.ts",
      builderOptions: {
        extraResources: ["src", "src/res/"],
      },
      externals: ["knex", "sqlite3"],
    },
  },
});
