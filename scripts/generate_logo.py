from PIL import Image, ImageDraw

def create_logo():
    # Settings
    width, height = 1000, 1000
    bg_color = (34, 40, 49, 0) # Transparent background
    
    # Colors
    color_peach = (222, 160, 124, 255)
    color_grey = (160, 160, 160, 255)
    color_white = (255, 255, 255, 255)
    
    img = Image.new("RGBA", (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    
    line_width = 40
    
    # Left Shape (Peach)
    # A loop shape: Starts mid-bottom, goes up to a peak, comes down, curves at bottom
    # Path: (250, 700) -> (350, 300) -> (450, 550) ...
    # Let's try to match the image: 
    # It looks like a U-bend at bottom left.
    draw.arc([150, 650, 350, 850], 0, 180, fill=color_peach, width=line_width) # Bottom curve
    draw.line([(150, 750), (350, 350)], fill=color_peach, width=line_width) # Left vertical-ish
    draw.line([(350, 750), (450, 350)], fill=color_peach, width=line_width) # Right vertical-ish
    
    # Middle Shape (Grey)
    # A simple peak
    draw.line([(350, 600), (500, 300), (650, 600)], fill=color_grey, width=line_width)
    
    # Right Shape (White)
    # Triangle with loop
    draw.line([(550, 750), (700, 350), (850, 750), (550, 750)], fill=color_white, width=line_width)
    # Loop at bottom right
    draw.ellipse([780, 700, 920, 840], outline=color_white, width=line_width)

    # Save
    img.save("logo_symbol_clean.png")

if __name__ == "__main__":
    create_logo()
