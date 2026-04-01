file_path = "client/src/pages/admin.tsx"

with open(file_path, "r") as f:
    content = f.read()

# Add aria-label to Edit button
content = content.replace(
    '<Button size="icon" variant="secondary" className="h-8 w-8 bg-black/80 text-white hover:bg-primary hover:text-black" onClick={() => openEditDialog(product)}>',
    '<Button aria-label="Edit product" size="icon" variant="secondary" className="h-8 w-8 bg-black/80 text-white hover:bg-primary hover:text-black" onClick={() => openEditDialog(product)}>'
)

# Add aria-label to Delete button
content = content.replace(
    '<Button size="icon" variant="secondary" className="h-8 w-8 bg-black/80 text-red-400 hover:bg-red-500 hover:text-white">',
    '<Button aria-label="Delete product" size="icon" variant="secondary" className="h-8 w-8 bg-black/80 text-red-400 hover:bg-red-500 hover:text-white">'
)


with open(file_path, "w") as f:
    f.write(content)
