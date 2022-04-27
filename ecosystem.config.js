module.exports = {
  apps: [{
    name: 'ens.sh',
    script: 'npm start',
    watch: false,
    env: {
      NODE_ENV: 'production'
    }
  }]
}