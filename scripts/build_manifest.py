#!/usr/bin/env python3
"""Build MANIFEST.json with file sizes and SHA-256 checksums."""
import argparse
import hashlib
import json
from datetime import date
from pathlib import Path


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", required=True, help="Root directory to scan")
    ap.add_argument("--out", required=True, help="Output path for MANIFEST.json")
    args = ap.parse_args()

    root = Path(args.root)
    if not root.is_dir():
        print(f"ERROR: root not found: {root}")
        return 2

    files = []
    for p in sorted(root.rglob("*")):
        if p.is_file() and p.name != "MANIFEST.json":
            data = p.read_bytes()
            files.append({
                "path": str(p.relative_to(root)).replace("\\", "/"),
                "bytes": len(data),
                "sha256": hashlib.sha256(data).hexdigest(),
            })

    manifest = {
        "name": "indexkit-w3schools-research",
        "version": "0.1.0",
        "build_date": date.today().isoformat(),
        "file_count": len(files),
        "files": files,
    }

    out_path = Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"OK: Manifest written to {out_path} ({len(files)} files)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
