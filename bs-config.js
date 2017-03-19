
/*
 |--------------------------------------------------------------------------
 | Browser-sync config file
 |--------------------------------------------------------------------------
 |
 | For up-to-date information about the options:
 |   http://www.browsersync.io/docs/options/
 |
 | There are more options than you see here, these are just the ones that are
 | set internally. See the website for more info.
 |
 |
 */
module.exports = {
    "server": {
        "baseDir": "demo"
    },
    "port": 8888,
    "notify": false,
    "files": [
        "demo/**/*.{html,css,js}",
        "lib/**/*.js"
    ],
    "watchEvents": [
        "change"
    ],
    "watchOptions": {
        "ignoreInitial": true
    },
    "serveStatic": [
        {
            "route": "/lib",
            "dir": "lib"
        }
    ]
};