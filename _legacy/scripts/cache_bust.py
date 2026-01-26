import re
import os

file_path = 'index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Update existing version tags text/css?v=1.0 -> 1.1, same for js
content = re.sub(r'\?v=1\.0', '?v=1.1', content)

# Add version tags to images if not present
# Matches .png" or .jpg" or .svg" where not followed by ?v=
def add_version(match):
    return match.group(0)[:-1] + '?v=1.1"'

content = re.sub(r'\.png"(?!\?v=)', add_version, content)
content = re.sub(r'\.jpg"(?!\?v=)', add_version, content)
# Not doing svg for now as they might be inline or different, keeping to png/jpg as per request generally

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated index.html with version v=1.1")
