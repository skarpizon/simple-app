import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import env from 'postcss-preset-env';
import cssnano from 'cssnano';
import autoprefixer from 'autoprefixer';
import { SOURCE_DIRECTORY } from '../constants';

const commonLoaders = ({ sourceMap = false, minify = false } = { sourceMap: false, minify: false }) => {

  // PostCSS PLugins
  const postCssPlugins = [
    env({
      stage: 0,
    }),
    autoprefixer,
  ];
  if (minify) postCssPlugins.push(cssnano);
  //End of [PostCSS PLugins]

  return [
    { 
      loader: 'css-loader', 
      options: {
        sourceMap,
        modules: {
          localIdentName: '[name]__[local]-[hash:base64:6]',
        }
      },
    },
    { 
      loader: 'postcss-loader', 
      options: {
        sourceMap,
        plugins: postCssPlugins,
      },
    },
  ];
};

const sassLoaders = () => {
  return [
    'sass-loader',
    {
      loader: 'sass-resources-loader',
      options: {
        resources: [`${SOURCE_DIRECTORY}/styles/main.scss`],
      },
    },
  ];
}

export const loadDevCss = () => {
  return {
    module: {
      rules: [ 
        {
          test: /\.css$/,
          use: [ 
            'style-loader', 
            ...commonLoaders({ sourceMap: true }),
          ],
        },
        {
          test: /\.s(a|c)ss$/,
          use: [ 
            'style-loader', 
            ...commonLoaders({ sourceMap: true }),
            ...sassLoaders(),
          ],
        },
      ],
    }
  };
};

export const loadProdCss = () => {
  return {
    module: {
      rules: [ 
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            ...commonLoaders({ sourceMap: false, minify: true }),
          ],
        },
        {
          test: /\.s(a|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            ...commonLoaders({ sourceMap: false, minify: true }),
            ...sassLoaders(),
          ],
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].[id].css",
        chunkFilename: "css/[name].[contenthash].[id].css",
      }),
    ],
  };
}; 