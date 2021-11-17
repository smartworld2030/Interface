const CracoLessPlugin = require('craco-less')
const { getThemeVariables } = require('antd/dist/theme')

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              ...getThemeVariables({
                dark: true, // Enable dark mode
                compact: true, // Enable compact mode
              }),
              'primary-color': '#1AE285',
              'secondary-color': '#FF0F42',
              'link-color': '#1DA57A',
              'border-radius-base': '2px',
              'body-background': '#030406',
              'btn-primary-color': '#232323', // buttons text color
              'primary-background-color': '#000805',
              'secondary-background-color': '#0e121a',
            },

            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
