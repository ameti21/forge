#!/usr/bin/env python3
"""Package a directory into a ZIP file using Python stdlib."""
import argparse
import zipfile
from pathlib import Path


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", required=True, help="Folder to zip")
    ap.add_argument("--zip", required=True, help="Output zip path")
    args = ap.parse_args()

    root = Path(args.root).resolve()
    out = Path(args.zip).resolve()

    if not root.is_dir():
        raise SystemExit(f"root must be a dir: {root}")

    out.parent.mkdir(parents=True, exist_ok=True)

    with zipfile.ZipFile(out, "w", compression=zipfile.ZIP_DEFLATED) as z:
        for p in sorted(root.rglob("*")):
            if p.is_file():
                arcname = p.relative_to(root.parent)
                z.write(p, arcname.as_posix())

    print(f"OK: Created {out} ({out.stat().st_size} bytes)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
