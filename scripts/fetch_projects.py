#!/usr/bin/env python3
"""Fetch the projects that are published from their own repositories.

    python3 scripts/fetch_projects.py            # fetch what is missing or outdated
    python3 scripts/fetch_projects.py --force    # re-fetch everything

Large, separately maintained builds (like the 360° tour) are not committed to
this repository: each one is pinned below to an exact commit of its source
repo and downloaded into site/projects/<name>/ whenever the site is built
(CI, the host upload, Netlify, and `npm run deploy`). Only the build folder is
downloaded (shallow, sparse and without unrelated files), so it stays quick.

Private source repos: set PROJECTS_TOKEN to a token that can read them (a
fine-grained PAT with "Contents: read"). It is sent as an HTTP header through
the environment, so it never lands in a URL, a git config file or the process
list. Without it, git fetches anonymously (fine for public repos).

To update a project: change `ref` to the new full commit SHA and commit.
The downloaded folders are git-ignored.
"""

from __future__ import annotations

import argparse
import base64
import os
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE_PROJECTS = ROOT / "site" / "projects"
STAMPS = ROOT / ".cache" / "projects"

PROJECTS = {
    "bda-mcu-phrae": {
        "repo": "https://github.com/kittiphunr/BDA-MCU-PHRAE",
        "ref": "c8970fc8a8e40b34caeaa95e174fbbe62b38d720",  # full 40-character SHA
        "path": "deploy/dist",
    },
}


def git_env() -> dict[str, str]:
    """Environment for git, adding PROJECTS_TOKEN as a Basic auth header when set."""
    env = dict(os.environ, GIT_TERMINAL_PROMPT="0")
    token = os.environ.get("PROJECTS_TOKEN", "").strip()
    if token:
        basic = base64.b64encode(f"x-access-token:{token}".encode()).decode()
        env.update(
            GIT_CONFIG_COUNT="1",
            GIT_CONFIG_KEY_0="http.https://github.com/.extraheader",
            GIT_CONFIG_VALUE_0=f"AUTHORIZATION: basic {basic}",
        )
    return env


def run(*cmd: str, cwd: Path | None = None) -> None:
    subprocess.run(cmd, cwd=cwd, check=True, stdout=subprocess.DEVNULL, env=git_env())


def fetch(name: str, spec: dict[str, str], force: bool) -> None:
    dest = SITE_PROJECTS / name
    stamp = STAMPS / f"{name}.ref"
    if not force and (dest / "index.html").is_file() and stamp.is_file() and stamp.read_text().strip() == spec["ref"]:
        print(f"{name}: already at {spec['ref'][:7]}")
        return

    with tempfile.TemporaryDirectory() as tmp:
        work = Path(tmp)
        run("git", "init", "-q", cwd=work)
        run("git", "remote", "add", "origin", spec["repo"], cwd=work)
        run("git", "sparse-checkout", "set", "--no-cone", f"/{spec['path']}/", cwd=work)
        run("git", "fetch", "-q", "--depth", "1", "--filter=blob:none", "origin", spec["ref"], cwd=work)
        run("git", "-c", "advice.detachedHead=false", "checkout", "-q", "FETCH_HEAD", cwd=work)
        src = work / spec["path"]
        if not (src / "index.html").is_file():
            raise SystemExit(f"{name}: {spec['path']}/index.html not found at {spec['ref'][:7]}")
        if dest.exists():
            shutil.rmtree(dest)
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copytree(src, dest)

    STAMPS.mkdir(parents=True, exist_ok=True)
    stamp.write_text(spec["ref"] + "\n")
    print(f"{name}: fetched {spec['ref'][:7]} -> {dest.relative_to(ROOT)}")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--force", action="store_true", help="download again even if up to date")
    args = ap.parse_args()
    try:
        for name, spec in PROJECTS.items():
            fetch(name, spec, args.force)
    except subprocess.CalledProcessError as e:
        print(f"ERROR: {' '.join(e.cmd[:3])} failed (exit {e.returncode})", file=sys.stderr)
        if not os.environ.get("PROJECTS_TOKEN"):
            print("Hint: private source repos need PROJECTS_TOKEN (see the docstring).", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
