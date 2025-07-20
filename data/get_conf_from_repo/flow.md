# LLM Powered Python Scraper to get configs from repos.

## Assuming we have all files of repo

*Glob Patterns to Include*:

```
docs/*, *.md, *.txt, *.yaml, *.yml, *.toml, *.html, metadata.json
```

*Glob Patterns to Exclude*:

```
assets/*, data/*, examples/*, images/*, public/*, static/*, temp/*, venv/*, .venv/*, *test*, tests/*, v1/*, dist/*, build/*, experimental/*, deprecated/*, misc/*, legacy/*, .git/*, .github/*, .next/*, .vscode/*, obj/*, bin/*, node_modules/*, *.log, *.rst, *.rs, Dockerfile, Makefile, *.py, *.js, *.jsx, *.ts, *.tsx, *.go, *.java, *.pyi, *.pyx, *.c, *.cc, *.cpp, *.h,
```

> Also exclude files >~150kb

---

## Iteratively read and analyze files for documentation

