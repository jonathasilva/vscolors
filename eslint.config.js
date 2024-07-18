

module.exports = [
    {
        files : ['*.ts', '*.tsx'],
        parser: '@typescript-eslint/parser',
        plugins: ['@typescript-eslint'],
        extends: [
            'eslint:recommended',
            'plugin:@typescript-eslint/recommended',
          ],
          env: {
            es6: true,
            node: true,
          },
          settings: {
            'import/resolver': {
              node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
              },
            },
          },
          rules: {
            '@typescript-eslint/naming-convention': 'warn',
            '@typescript-eslint/semi': 'warn',
            'curly': 'warn',
            'eqeqeq': 'warn',
            'no-throw-literal': 'warn',
            'semi': 'off', // Desativando a regra de ponto e vírgula globalmente
        },
    },
];