import cv2
import numpy as np

def remove_background_and_crop(image_path, output_path):
    try:
        # Load the image
        img = cv2.imread(image_path)
        if img is None:
            print(f"Error: Could not load image at {image_path}")
            return

        # Convert to RGBA
        img_bgra = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

        # distinct colors in the image?
        # The user provided a JPG, so the "transparency" might be white or checkerboard.
        # Assuming white or near-white background for now given "remove background" request.
        # Or identifying the bronze lines.
        
        # Simple thresholding for now to identifying dark lines on light background
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Threshold to create a mask. Invert if lines are dark.
        # Bronze lines are somewhat dark, background is likely light.
        _, mask = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY_INV)
        
        # Set alpha channel based on mask
        img_bgra[:, :, 3] = mask

        # Save
        cv2.imwrite(output_path, img_bgra)
        print(f"Saved processed image to {output_path}")

    except Exception as e:
        print(f"Error processing image: {e}")

if __name__ == "__main__":
    # This is a placeholder script. 
    # Since I cannot easily process the specific uploaded JPG (checkerboard) without more complex logic,
    # I will primarily rely on generate_image tool. 
    # This script is just a fallback idea if generation fails or if I need to process the result.
    pass
