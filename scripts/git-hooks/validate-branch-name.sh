#!/bin/bash

LC_ALL=C

# Get the current branch name
branch=$(git rev-parse --abbrev-ref HEAD)

# Allow main branch and feature branches
if [[ "$branch" == "main" ]]; then
    exit 0
fi

valid_branch_regex="^(feature|fix|docs|chore|refactor|test)/[a-z0-9-]+$"

if [[ ! $branch =~ $valid_branch_regex ]]
then
    echo "🚫 Branch name '$branch' is not valid"
    echo "Branch names must:"
    echo "- Be 'main' OR"
    echo "- Start with: feature/, fix/, docs/, chore/, refactor/, or test/"
    echo "- Followed by lowercase letters, numbers, and hyphens only"
    echo ""
    echo "Example: feature/user-authentication"
    exit 1
fi

exit 0
