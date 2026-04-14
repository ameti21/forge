#!/usr/bin/env python3
"""
Permissioned fetch — DISABLED by default.

This script is a guardrail placeholder. It will refuse to run unless you have
explicit written permission from W3Schools and configure the required env vars.
"""
import os
import sys
from pathlib import Path


def main() -> int:
    if os.environ.get("W3SCHOOLS_PERMISSION_GRANTED") != "true":
        print("ERROR: Permissioned fetching is disabled.")
        print("Set W3SCHOOLS_PERMISSION_GRANTED=true only if you have written permission.")
        return 2

    proof_path = Path(os.environ.get("W3SCHOOLS_PERMISSION_PROOF_PATH", ""))
    if not proof_path.is_file():
        print("ERROR: Missing proof-of-permission file.")
        print("Set W3SCHOOLS_PERMISSION_PROOF_PATH to a local file path.")
        return 2

    print("OK: Permission gate passed. Implement your fetcher here with strict robots compliance + rate limits.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
