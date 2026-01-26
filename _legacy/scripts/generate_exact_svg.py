from PIL import Image

def image_to_svg_pixel_perfect(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    # SVG Header
    svg_content = [f'<svg width="{width}" height="{height}" viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">']
    svg_content.append(f'<rect width="{width}" height="{height}" fill="#222831"/>') # Background
    
    # Colors to target (approximate, with tolerance)
    # Peach: (222, 160, 124)
    # Grey: (160, 160, 160)
    # White: (255, 255, 255)
    
    target_colors = {
        "peach": (222, 160, 124),
        "grey": (160, 160, 160),
        "white": (255, 255, 255)
    }
    
    # Scan pixels
    # Optimization: We can group horizontal runs of pixels into <rect>s to reduce file size significantly
    
    current_color = None
    run_start_x = -1
    
    # Helper to check color match with tolerance
    def match_color(pixel, target, tol=30):
        r, g, b, a = pixel
        if a < 50: return False # Transparent
        tr, tg, tb = target
        return abs(r-tr) < tol and abs(g-tg) < tol and abs(b-tb) < tol

    for y in range(height):
        for x in range(width):
            pixel = pixels[x, y]
            
            matched_key = None
            for key, val in target_colors.items():
                if match_color(pixel, val):
                    matched_key = key
                    break
            
            # Simple pixel plotting for now (rect 1x1) - can be optimized if needed
            if matched_key:
                hex_col = ""
                if matched_key == "peach": hex_col = "#DEA07C"
                elif matched_key == "grey": hex_col = "#A0A0A0"
                elif matched_key == "white": hex_col = "#FFFFFF"
                
                # To keep it efficient, only draw if valid
                svg_content.append(f'<rect x="{x}" y="{y}" width="1" height="1" fill="{hex_col}" />')
                
    svg_content.append('</svg>')
    
    with open(output_path, "w") as f:
        f.write("\n".join(svg_content))
        
    print(f"SVG generated at {output_path}")

if __name__ == "__main__":
    image_to_svg_pixel_perfect("D:\\python\\mdeangelis_sito\\assets\\logo_symbol.png", "D:\\python\\mdeangelis_sito\\assets\\logo_symbol_exact.svg")
