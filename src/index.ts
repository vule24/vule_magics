import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the vule-magics extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'vule-magics:plugin',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension vule-magics is activated!');
  }
};

export default plugin;
