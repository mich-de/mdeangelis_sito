from PIL import Image
import os

def remove_dark_bg_aggressive(image_path, output_path, threshold=60):
    """Remove dark background with adjustable threshold"""
    try:
        img = Image.open(image_path).convert("RGBA")
        datas = img.getdata()

        new_data = []
        for item in datas:
            # Check for dark pixels (near-black/dark gray background)
            if item[0] < threshold and item[1] < threshold and item[2] < threshold:
                new_data.append((0, 0, 0, 0))  # Make transparent
            else:
                new_data.append(item)

        img.putdata(new_data)
        img.save(output_path, "PNG")
        print(f"Processed: {output_path}")
    except Exception as e:
        print(f"Error: {e}")

# Process the logo with aggressive threshold
remove_dark_bg_aggressive("assets/logo_symbol.png", "assets/logo_symbol_transparent.png", threshold=70)
print("Done!")
