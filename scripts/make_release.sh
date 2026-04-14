#!/usr/bin/env bash
set -euo pipefail

VERSION="${VERSION:-0.1.0}"
BUILD_DATE="${BUILD_DATE:-$(date -u +%F)}"
OUT_DIR="out"
ZIP_ROOT="indexkit-w3schools-research_v${VERSION}_${BUILD_DATE}"
ZIP_NAME="${ZIP_ROOT}.zip"

rm -rf "${OUT_DIR}"
mkdir -p "${OUT_DIR}/${ZIP_ROOT}"

# 1) Copy sources into out/
for item in README.md LICENSE NOTICE.md SECURITY.md PRIVACY.md MANIFEST.json reports data scripts deploy legal; do
  if [ -e "$item" ]; then
    cp -r "$item" "${OUT_DIR}/${ZIP_ROOT}/"
  fi
done

# 2) Build static site into site/build
python3 scripts/build_site.py --out "${OUT_DIR}/${ZIP_ROOT}/site/build"

# 3) Validate no forbidden content patterns
python3 scripts/validate_data.py --root "${OUT_DIR}/${ZIP_ROOT}"

# 4) Build manifest with real sizes + hashes
python3 scripts/build_manifest.py --root "${OUT_DIR}/${ZIP_ROOT}" --out "${OUT_DIR}/${ZIP_ROOT}/MANIFEST.json"

# 5) Create zip
python3 scripts/package_zip.py --root "${OUT_DIR}/${ZIP_ROOT}" --zip "${OUT_DIR}/${ZIP_NAME}"

# 6) Checksums
python3 -c "
import hashlib, pathlib
for z in pathlib.Path('out').glob('*.zip'):
    h = hashlib.sha256(z.read_bytes()).hexdigest()
    z.with_suffix(z.suffix + '.sha256').write_text(f'{h}  {z.name}\n')
"

echo "OK: Built ${OUT_DIR}/${ZIP_NAME}"
echo "OK: SHA256 written next to ZIP"
