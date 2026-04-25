import sys

filepath = 'client/src/components/layout/header.tsx'
with open(filepath, 'r') as f:
    lines = f.readlines()

new_lines = []
for i, line in enumerate(lines):
    # Mobile Menu Button
    if '<button' in line and 'className="md:hidden p-2 hover:bg-gray-50 rounded-full transition-colors z-50"' in lines[i+1]:
        new_lines.append(line.replace('<button', '<button aria-label="Open mobile menu"'))
        new_lines.append(lines[i+1].replace('transition-colors z-50"', 'transition-colors z-50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"'))
        continue
    if 'className="md:hidden p-2 hover:bg-gray-50 rounded-full transition-colors z-50"' in line and '<button' in lines[i-1]:
        continue # handled above

    # Search Button
    if '<button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary">' in line:
        new_lines.append(line.replace('<button className="', '<button aria-label="Search" className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none '))
        continue

    # User Account Button
    if '<button className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-600 hover:text-primary relative group">' in line:
        new_lines.append(line.replace('<button className="', '<button aria-label="User account menu" className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none '))
        continue

    # Close Menu Button
    if '<button onClick={() => setIsMobileMenuOpen(false)}>' in line:
        new_lines.append(line.replace('<button ', '<button aria-label="Close menu" className="focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none rounded-full" '))
        continue

    new_lines.append(line)

with open(filepath, 'w') as f:
    f.writelines(new_lines)
print("Done patching header.tsx")
