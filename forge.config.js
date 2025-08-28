// const { FusesPlugin } = require('@electron-forge/plugin-fuses');
// const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: {
      unpack: "{scripts/**/*,scripts}"
    },
    timeout: 300000 // 5 minutes timeout
    // Removed ignore patterns to let Vite plugin handle this automatically
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  hooks: {
    packageAfterCopy: async (config, buildPath, electronVersion, platform, arch) => {
      try {
        const fs = require('fs-extra');
        const path = require('path');
        
        // Use process.cwd() instead of config.projectDir which may be undefined
        const projectDir = config.projectDir || process.cwd();
        const scriptsSource = path.join(projectDir, 'scripts');
        const scriptsDestination = path.join(buildPath, 'scripts');
        
        console.log(`Attempting to copy scripts from: ${scriptsSource}`);
        console.log(`To destination: ${scriptsDestination}`);
        
        if (await fs.pathExists(scriptsSource)) {
          await fs.copy(scriptsSource, scriptsDestination);
          console.log('Scripts directory copied to build');
        } else {
          console.log('Scripts directory not found, skipping copy');
        }
      } catch (error) {
        console.error('Error in packageAfterCopy hook:', error);
        // Don't fail the build, just log the error
      }
    }
  },
  plugins: [
    {
      name: '@electron-forge/plugin-vite',
      config: {
        // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
        // If you are familiar with Vite configuration, it will look really familiar.
        build: [
          {
            // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
            entry: 'src/main.js',
            config: 'vite.main.config.mjs',
            // target: 'main',
          },
          {
            entry: 'src/preload.js',
            config: 'vite.preload.config.mjs',
            // target: 'preload',
          },
        ],
        renderer: [
          {
            name: 'main_window',
            config: 'vite.renderer.config.mjs',
          },
        ],
      },
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    // new FusesPlugin({
    //   version: FuseVersion.V1,
    //   [FuseV1Options.RunAsNode]: false,
    //   [FuseV1Options.EnableCookieEncryption]: true,
    //   [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
    //   [FuseV1Options.EnableNodeCliInspectArguments]: false,
    //   [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
    //   [FuseV1Options.OnlyLoadAppFromAsar]: true,
    // }),
  ],
};
