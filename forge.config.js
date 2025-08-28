// const { FusesPlugin } = require('@electron-forge/plugin-fuses');
// const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: {
      unpack: "scripts/**/*"
    },
    timeout: 300000, // 5 minutes timeout
    extraResource: [
      "scripts"
    ]
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
        
        // Get the source directory where the original project files are
        const projectDir = config.projectDir || process.cwd();
        const scriptsSource = path.join(projectDir, 'scripts');
        
        // Copy to resources directory for extraResource access
        const resourcesDestination = path.join(buildPath, '..', 'resources', 'scripts');
        
        console.log(`Copying scripts from: ${scriptsSource}`);
        console.log(`To resources: ${resourcesDestination}`);
        
        if (await fs.pathExists(scriptsSource)) {
          await fs.ensureDir(path.dirname(resourcesDestination));
          await fs.copy(scriptsSource, resourcesDestination);
          console.log('Scripts directory copied to resources');
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
    // n// FusesPlugin({
    //  // rsion: FuseVersion.V1,
    //  // useV1Options.RunAsNode]: false,
    //  // useV1Options.EnableCookieEncryption]: true,
    //  // useV1Options.EnableNodeOptionsEnvironmentVariable]: false,
    //  // useV1Options.EnableNodeCliInspectArguments]: false,
    //  // useV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
    //  // useV1Options.OnlyLoadAppFromAsar]: true,
    // }// 
  ],
};
