#!/bin/zsh

# Set script directory as working directory
SCRIPT_DIR=${0:a:h}
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Source zsh profile to get environment variables and PATH
if [ -f "$HOME/.zshrc" ]; then
    source "$HOME/.zshrc"
fi

cd "$SCRIPT_DIR" || exit 1

# Configuration
OUTPUT_FILE="$SCRIPT_DIR/knowledge.md"
HEADER_FILE="$SCRIPT_DIR/_header.md"
SPECS_DIR="specifications"
KNOWLEDGE_LIST="$SCRIPT_DIR/knowledge.txt"

# Initialize counters
count=0
additional_count=0

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
    local pattern=$1
    
    cd "$PROJECT_ROOT"
    # Use zsh globbing
    for file in $~pattern; do
        if [ -f "$file" ]; then
            local relative_path="${file#./}"
            local full_path="$PROJECT_ROOT/$relative_path"
            local ext=$(get_file_extension "$relative_path")
            log_info "Processing: $relative_path"
            {
                printf "\n### %s\n\n" "$relative_path"
                printf "\`\`\`\`%s\n" "$ext"
                cat "$full_path"
                printf "\n\`\`\`\`\n"
            } >> "$OUTPUT_FILE"
        fi
    done
    cd "$SCRIPT_DIR"
    
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

# Create specifications directory if it doesn't exist
if [ ! -d "$SPECS_DIR" ]; then
    mkdir -p "$SPECS_DIR"
    log_info "Created specifications directory"
fi

# Process specification files using zsh globbing
cd "$SPECS_DIR"
for file in **/*.{md,mdx}(N.); do
    if [ -f "$file" ]; then
        log_info "Processing: $file"
        {
            cat "$file"
            printf "\n"
        } >> "$OUTPUT_FILE"
        ((count++))
    fi
done
cd "$SCRIPT_DIR"

# Step 3: Process additional files from knowledge.txt
if [ ! -f "$KNOWLEDGE_LIST" ]; then
    # Create knowledge.txt if it doesn't exist
    touch "$KNOWLEDGE_LIST"
    echo "# Add files to include in the documentation" > "$KNOWLEDGE_LIST"
    echo "# Example:" >> "$KNOWLEDGE_LIST"
    echo "# .cursor/rules/*.mdc" >> "$KNOWLEDGE_LIST"
    echo "# apps/backend/package.json" >> "$KNOWLEDGE_LIST"
    log_info "Created $KNOWLEDGE_LIST template file"
fi

if [ -f "$KNOWLEDGE_LIST" ]; then
    print_header "📦 Processing Additional Files"
    printf "\n## Additional Files\n\n" >> "$OUTPUT_FILE"
    printf "> ⚠️ **IMPORTANT**: These files must be taken very seriously as they represent the latest up-to-date versions of our codebase. You MUST rely on these versions and their content imperatively.\n\n" >> "$OUTPUT_FILE"
    
    while IFS= read -r file; do
        # Skip empty lines and comments
        if [ ! -z "$file" ] && [[ ! "$file" =~ ^#.*$ ]]; then
            # Trim whitespace
            file=$(echo "$file" | xargs)
            process_file "$file"
            ((additional_count++))
        fi
    done < "$KNOWLEDGE_LIST"
fi

# Add project structure at the end
print_header "🌳 Project Structure"
{
    printf "\n### Project Structure\n\n"
    printf "\`\`\`\`text\n"
    cd "$PROJECT_ROOT" && aidd-tree "dist|build|coverage|archives|.DS_Store"
    printf "\`\`\`\`\n\n"
} >> "$OUTPUT_FILE"
log_success "Project structure added successfully"

# Summary
print_header "📊 Summary"
log_success "$count specification files processed"
[ "$additional_count" -gt 0 ] && log_success "$additional_count additional files processed"
log_success "Documentation generated in: $OUTPUT_FILE"

# Add timestamp at the end of the file
printf "\n%s\n" "$(date '+%Y-%m-%d %H:%M:%S')" >> "$OUTPUT_FILE"
