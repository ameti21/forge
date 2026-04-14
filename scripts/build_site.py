#!/usr/bin/env python3
"""Build a polished static site for IndexKit research deliverables."""
import argparse
import json
from pathlib import Path

HTML_TEMPLATE = r"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>IndexKit — W3Schools Research Deliverables | forge.ameti.one</title>
  <meta name="description" content="Compliance-first research index kit for W3Schools URL metadata. No content is scraped or redistributed." />
  <style>
    :root {{
      --bg: #0a0a0b;
      --surface: #141416;
      --border: #27272a;
      --text: #fafafa;
      --text-muted: #a1a1aa;
      --accent: #6d5dfc;
      --accent-hover: #8b7dff;
      --green: #22c55e;
      --amber: #f59e0b;
      --red: #ef4444;
    }}
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
    body {{
      font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      min-height: 100vh;
    }}
    .container {{ max-width: 960px; margin: 0 auto; padding: 2rem 1.5rem; }}

    /* Hero */
    .hero {{
      text-align: center;
      padding: 4rem 0 3rem;
      border-bottom: 1px solid var(--border);
      margin-bottom: 3rem;
    }}
    .hero h1 {{
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: -0.03em;
      margin-bottom: 0.75rem;
      background: linear-gradient(135deg, var(--accent), #a78bfa);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }}
    .hero .subtitle {{
      color: var(--text-muted);
      font-size: 1.1rem;
      max-width: 600px;
      margin: 0 auto 1.5rem;
    }}
    .badge {{
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      background: rgba(34, 197, 94, 0.1);
      border: 1px solid rgba(34, 197, 94, 0.3);
      color: var(--green);
      padding: 0.35rem 0.85rem;
      border-radius: 999px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }}
    .badge::before {{ content: "\\2713\\0020"; }}

    /* Cards grid */
    .grid {{
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.25rem;
      margin-bottom: 2.5rem;
    }}
    .card {{
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.5rem;
      transition: border-color 0.2s, box-shadow 0.2s;
    }}
    .card:hover {{
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent), 0 4px 20px rgba(109, 93, 252, 0.1);
    }}
    .card h2 {{
      font-size: 1.1rem;
      font-weight: 600;
      margin-bottom: 0.75rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }}
    .card ul {{ list-style: none; }}
    .card li {{ margin-bottom: 0.4rem; }}
    .card a {{
      color: var(--accent);
      text-decoration: none;
      font-size: 0.95rem;
    }}
    .card a:hover {{ color: var(--accent-hover); text-decoration: underline; }}
    .card p {{ color: var(--text-muted); font-size: 0.9rem; }}

    /* Stats row */
    .stats {{
      display: flex;
      gap: 2rem;
      justify-content: center;
      margin-bottom: 3rem;
      flex-wrap: wrap;
    }}
    .stat {{
      text-align: center;
    }}
    .stat .number {{
      font-size: 2rem;
      font-weight: 700;
      color: var(--accent);
    }}
    .stat .label {{
      font-size: 0.8rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }}

    /* Data table */
    .table-wrap {{
      overflow-x: auto;
      margin-bottom: 2.5rem;
    }}
    table {{
      width: 100%;
      border-collapse: collapse;
      font-size: 0.9rem;
    }}
    th, td {{
      text-align: left;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--border);
    }}
    th {{
      color: var(--text-muted);
      font-weight: 600;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }}
    td {{ color: var(--text); }}
    tr:hover {{ background: rgba(109, 93, 252, 0.04); }}

    /* Section */
    .section-title {{
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 1.25rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid var(--border);
    }}

    /* Footer */
    footer {{
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid var(--border);
      text-align: center;
      color: var(--text-muted);
      font-size: 0.85rem;
    }}
    footer a {{ color: var(--accent); text-decoration: none; }}
    footer a:hover {{ text-decoration: underline; }}

    /* Compliance banner */
    .compliance {{
      background: rgba(245, 158, 11, 0.08);
      border: 1px solid rgba(245, 158, 11, 0.25);
      border-radius: 10px;
      padding: 1rem 1.5rem;
      margin-bottom: 2.5rem;
      font-size: 0.9rem;
      color: var(--amber);
    }}
    .compliance strong {{ color: #fbbf24; }}
  </style>
</head>
<body>
  <div class="container">
    <header class="hero">
      <h1>IndexKit</h1>
      <p class="subtitle">
        Compliance-first research index for W3Schools URL metadata.
        No content scraped. No content redistributed.
      </p>
      <span class="badge">Compliance verified</span>
    </header>

    <div class="compliance">
      <strong>Compliance note:</strong> This site ships only URL-level sample metadata.
      No W3Schools tutorial text, images, or code is redistributed.
      Automated fetching is disabled by default.
    </div>

    <div class="stats">
      <div class="stat">
        <div class="number">{entry_count}</div>
        <div class="label">Index entries</div>
      </div>
      <div class="stat">
        <div class="number">{category_count}</div>
        <div class="label">Categories</div>
      </div>
      <div class="stat">
        <div class="number">{content_type_count}</div>
        <div class="label">Content types</div>
      </div>
      <div class="stat">
        <div class="number">v0.1.0</div>
        <div class="label">Version</div>
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <h2>&#128196; Reports</h2>
        <ul>
          <li><a href="reports/executive-summary.html">Executive Summary</a></li>
          <li><a href="reports/full-report.html">Full Report</a></li>
          <li><a href="reports/methodology.html">Methodology</a></li>
          <li><a href="reports/sources.html">Sources</a></li>
        </ul>
      </div>
      <div class="card">
        <h2>&#128202; Sample Data</h2>
        <ul>
          <li><a href="data/index.sample.json">Index (JSON)</a></li>
          <li><a href="data/taxonomy.sample.json">Taxonomy (JSON)</a></li>
        </ul>
        <p style="margin-top:0.5rem">URL metadata only &mdash; no page content</p>
      </div>
      <div class="card">
        <h2>&#128274; Legal &amp; Compliance</h2>
        <ul>
          <li><a href="legal/disclaimer.html">Disclaimer</a></li>
          <li><a href="legal/takedown-policy.html">Takedown Policy</a></li>
          <li><a href="legal/privacy.html">Privacy Policy</a></li>
        </ul>
      </div>
      <div class="card">
        <h2>&#128230; Release</h2>
        <p>Download the latest release ZIP with full reports, data, schemas, and deployment configs.</p>
        <p style="margin-top:0.75rem"><a href="https://github.com/jetameti/forge/releases">GitHub Releases &rarr;</a></p>
      </div>
    </div>

    <h2 class="section-title">Sample Index Data</h2>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>URL</th>
            <th>Category</th>
            <th>Type</th>
            <th>Discovered</th>
          </tr>
        </thead>
        <tbody>
          {table_rows}
        </tbody>
      </table>
    </div>

    <h2 class="section-title">Taxonomy Overview</h2>
    <div class="grid">
      {taxonomy_cards}
    </div>

    <footer>
      <p>IndexKit v0.1.0 &middot; Built {build_date} &middot; <a href="https://github.com/jetameti/forge">Source on GitHub</a></p>
      <p style="margin-top:0.5rem">Not affiliated with W3Schools. MIT License for original code.</p>
    </footer>
  </div>
</body>
</html>
"""

REPORT_TEMPLATE = r"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>{title} — IndexKit</title>
  <style>
    :root {{ --bg: #0a0a0b; --surface: #141416; --border: #27272a; --text: #fafafa; --text-muted: #a1a1aa; --accent: #6d5dfc; }}
    * {{ margin: 0; padding: 0; box-sizing: border-box; }}
    body {{ font-family: 'Inter', system-ui, sans-serif; background: var(--bg); color: var(--text); line-height: 1.7; }}
    .container {{ max-width: 760px; margin: 0 auto; padding: 2rem 1.5rem; }}
    h1 {{ font-size: 2rem; margin-bottom: 1rem; }}
    h2 {{ font-size: 1.4rem; margin: 2rem 0 0.75rem; border-bottom: 1px solid var(--border); padding-bottom: 0.4rem; }}
    h3 {{ font-size: 1.1rem; margin: 1.5rem 0 0.5rem; }}
    p {{ margin-bottom: 1rem; color: var(--text-muted); }}
    ul, ol {{ margin: 0.5rem 0 1rem 1.5rem; color: var(--text-muted); }}
    li {{ margin-bottom: 0.3rem; }}
    a {{ color: var(--accent); text-decoration: none; }}
    a:hover {{ text-decoration: underline; }}
    code {{ background: var(--surface); padding: 0.15rem 0.4rem; border-radius: 4px; font-size: 0.9em; }}
    .back {{ display: inline-block; margin-bottom: 2rem; color: var(--accent); font-size: 0.9rem; }}
  </style>
</head>
<body>
  <div class="container">
    <a class="back" href="/">&larr; Back to IndexKit</a>
    {content}
  </div>
</body>
</html>
"""


def build_table_rows(index_data: list[dict]) -> str:
    rows = []
    for entry in index_data:
        url = entry.get("url", "")
        short_url = url.replace("https://www.w3schools.com", "")
        rows.append(
            f'          <tr><td><code>{short_url}</code></td>'
            f'<td>{entry.get("category", "")}</td>'
            f'<td>{entry.get("content_type", "")}</td>'
            f'<td>{entry.get("discovered_at", "")}</td></tr>'
        )
    return "\n".join(rows)


def build_taxonomy_cards(taxonomy: dict) -> str:
    cards = []
    for cat in taxonomy.get("categories", []):
        topics = ", ".join(cat.get("topics", [])[:6])
        if len(cat.get("topics", [])) > 6:
            topics += ", ..."
        cards.append(
            f'      <div class="card">\n'
            f'        <h2>{cat["label"]}</h2>\n'
            f'        <p>{cat["description"]}</p>\n'
            f'        <p style="margin-top:0.5rem;font-size:0.85rem;color:var(--text-muted)">Topics: {topics}</p>\n'
            f'      </div>'
        )
    return "\n".join(cards)


def build_report_page(title: str, md_path: Path) -> str:
    """Convert a simple markdown to HTML (basic conversion without external deps)."""
    if md_path.exists():
        text = md_path.read_text(encoding="utf-8")
    else:
        text = f"# {title}\n\nContent coming soon."

    # Very basic markdown-to-HTML conversion (no external deps)
    html_lines = []
    for line in text.split("\n"):
        stripped = line.strip()
        if stripped.startswith("### "):
            html_lines.append(f"<h3>{stripped[4:]}</h3>")
        elif stripped.startswith("## "):
            html_lines.append(f"<h2>{stripped[3:]}</h2>")
        elif stripped.startswith("# "):
            html_lines.append(f"<h1>{stripped[2:]}</h1>")
        elif stripped.startswith("- "):
            html_lines.append(f"<li>{stripped[2:]}</li>")
        elif stripped == "":
            html_lines.append("")
        else:
            html_lines.append(f"<p>{stripped}</p>")

    content = "\n    ".join(html_lines)
    return REPORT_TEMPLATE.format(title=title, content=content)


def main() -> int:
    ap = argparse.ArgumentParser(description="Build IndexKit static site")
    ap.add_argument("--out", required=True, help="Output directory for static site build")
    args = ap.parse_args()

    out = Path(args.out)
    (out / "assets").mkdir(parents=True, exist_ok=True)
    (out / "data").mkdir(parents=True, exist_ok=True)
    (out / "reports").mkdir(parents=True, exist_ok=True)
    (out / "legal").mkdir(parents=True, exist_ok=True)

    # Load sample data
    index_path = Path("data/samples/index.sample.jsonl")
    index_data = []
    if index_path.exists():
        for line in index_path.read_text(encoding="utf-8").splitlines():
            if line.strip():
                index_data.append(json.loads(line.strip()))

    taxonomy_path = Path("data/samples/taxonomy.sample.json")
    taxonomy = {}
    if taxonomy_path.exists():
        taxonomy = json.loads(taxonomy_path.read_text(encoding="utf-8"))

    # Write data files for the site
    (out / "data" / "index.sample.json").write_text(
        json.dumps(index_data, indent=2), encoding="utf-8"
    )
    (out / "data" / "taxonomy.sample.json").write_text(
        json.dumps(taxonomy, indent=2), encoding="utf-8"
    )

    # Build index.html
    table_rows = build_table_rows(index_data)
    taxonomy_cards = build_taxonomy_cards(taxonomy)
    from datetime import date
    build_date = date.today().isoformat()

    html = HTML_TEMPLATE.format(
        entry_count=len(index_data),
        category_count=len(taxonomy.get("categories", [])),
        content_type_count=len(taxonomy.get("content_types", [])),
        table_rows=table_rows,
        taxonomy_cards=taxonomy_cards,
        build_date=build_date,
    )
    (out / "index.html").write_text(html, encoding="utf-8")

    # Build report pages
    reports = {
        "Executive Summary": "reports/executive-summary",
        "Full Report": "reports/full-report",
        "Methodology": "reports/methodology",
        "Sources": "reports/sources",
    }
    for title, base in reports.items():
        md_path = Path(f"{base}.md")
        page_html = build_report_page(title, md_path)
        html_name = Path(base).name + ".html"
        (out / "reports" / html_name).write_text(page_html, encoding="utf-8")

    # Build legal pages
    legal_pages = {
        "Disclaimer": ("legal/DISCLAIMER.md", "disclaimer.html"),
        "Takedown Policy": ("legal/TAKEDOWN_POLICY.md", "takedown-policy.html"),
        "Privacy Policy": ("PRIVACY.md", "privacy.html"),
    }
    for title, (md_src, html_name) in legal_pages.items():
        md_path = Path(md_src)
        page_html = build_report_page(title, md_path)
        (out / "legal" / html_name).write_text(page_html, encoding="utf-8")

    print(f"OK: Built static site to {out} ({len(list(out.rglob('*')))} files)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
