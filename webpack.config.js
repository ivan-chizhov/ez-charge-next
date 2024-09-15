const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webPush = require('web-push')
const bodyParser = require('body-parser')
const vapidKeys = require('./vapid-keys.json')

webPush.setVapidDetails('mailto:someone@example.com', vapidKeys.publicKey, vapidKeys.privateKey)

const subscriptions = {}

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, './public'),
          to: path.join(__dirname, './dist'),
        },
      ],
    }),
  ],
  devServer: {
    historyApiFallback: true,
    port: 3000,
    allowedHosts: 'all',
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }

      devServer.app.use(bodyParser.json())

      devServer.app.post('/api/users/:gpn/login', (req, res) => {
        const { gpn } = req.params
        const { password } = req.body

        if (gpn !== '123') {
          return res.status(404).json({ message: 'User not found' })
        }

        if (password !== '123') {
          return res.status(401).json({ message: 'Invalid password' })
        }

        return res.status(204).end()
      })

      devServer.app.post('/api/users/:gpn/subscribe', (req, res) => {
        const { gpn } = req.params
        const subscription = req.body
        if (!Object.values(subscriptions).some((s) => s.endpoint === subscription.endpoint)) {
          subscriptions[gpn] = subscription
        }
        res.status(204).end()
      })

      devServer.app.post('/api/users/:gpn/unsubscribe', (req, res) => {
        const { gpn } = req.params
        // const subscription = req.body
        delete subscriptions[gpn]
        res.status(204).end()
      })

      devServer.app.get('/sendNotifications', (req, res) => {
        const payload = JSON.stringify({
          title: 'Notification',
          body: 'This is an important message!',
          url: '/',
        })

        Promise.all(
          Object.values(subscriptions).map((sub) =>
            webPush.sendNotification(sub, payload).catch((error) => console.error('Error sending notification:', error))
          )
        )
          .then(() => res.json({ message: 'Notification sent' }))
          .catch((error) => {
            console.error('Error in sendNotification', error)
            res.status(500).json({ message: 'Error sending notifications' })
          })
      })

      return middlewares
    },
  },
}
