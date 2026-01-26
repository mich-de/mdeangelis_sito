from PIL import Image
import os

def remove_dark_bg(image_path, output_path):
    try:
        img = Image.open(image_path).convert("RGBA")
        datas = img.getdata()

        new_data = []
        for item in datas:
            # Check for dark pixels (near-black background)
            if item[0] < 50 and item[1] < 50 and item[2] < 50:
                new_data.append((0, 0, 0, 0))  # Make transparent
            else:
                new_data.append(item)

        img.putdata(new_data)
        img.save(output_path, "PNG")
        print(f"Processed: {output_path}")
    except Exception as e:
        print(f"Error: {e}")

# Process the typography image
remove_dark_bg("assets/ref_typography.png", "assets/ref_typography_clean.png")
print("Done!")
