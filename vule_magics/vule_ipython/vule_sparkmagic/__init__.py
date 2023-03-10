from IPython.core.display import display_javascript
from .vule_sparkmagic import VuLeSparkMagic


def load_ipython_extension(ipython):
    js = (
        "try {"
            "require(['notebook/js/codecell'], function (codecell) {"
                "codecell.CodeCell.options_default.highlight_modes['magic_text/x-mssql'] = { 'reg': [/%?%sql/] };"
                "Jupyter.notebook.events.one('kernel_ready.Kernel', function () {"
                    "Jupyter.notebook.get_cells().map(function (cell) {"
                        "if (cell.cell_type == 'code') { cell.auto_highlight(); }"
                    "});"
                "});"
            "});"
        "} catch(e) {}"
    )
    display_javascript(js, raw=True)
    ipython.register_magics(VuLeSparkMagic)