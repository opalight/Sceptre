module.exports = {
    name: 'Sceptre',
    src: `${__dirname}`,
    out: '../Sceptre-Docs',
    mode: 'modules',
    exclude: [
        '**/tests/**/*',
        '**/node_modules/**/*',
        '**/coverage/**/*',
        '**/build/**/*'
    ],
    target: 'es6',
    ignoreCompilerErrors: true,
    tsconfig: 'tsconfig.json',
    theme: 'minimal',
    moduleResolution: 'node',
    preserveConstEnums: 'true',
    stripInternal: 'true',
    suppressExcessPropertyErrors: 'true',
    suppressImplicitAnyIndexErrors: 'true',
    module: 'commonjs'
}
