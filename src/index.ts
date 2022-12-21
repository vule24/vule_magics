import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook';
import { CodeMirrorEditor } from '@jupyterlab/codemirror';
import { Cell, isCodeCellModel } from '@jupyterlab/cells';
import CodeMirror from 'codemirror';

interface IMagicSyntax {
  [key: string]: string;
}

const CellMagicSyntaxMap: IMagicSyntax = {
  default: 'text/x-ipython',
  '%%sql': 'text/x-sql',
  '%%gremlin': 'text/x-groovy'
};

class SyntaxHighlighter {
  constructor(
    protected app: JupyterFrontEnd,
    protected tracker: INotebookTracker
  ) {
    // this.tracker.activeCellChanged.connect(() => {
    //   if (this.tracker.activeCell) {
    //     this.setup_cell_editor(this.tracker.activeCell);
    //   }
    // });
    //
    this.tracker.currentChanged.connect(() => {
      // console.log('changed!');
      if (!this.tracker.currentWidget) {
        return true;
      }
      const notebook = this.tracker.currentWidget;
      notebook.content.modelContentChanged.connect(() => {
        if (notebook.content.widgets.length > 0) {
          // console.log('tracker.widgets:', notebook.content.widgets.length);
          notebook.content.widgets.forEach((cell: Cell) => {
            this.setup_cell_editor(cell);
          });
        }
      });
    });
  }

  setup_cell_editor(cell: Cell): void {
    if (cell !== null && isCodeCellModel(cell.model)) {
      const editor = this._extract_editor(cell);
      this.magic_syntax_map(editor);
    }
  }

  _extract_editor(cell: Cell): CodeMirror.Editor {
    const editor_temp = cell.editor as CodeMirrorEditor;
    return editor_temp.editor;
  }

  magic_syntax_map(editor: CodeMirror.Editor): void {
    const magic = editor.getDoc().getLine(0).split(' ')[0];
    if (magic.startsWith('%%') && magic in CellMagicSyntaxMap) {
      this.setup_overlay(editor, true, CellMagicSyntaxMap[magic]);
    } else {
      this.setup_overlay(editor, true, CellMagicSyntaxMap.default);
    }
  }

  setup_overlay(editor: CodeMirror.Editor, retry = true, mode: string): void {
    const current_mode = editor.getOption('mode') as string;

    if (current_mode === 'null') {
      if (retry) {
        // putting at the end of execution queue to allow the CodeMirror mode to be updated
        setTimeout(() => this.setup_overlay(editor, false, mode), 0);
      }
      return;
    }
    // console.log('current_mode:', current_mode);
    editor.setOption('mode', mode);
  }
}

/**
 * Activate extension
 */
function activate(app: JupyterFrontEnd, tracker: INotebookTracker): void {
  console.log('JupyterLab extension vule-magics is activated!');
  const sh = new SyntaxHighlighter(app, tracker);
  console.log('SyntaxHighlighter Loaded ', sh);
}

/**
 * Initialization data for the jupyterlab_spellchecker extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'vule-magics:plugin',
  autoStart: true,
  requires: [INotebookTracker],
  activate: activate
};

export default plugin;
