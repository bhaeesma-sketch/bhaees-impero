file_path = "client/src/components/virtual-tryon/VirtualTryOn.tsx"

with open(file_path, "r") as f:
    content = f.read()

content = content.replace(
    '''<Button
                                variant="ghost"
                                size="icon"
                                onClick={prevProduct}
                                className="text-white hover:bg-white/20"
                            >''',
    '''<Button
                                variant="ghost"
                                size="icon"
                                aria-label="Previous product"
                                onClick={prevProduct}
                                className="text-white hover:bg-white/20"
                            >'''
)

content = content.replace(
    '''<Button
                                variant="ghost"
                                size="icon"
                                onClick={nextProduct}
                                className="text-white hover:bg-white/20"
                            >''',
    '''<Button
                                variant="ghost"
                                size="icon"
                                aria-label="Next product"
                                onClick={nextProduct}
                                className="text-white hover:bg-white/20"
                            >'''
)

with open(file_path, "w") as f:
    f.write(content)
