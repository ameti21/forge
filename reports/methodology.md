# Methodology

## Data collection

All URLs in the sample index were collected through manual browsing of publicly visible W3Schools navigation pages. No automated tools were used.

### Process

1. Visit W3Schools main navigation hubs (tutorials, references, exercises, quizzes, tools)
2. Record each hub URL along with classification metadata
3. Validate entries against the taxonomy schema
4. Review for compliance (no page content stored)

## Classification

Each URL is classified along three dimensions:

- Content type: What kind of page is it? (hub, lesson, reference, exercise, quiz, tool)
- Category: Which top-level section does it belong to? (tutorials, references, exercises, quizzes, tools)
- Topic: What technology or subject does it cover? (html, css, javascript, python, sql, etc.)

## Validation

The build pipeline includes an automated compliance validator that checks:

- No HTML content files outside the generated site
- No full HTML documents embedded in data or report files
- Schema validation for all data files

## Reproducibility

The entire build is reproducible from source using Python 3.11+ with no external dependencies. All scripts use Python standard library only.

## Ethical considerations

- W3Schools Terms of Service are respected at all stages
- Automated fetching is disabled by default with a hard guardrail
- A permission request email template is provided for those seeking expanded access
- Takedown and DMCA response procedures are documented
