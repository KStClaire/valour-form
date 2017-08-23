var path = require('path');

const version = require('./package.json').version;

const styleguidePaths = require('./config/paths');

module.exports = {
    styleguideDir: 'docs',
    title: `Valour Form v${version}`,
    template: 'config/template.html',
    showUsage: true,
    serverPort: 8080,
    sections: [
        {
            name: 'Form',
            components: path.join(styleguidePaths.componentDir, 'form/*.js')
        },
        {
            name: 'Inputs',
            components: path.join(styleguidePaths.componentDir, 'inputs/**/*.js'),
            content: path.join(styleguidePaths.componentDir, 'inputs/inputs.md')
        }
    ],
    context: {
        valour: 'valour',
        noop: 'lodash/noop'
    },
    getComponentPathLine(componentPath) {
        const name = path.basename(componentPath, '.js');
        return `import { ${name} } from 'valour-form';`;
    },
    styles: {
        Playground: {
            preview: {
                fontFamily: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
                fontSize: '14px'
            }
        }
    },
    webpackConfig: {
        module: {
            rules: [{
                test: /\.js$/,
                include: styleguidePaths.componentDir,
                use: ['babel-loader']
            }, {
            test: /\.css$/,
            include: styleguidePaths.componentDir,
            use: ['style-loader', 'css-loader']
            }]
        }
    }
};