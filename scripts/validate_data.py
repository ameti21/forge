#!/usr/bin/env python3
"""Validate that no forbidden content patterns exist in the release tree."""
import argparse
import re
from pathlib import Path

FORBIDDEN_PATTERNS = [
    re.compile(r"<html[^>]*>", re.IGNORECASE),
    re.compile(r"<!doctype html>", re.IGNORECASE),
]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--root", required=True, help="Root directory to validate")
    args = ap.parse_args()

    root = Path(args.root)
    if not root.exists():
        print(f"ERROR: root not found: {root}")
        return 2

    # Fail if any .html exists outside the build/ folder
    for p in root.rglob("*.html"):
        if "site/build" not in str(p).replace("\\", "/"):
            print(f"ERROR: Unexpected HTML file outside site/build: {p}")
            return 2

    # Heuristic scan for HTML dumps in data/reports
    for p in root.rglob("*"):
        if p.is_file() and p.suffix.lower() in {".md", ".json", ".jsonl", ".csv", ".txt"}:
            text = p.read_text(encoding="utf-8", errors="ignore")
            for pat in FORBIDDEN_PATTERNS:
                if pat.search(text):
                    print(f"ERROR: Forbidden pattern found in {p}: {pat.pattern}")
                    return 2

    print("OK: Compliance validation passed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
