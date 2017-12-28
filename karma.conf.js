module.exports = function (config) {

    config.set({
        frameworks: ['jasmine', 'karma-typescript'],
        files: [
            'src/**/*.ts' // *.tsx for React Jsx
        ],
        preprocessors: {
            '**/*.ts': 'karma-typescript' // *.tsx for React Jsx
        },
        reporters: ['progress', 'karma-typescript'],
        karmaTypescriptConfig: {
            tsconfig: 'tsconfig.json',
            reports: {
                html: {
                    "directory": "./",
                    "subdirectory": "coverage"
                },
                "lcovonly": {
                    "directory": "./",
                    "filename": "coverage.lcov",
                    "subdirectory": "coverage"
                },
            },
        },
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['Chrome'],
        singleRun: true,
        concurrency: Infinity
    });

    if (process.env.TRAVIS) {
        config.browsers = ['Chrome_travis_ci'];
    }
};