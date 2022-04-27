npm i &&
cd resolver &&
npm i &&
cd ../ &&
npm run build &&
pm2 startOrRestart ecosystem.config.js