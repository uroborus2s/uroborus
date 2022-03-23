import path from 'path';

const pkgsDir = path.resolve(__dirname, 'packages');
const pkgDir = path.resolve(pkgsDir, process.env.TARGET); // TARGET 我们将在脚本里提供
