# GitHub MCP Server Usage Guide

Comprehensive guide for using GitHub MCP Server operations with Claude Code.

## Table of Contents

- [Repository Operations](#repository-operations)
- [Branch Operations](#branch-operations)
- [File Operations](#file-operations)
- [Issue Operations](#issue-operations)
- [Pull Request Operations](#pull-request-operations)
- [Search Operations](#search-operations)
- [User Operations](#user-operations)
- [Common Workflows](#common-workflows)

---

## Repository Operations

### Create Repository

```javascript
mcp__github__create_repository({
  name: "repo-name",
  description: "Repository description",
  private: false,
  autoInit: true  // Initialize with README
})
```

**Response**: `{ id, url }`

### Fork Repository

```javascript
mcp__github__fork_repository({
  owner: "original-owner",
  repo: "repo-name",
  organization: "target-org"  // Optional
})
```

---

## Branch Operations

### List Branches

```javascript
mcp__github__list_branches({
  owner: "owner",
  repo: "repo",
  page: 1,
  perPage: 30
})
```

**Response**: Array of `{ name, sha, protected }`

### Create Branch

```javascript
mcp__github__create_branch({
  owner: "owner",
  repo: "repo",
  branch: "feature/new-feature",
  from_branch: "main"  // Source branch
})
```

---

## File Operations

### Get File Contents

```javascript
mcp__github__get_file_contents({
  owner: "owner",
  repo: "repo",
  path: "src/index.js",
  ref: "main"  // Optional branch/tag/commit
})
```

### Push Multiple Files

```javascript
mcp__github__push_files({
  owner: "owner",
  repo: "repo",
  branch: "main",
  message: "Commit message",
  files: [
    { path: "src/file1.js", content: "// content" },
    { path: "src/file2.js", content: "// content" }
  ]
})
```

### Create or Update Single File

```javascript
mcp__github__create_or_update_file({
  owner: "owner",
  repo: "repo",
  path: "path/to/file.js",
  content: "file content",
  message: "commit message",
  branch: "main",
  sha: "existing-file-sha"  // Required for updates
})
```

### Delete File

```javascript
mcp__github__delete_file({
  owner: "owner",
  repo: "repo",
  path: "path/to/file.js",
  message: "Delete file",
  branch: "main"
})
```

---

## Issue Operations

### Create Issue

```javascript
mcp__github__issue_write({
  method: "create",
  owner: "owner",
  repo: "repo",
  title: "Issue title",
  body: "Issue description with **markdown**",
  labels: ["bug", "enhancement"],
  assignees: ["username"]
})
```

### Update Issue

```javascript
mcp__github__issue_write({
  method: "update",
  owner: "owner",
  repo: "repo",
  issue_number: 1,
  title: "Updated title",
  state: "closed",
  state_reason: "completed"  // completed | not_planned | duplicate
})
```

### Get Issue Details

```javascript
mcp__github__issue_read({
  method: "get",  // get | get_comments | get_labels | get_sub_issues
  owner: "owner",
  repo: "repo",
  issue_number: 1
})
```

### List Issues

```javascript
mcp__github__list_issues({
  owner: "owner",
  repo: "repo",
  state: "OPEN",  // OPEN | CLOSED
  labels: ["bug"],
  orderBy: "CREATED_AT",
  direction: "DESC",
  perPage: 10
})
```

### Add Comment to Issue

```javascript
mcp__github__add_issue_comment({
  owner: "owner",
  repo: "repo",
  issue_number: 1,
  body: "Comment text with **markdown**"
})
```

---

## Pull Request Operations

### Create Pull Request

```javascript
mcp__github__create_pull_request({
  owner: "owner",
  repo: "repo",
  title: "PR title",
  head: "feature-branch",
  base: "main",
  body: "## Summary\n- Change 1\n- Change 2",
  draft: false
})
```

### Get PR Details

```javascript
mcp__github__pull_request_read({
  method: "get",  // get | get_diff | get_status | get_files | get_comments | get_reviews | get_review_comments
  owner: "owner",
  repo: "repo",
  pullNumber: 1
})
```

**Available methods**:
| Method | Description |
|--------|-------------|
| `get` | Full PR details |
| `get_diff` | Diff content |
| `get_status` | CI/CD status |
| `get_files` | Changed files list |
| `get_comments` | General comments |
| `get_reviews` | Review submissions |
| `get_review_comments` | Line-specific review comments |

### Update Pull Request

```javascript
mcp__github__update_pull_request({
  owner: "owner",
  repo: "repo",
  pullNumber: 1,
  title: "Updated title",
  body: "Updated description",
  state: "closed",  // open | closed
  draft: false,
  reviewers: ["reviewer1", "reviewer2"]
})
```

### Merge Pull Request

```javascript
mcp__github__merge_pull_request({
  owner: "owner",
  repo: "repo",
  pullNumber: 1,
  merge_method: "squash",  // merge | squash | rebase
  commit_title: "feat: Add feature (#1)",
  commit_message: "Detailed description"
})
```

### List Pull Requests

```javascript
mcp__github__list_pull_requests({
  owner: "owner",
  repo: "repo",
  state: "open",  // open | closed | all
  sort: "created",  // created | updated | popularity | long-running
  direction: "desc",
  base: "main",
  perPage: 10
})
```

### PR Review Workflow

```javascript
// 1. Create pending review
mcp__github__pull_request_review_write({
  method: "create",
  owner: "owner",
  repo: "repo",
  pullNumber: 1,
  commitID: "sha"
})

// 2. Add comments to pending review
mcp__github__add_comment_to_pending_review({
  owner: "owner",
  repo: "repo",
  pullNumber: 1,
  path: "src/file.js",
  line: 10,
  body: "Consider refactoring this",
  side: "RIGHT",
  subjectType: "LINE"
})

// 3. Submit the review
mcp__github__pull_request_review_write({
  method: "submit_pending",
  owner: "owner",
  repo: "repo",
  pullNumber: 1,
  event: "APPROVE",  // APPROVE | REQUEST_CHANGES | COMMENT
  body: "LGTM!"
})
```

---

## Search Operations

### Search Issues

```javascript
mcp__github__search_issues({
  query: "repo:owner/repo is:open label:bug",
  sort: "created",
  order: "desc",
  perPage: 10
})
```

### Search Pull Requests

```javascript
mcp__github__search_pull_requests({
  query: "repo:owner/repo is:open author:username",
  sort: "updated",
  order: "desc"
})
```

### Search Code

```javascript
mcp__github__search_code({
  query: "function repo:owner/repo language:javascript",
  perPage: 10
})
```

### Search Repositories

```javascript
mcp__github__search_repositories({
  query: "topic:react stars:>1000",
  sort: "stars",
  order: "desc"
})
```

### Search Users

```javascript
mcp__github__search_users({
  query: "location:tokyo followers:>100",
  sort: "followers"
})
```

---

## User Operations

### Get Authenticated User

```javascript
mcp__github__get_me()
```

**Response**: User profile with login, id, name, email, etc.

### Get Team Members

```javascript
mcp__github__get_team_members({
  org: "organization",
  team_slug: "team-name"
})
```

---

## Commit Operations

### List Commits

```javascript
mcp__github__list_commits({
  owner: "owner",
  repo: "repo",
  sha: "main",  // Branch, tag, or commit SHA
  author: "username",
  perPage: 30
})
```

### Get Commit Details

```javascript
mcp__github__get_commit({
  owner: "owner",
  repo: "repo",
  sha: "commit-sha",
  include_diff: true
})
```

---

## Release & Tag Operations

### List Releases

```javascript
mcp__github__list_releases({
  owner: "owner",
  repo: "repo",
  perPage: 10
})
```

### Get Latest Release

```javascript
mcp__github__get_latest_release({
  owner: "owner",
  repo: "repo"
})
```

### Get Release by Tag

```javascript
mcp__github__get_release_by_tag({
  owner: "owner",
  repo: "repo",
  tag: "v1.0.0"
})
```

### List Tags

```javascript
mcp__github__list_tags({
  owner: "owner",
  repo: "repo",
  perPage: 10
})
```

---

## Common Workflows

### 1. Feature Development Workflow

```javascript
// 1. Create feature branch
mcp__github__create_branch({ branch: "feature/new-feature", from_branch: "main" })

// 2. Push changes
mcp__github__push_files({ branch: "feature/new-feature", files: [...] })

// 3. Create issue for tracking
mcp__github__issue_write({ method: "create", title: "Implement new feature" })

// 4. Create PR
mcp__github__create_pull_request({ head: "feature/new-feature", base: "main" })

// 5. Add comment to PR
mcp__github__add_issue_comment({ issue_number: prNumber, body: "Ready for review" })

// 6. Merge when approved
mcp__github__merge_pull_request({ pullNumber: prNumber, merge_method: "squash" })
```

### 2. Bug Fix Workflow

```javascript
// 1. Create issue
mcp__github__issue_write({ method: "create", title: "Bug: ...", labels: ["bug"] })

// 2. Create fix branch
mcp__github__create_branch({ branch: "fix/bug-description" })

// 3. Push fix
mcp__github__push_files({ branch: "fix/bug-description", files: [...] })

// 4. Create PR linking to issue
mcp__github__create_pull_request({ body: "Fixes #issueNumber" })

// 5. Merge and close
mcp__github__merge_pull_request({ pullNumber })
mcp__github__issue_write({ method: "update", state: "closed", state_reason: "completed" })
```

### 3. Code Review Workflow

```javascript
// 1. Get PR diff and files
mcp__github__pull_request_read({ method: "get_diff", pullNumber })
mcp__github__pull_request_read({ method: "get_files", pullNumber })

// 2. Create review with comments
mcp__github__pull_request_review_write({ method: "create", pullNumber })
mcp__github__add_comment_to_pending_review({ path, line, body })

// 3. Submit review
mcp__github__pull_request_review_write({ method: "submit_pending", event: "APPROVE" })
```

---

## Pagination

Most list operations support pagination:

```javascript
{
  page: 1,        // Page number (min: 1)
  perPage: 30     // Results per page (max: 100)
}
```

For cursor-based pagination (GraphQL):

```javascript
{
  after: "cursor",  // From previous response's pageInfo.endCursor
  perPage: 30
}
```

---

## Error Handling

Common error scenarios:

| Error | Cause | Solution |
|-------|-------|----------|
| 404 | Resource not found | Verify owner/repo/number |
| 403 | Permission denied | Check access token permissions |
| 422 | Validation error | Check required parameters |
| 409 | Conflict | Resource already exists or merge conflict |

---

## Best Practices

1. **Use `list_*` for broad retrieval**, `search_*` for specific queries
2. **Paginate large results** with batches of 5-10 items
3. **Use `minimal_output: true`** when full details aren't needed
4. **Check for existing issues** before creating new ones
5. **Use labels consistently** for organization
6. **Link PRs to issues** with "Fixes #N" or "Closes #N"
7. **Use squash merge** for cleaner history
8. **Request reviews** using `update_pull_request` with `reviewers`

---

## Quick Reference

| Operation | Tool |
|-----------|------|
| Create repo | `create_repository` |
| Create branch | `create_branch` |
| Push files | `push_files` |
| Create issue | `issue_write` (method: create) |
| Update issue | `issue_write` (method: update) |
| Close issue | `issue_write` (state: closed) |
| Create PR | `create_pull_request` |
| Get PR diff | `pull_request_read` (method: get_diff) |
| Merge PR | `merge_pull_request` |
| Add comment | `add_issue_comment` |
| Search issues | `search_issues` |
| Search code | `search_code` |
| Get user info | `get_me` |
