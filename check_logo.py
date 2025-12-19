from PIL import Image
import numpy as np
import sys

def check_transparency(image_path):
    try:
        img = Image.open(image_path).convert("RGBA")
        width, height = img.size
        print(f"Image dimensions: {width}x{height}")
        
        pixels = np.array(img)
        alpha = pixels[:, :, 3]
        
        # Check top rows
        top_empty = 0
        for y in range(height):
            if np.any(alpha[y] > 0):
                break
            top_empty += 1
            
        print(f"Top empty rows: {top_empty}")
        
        # Check bottom rows
        bottom_empty = 0
        for y in range(height - 1, -1, -1):
            if np.any(alpha[y] > 0):
                break
            bottom_empty += 1
            
        print(f"Bottom empty rows: {bottom_empty}")

        # Check left cols
        left_empty = 0
        for x in range(width):
            if np.any(alpha[:, x] > 0):
                break
            left_empty += 1
            
        print(f"Left empty columns: {left_empty}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    check_transparency(sys.argv[1])
