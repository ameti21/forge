# Full Report: W3Schools Index Research

## Overview

This report documents the structure, methodology, and deliverables of the IndexKit project — a compliance-first approach to cataloging publicly known W3Schools URL metadata.

## Problem statement

W3Schools is one of the largest web development tutorial sites, covering HTML, CSS, JavaScript, Python, SQL, and dozens of other technologies. Researchers and educators benefit from understanding the structure and scope of this content, but W3Schools' Terms of Service explicitly prohibit automated crawling and scraping.

## Our approach

Rather than scraping, we take a manual curation approach:

- Catalog publicly known hub URLs by hand
- Classify each URL by content type, category, and topic
- Store only URL-level metadata (no page content)
- Provide a taxonomy for organizing the index
- Ship with guardrails that prevent accidental automated fetching

## Deliverables

### 1. Sample index data

A JSONL/CSV dataset of representative W3Schools URLs with classification metadata. Each entry contains:

- URL
- Hostname
- Content type (hub, lesson, reference, exercise, quiz, tool)
- Category (tutorials, references, exercises, quizzes, tools)
- Topic (e.g., html, css, javascript, python)
- Discovery method (manual, import, permissioned_fetch)
- Discovery date

### 2. Content taxonomy

A JSON taxonomy defining the categories, content types, and topic areas used to classify URLs.

### 3. Static documentation site

A deployable static site presenting the research findings, sample data, and compliance documentation.

### 4. Build and release pipeline

Python scripts and CI/CD workflows to reproducibly build, validate, package, and deploy the kit.

## Limitations

- The sample data is intentionally small (representative only)
- No W3Schools page content is included
- Automated expansion of the index requires written permission from W3Schools
- This is a research tool, not a mirror or proxy for W3Schools

## Future work

- Pursue written permission from W3Schools for controlled metadata indexing
- Expand taxonomy with finer-grained topic classification
- Add diff reporting to track URL changes over time
- Consider integration with learning management systems
