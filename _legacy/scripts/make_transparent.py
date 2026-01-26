from PIL import Image
import os

def remove_white_bg(image_path):
    try:
        img = Image.open(image_path).convert("RGBA")
        datas = img.getdata()

        new_data = []
        for item in datas:
            # Check for white or near-white pixels
            if item[0] > 240 and item[1] > 240 and item[2] > 240:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)

        img.putdata(new_data)
        img.save(image_path, "PNG")
        print(f"Processed: {image_path}")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")

assets_dir = "assets"
if not os.path.exists(assets_dir):
    print("Assets directory not found.")
    exit()

print(f"Scanning {assets_dir} for icons...")
for filename in os.listdir(assets_dir):
    if filename.startswith("icon_") and filename.endswith(".png"):
        file_path = os.path.join(assets_dir, filename)
        remove_white_bg(file_path)
print("Processing complete.")
