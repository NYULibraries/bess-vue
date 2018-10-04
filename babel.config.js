module.exports = function(api) {
  return  {
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": [
            "> 1%",
            "IE >= 11"
          ],
          "modules": false
        }
      ]
    ],
    "plugins": [
      "@babel/plugin-proposal-object-rest-spread"
    ],
    "sourceMaps": api.env('production') ? true : "both"
  };
};