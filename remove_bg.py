from PIL import Image
import numpy as np

def remove_black_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    data = np.array(img)
    
    # Define what is "black" (can adjust threshold if needed)
    # Here we say anything close to RGB(0,0,0) is transparent
    r, g, b, a = data.T
    
    # Create mask: where R, G, B are all < 10 (very dark)
    black_areas = (r < 15) & (g < 15) & (b < 15)
    
    # Set Alpha channel to 0 for black areas
    data[..., 3][black_areas.T] = 0
    
    img = Image.fromarray(data)
    img.save(output_path, "PNG")
    print(f"Saved transparent logo to {output_path}")

input_file = r"C:\Users\mdeangelis\.gemini\antigravity\brain\91fbcc74-430d-4f3c-bb2d-094867bb1f9e\logo_recreation_black_bg_v2_1769431246079.png"
output_file = r"C:\Users\mdeangelis\.gemini\antigravity\brain\91fbcc74-430d-4f3c-bb2d-094867bb1f9e\logo_transparent.png"

remove_black_background(input_file, output_file)
