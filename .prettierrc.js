module.exports = {
    printWidth: 120,
    trailingComma: 'es5',
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    overrides: [
        {
            files: '*.ts*',
            options: {
                bracketSpacing: false,
                arrowParens: 'avoid',
            },
        },
        {
            files: '*.scss',
            options: {
                parser: 'scss',
                semi: true,
            },
        },
    ],
    plugins: ["prettier-plugin-import-sort"]
}
