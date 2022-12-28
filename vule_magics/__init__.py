import json
from pathlib import Path
from IPython.core.display import display_javascript

from ._version import __version__


HERE = Path(__file__).parent.resolve()

with (HERE / "labextension" / "package.json").open() as fid:
    data = json.load(fid)

def _jupyter_labextension_paths():
    return [{
        "src": "labextension",
        "dest": "vule-magics"
    }]

def _load_jupyter_server_extension(server_app):
    pass
