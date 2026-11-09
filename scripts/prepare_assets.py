"""Restore binary icons when sources were uploaded through a text-only connector."""
import base64
import json
from pathlib import Path

root = Path(__file__).resolve().parent.parent
manifest = root / 'BuildAssets' / 'icons.json'
if manifest.exists():
    for relative, encoded in json.loads(manifest.read_text(encoding='utf-8')).items():
        target = (root / relative).resolve()
        if not target.is_relative_to(root / 'App' / 'Assets.xcassets') or target.suffix != '.png':
            raise ValueError('Invalid asset destination')
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(base64.b64decode(encoded, validate=True))
    print('Restored icons from connector upload manifest')
else:
    print('Using existing icon files')
