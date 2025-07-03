import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

export default [
  {
    input: 'oscd-background-editv1.ts',
    output: {
      sourcemap: true, // Add source map to build output
      format: 'es', // ES module type export
      dir: 'dist', // The build output folder
      // preserveModules: true,  // Keep directory structure and files
    },
    preserveEntrySignatures: 'strict', // leaves export of the plugin entry point

    plugins: [
      /** Resolve bare module imports */
      nodeResolve(),
      typescript(),
      copy({
        targets: [
          { src: 'demo/index.html', dest: 'dist/demo' },
          { src: 'demo/*.js', dest: 'dist/demo' },
          // Add more patterns if you have more assets
        ],
        verbose: true,
        flatten: false,
      }),
    ],
  },
];
