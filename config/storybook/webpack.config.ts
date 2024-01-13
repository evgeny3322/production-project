import webpack, { DefinePlugin, RuleSetRule } from 'webpack';
import path from 'path';
import { BuildPaths } from '../build/types/config';
import { buildCssLoader } from '../build/loaders/buildCssLoader';

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
    };

    // Станислав Шабалин • Чт 13 Окт 09:26
    // У кого возникла проблема с не найденными модулями из entities при запуске storybook, то необходимо заменить в конфигурации storybook настройки путей до модулей:
    //     [ - ] config.resolve.modules.push(paths.src)
    //     [ + ] config.resolve.modules = [ paths.src, "node_modules" ]s
    // Спасибо ребятам из нашей группы
    // config.resolve.modules.push(paths.src);
    config.resolve.modules = [paths.src, 'node_modules'];
    config.resolve.extensions.push('.ts', '.tsx');

    // config.resolve.modules = [
    //     path.resolve(__dirname, '../../src'),
    //     'node_modules',
    // ];

    // У кого будет проблема, что entitiles будет пытаться искать в node_modules правится следующим:
    // В конфиг storybook/webpack.config.ts добавить след код:
    //
    // config.resolve.modules = [
    // path.resolve(__dirname, '../../src'),
    // 'node_modules',
    // ];

    config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }
        return rule;
    });

    config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    });

    config.plugins.push(new DefinePlugin({
        __IS_DEV__: true,
    }));
    config.module.rules.push(buildCssLoader(true));
    return config;
};
