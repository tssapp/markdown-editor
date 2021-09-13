module.exports = {
  mount: {
    public: { url: "/", static: true },
    src: "/",
  },
  exclude: ["**/*.test.ts", "**/*.test.tsx", "lib/test/test-utils.tsx"],
  routes: [{ match: "routes", src: ".*", dest: "/index.html" }],
  plugins: [
    [
      "@snowpack/plugin-webpack",
      {
        htmlMinifierOptions: true,
      },
    ],
  ],
};

/**
 * some resources about path
 * https://medium.com/@raviroshan.talk/webpack-understanding-the-publicpath-mystery-aeb96d9effb1
 * https://webpack.js.org/configuration/output/#outputpath
 * https://webpack.js.org/configuration/dev-server/#devservercontentbase
 * https://gist.github.com/codepunkt/ae82a0f3b9deb93908dc1f3d5bbc8da2
 * none of the above seem to work though
 * I suspect the substiution in index.html is very naive and causes problem
 * solution solve it via external script?
 *  sed -i '.html' 's/script src="\/js/script src="\/myprefix\/js/g' index.html
 */
