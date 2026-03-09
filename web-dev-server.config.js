// import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';

/** Use Hot Module replacement by adding --hmr to the start command */
// eslint-disable-next-line no-undef
const hmr = process.argv.includes('--hmr');

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
  rootDir: '.',
  open: '/demo/',
  /** Use regular watch mode if HMR is not enabled. */
  watch: !hmr,
  /** Don't enable this here, because to truely test the bundle
   * you don't want this to be enabled. So this is only enabled
   * when using start (dev mode).
   */
  // nodeResolve: {
  //   exportConditions: ['browser', 'development'],
  // },

  /** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
  // esbuildTarget: 'auto'

  /** Set appIndex to enable SPA routing */
  // appIndex: '/demo/index.html',

  plugins: [
    /** Use Hot Module Replacement by uncommenting. Requires @open-wc/dev-server-hmr plugin */
    // hmr && hmrPlugin({ exclude: ['**/*/node_modules/**/*'], presets: [presets.lit] }),
  ],

  // See documentation for all available options
});
