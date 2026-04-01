file_path = "client/src/components/virtual-tryon/ui/PhotoCapture.tsx"

with open(file_path, "r") as f:
    content = f.read()

content = content.replace(
    '''<Button
                            onClick={onClose}
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 text-white hover:bg-black/20 rounded-full z-20"
                        >''',
    '''<Button
                            onClick={onClose}
                            variant="ghost"
                            size="icon"
                            aria-label="Close"
                            className="absolute top-2 right-2 text-white hover:bg-black/20 rounded-full z-20"
                        >'''
)

with open(file_path, "w") as f:
    f.write(content)
