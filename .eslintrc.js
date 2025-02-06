module.exports = {
    plugins: ['formatjs', 'html', 'react'],
    parser: '@typescript-eslint/parser',
    overrides: [
        {
            files: '*.js',
            rules: {
                'no-magic-numbers': 'off',
                'prefer-destructuring': 'off',
                'init-declarations': 'off',
                'react/boolean-prop-naming': 'off',
            },
        },
    ],
    extends: ['react-app', 'react-app/jest'],
    rules: {
        '@typescript-eslint/no-explicit-any-catch': 'off',
        'react-hooks/exhaustive-deps': 'off',
        'formatjs/no-offset': 'error',
        'react/jsx-uses-react': 'error',
        'react/jsx-uses-vars': 'error',
    },
    ignorePatterns: ['dist/*', 'node_modules/*'],
}
