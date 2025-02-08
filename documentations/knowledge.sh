#!/bin/bash

# Set script directory as working directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$SCRIPT_DIR" || exit 1

# Configuration
OUTPUT_FILE="knowledge.md"
HEADER_FILE="_header.md"
SPECS_DIR="specifications"
KNOWLEDGE_LIST="knowledge.txt"

# Colors and formatting
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# Functions
log_info() {
    printf "%b→ %b%s%b\n" "$BLUE" "$NC" "$1" "$NC"
}

log_success() {
    printf "%b✓ %b%s%b\n" "$GREEN" "$NC" "$1" "$NC"
}

log_error() {
    printf "%b✗ %b%s%b\n" "$RED" "$NC" "$1" "$NC"
    exit 1
}

log_warning() {
    printf "%b! %b%s%b\n" "$YELLOW" "$NC" "$1" "$NC"
}

print_header() {
    printf "\n%b%s%b\n\n" "$BOLD" "$1" "$NC"
}

get_file_extension() {
    local filename=$1
    local ext="${filename##*.}"
    if [ "$ext" = "$filename" ]; then
        echo "txt"
    else
        echo "$ext"
    fi
}

process_file() {
    local file=$1
    local full_path="$PROJECT_ROOT/$file"

    if [ ! -f "$full_path" ]; then
        log_error "❌ Required file not found: $file
Please make sure this file exists at: $full_path"
    fi

    local ext=$(get_file_extension "$file")
    log_info "Processing: $file"
    {
        printf "\n### %s\n\n" "$file"
        printf "\`\`\`%s\n" "$ext"
        cat "$full_path"
        printf "\`\`\`\n"
    } >> "$OUTPUT_FILE"
    return 0
}

# Script header
print_header "📚 Generating Documentation"

# Initial cleanup
log_info "Cleaning previous file..."
rm -f "$OUTPUT_FILE"

# Add YAML frontmatter with generation date
{
    echo "---"
    echo "date: $(date '+%Y-%m-%d %H:%M:%S')"
    echo "---"
    echo ""
} > "$OUTPUT_FILE"

# Step 1: Copy header
log_info "Adding header file..."
if [ -f "$HEADER_FILE" ]; then
    cat "$HEADER_FILE" >> "$OUTPUT_FILE"
    printf "\n" >> "$OUTPUT_FILE"
    log_success "Header added successfully"
else
    log_warning "Header file not found ($HEADER_FILE)"
fi

# Step 2: Process specification files
print_header "📂 Processing Specification Files"

# Create a temporary file to store the file list
temp_file=$(mktemp)
trap 'rm -f "$temp_file"' EXIT

# Find and sort files first
find "$SPECS_DIR" -type f -name "*.md" -o -name "*.mdx" | \
    grep -v "$OUTPUT_FILE" | \
    sort > "$temp_file"

# Process specification files
count=0
while IFS= read -r file; do
    relative_path="${file#./}"
    log_info "Processing: $relative_path"
    {
        printf "\n"
        cat "$file"
        printf "\n"
    } >> "$OUTPUT_FILE"
    ((count++))
done < "$temp_file"

# Step 3: Process additional files from knowledge.txt
if [ -f "$KNOWLEDGE_LIST" ]; then
    print_header "📦 Processing Additional Files"
    printf "\n## Additional Files\n\n" >> "$OUTPUT_FILE"
    printf "> ⚠️ **IMPORTANT**: These files must be taken very seriously as they represent the latest up-to-date versions of our codebase. You MUST rely on these versions and their content imperatively.\n\n" >> "$OUTPUT_FILE"
    
    additional_count=0
    while IFS= read -r file; do
        # Skip empty lines and comments
        if [ ! -z "$file" ] && [[ ! "$file" =~ ^#.*$ ]]; then
            # Trim whitespace
            file=$(echo "$file" | xargs)
            process_file "$file"
            ((additional_count++))
        fi
    done < "$KNOWLEDGE_LIST"
else
    log_warning "Knowledge list file not found ($KNOWLEDGE_LIST)"
fi

# Summary
print_header "📊 Summary"
log_success "$count specification files processed"
[ "$additional_count" -gt 0 ] && log_success "$additional_count additional files processed"
log_success "Documentation generated in: $OUTPUT_FILE"
