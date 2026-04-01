import re

file_path = "client/src/pages/admin.tsx"

with open(file_path, "r") as f:
    content = f.read()

# Add import
import_statement = 'import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";\n'

# Find the right place to insert the import (after the Dialog import)
import_dialog = 'import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";\n'
content = content.replace(import_dialog, import_dialog + import_statement)

# Remove the native confirm dialog
content = content.replace('if (!confirm("Delete this product?")) return;', '')

# Replace the delete button with the AlertDialog structure
old_delete_btn = '<Button size="icon" variant="secondary" className="h-8 w-8 bg-black/80 text-red-400 hover:bg-red-500 hover:text-white" onClick={() => handleDelete(product.id)}>'

new_delete_structure = """<AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="icon" variant="secondary" className="h-8 w-8 bg-black/80 text-red-400 hover:bg-red-500 hover:text-white">
"""

content = content.replace(old_delete_btn, new_delete_structure)

old_delete_btn_end = '</Button>\n                  </div>'

new_delete_btn_end = """</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the product from the catalog.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(product.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>"""

content = content.replace(old_delete_btn_end, new_delete_btn_end)


with open(file_path, "w") as f:
    f.write(content)
