module.exports = {
    apps: [
      {
        name: 'metalmap',
        port: '3000',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs',
        args: 'start',
      }
    ]
  }