
const path = require('path');
const fs = require('fs');
const { app } = require('electron');

class ScriptHelper {
  static getScriptsPath() {
    if (app.isPackaged) {
      return path.join(process.resourcesPath, 'app.asar.unpacked', 'scripts');
    } else {
      return path.join(__dirname, '..', '..', 'scripts');
    }
  }

  static getScriptPath(scriptName) {
    const scriptsPath = this.getScriptsPath();
    return path.join(scriptsPath, scriptName);
  }

  static scriptExists(scriptName) {
    const scriptPath = this.getScriptPath(scriptName);
    return fs.existsSync(scriptPath);
  }

  static listAvailableScripts() {
    const scriptsPath = this.getScriptsPath();
    try {
      if (fs.existsSync(scriptsPath)) {
        return fs.readdirSync(scriptsPath).filter(file => file.endsWith('.ps1'));
      }
    } catch (error) {
      console.error('Error listing scripts:', error);
    }
    return [];
  }

  static validateEnvironment() {
    const scriptsPath = this.getScriptsPath();
    const issues = [];

    if (!fs.existsSync(scriptsPath)) {
      issues.push(`Scripts directory not found: ${scriptsPath}`);
    }

    const availableScripts = this.listAvailableScripts();
    if (availableScripts.length === 0) {
      issues.push('No PowerShell scripts found in scripts directory');
    }

    return {
      isValid: issues.length === 0,
      issues: issues,
      scriptsPath: scriptsPath,
      availableScripts: availableScripts
    };
  }
}

module.exports = ScriptHelper;
