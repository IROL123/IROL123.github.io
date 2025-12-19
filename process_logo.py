from PIL import Image
import numpy as np
import sys

def process_image(input_path, output_path):
    try:
        img = Image.open(input_path).convert("RGBA")
        datas = img.getdata()
        
        newData = []
        for item in datas:
            # Aggressive white removal:
            # If it's effectively white/light grey, make it transparent
            # Logic: If R, G, B are all high (> 200), treat as background
            if item[0] > 200 and item[1] > 200 and item[2] > 200:
                newData.append((255, 255, 255, 0))
            # Also if alpha is very low, kill it
            elif item[3] < 50:
                 newData.append((255, 255, 255, 0))
            else:
                newData.append(item)
        
        img.putdata(newData)
        
        # Now find bbox again
        bbox = img.getbbox()
        if bbox:
            img = img.crop(bbox)
        else:
            print("Error: Image is empty after processing")
            return

        # Now lets try to cut off the text at the bottom again
        # We assume the logo part is the top connected component roughly.
        # Let's verify if we need to split.
        # Based on previous robust logic:
        width, height = img.size
        pixels = np.array(img)
        alpha = pixels[:, :, 3]
        
        # Horizontal projection
        horizontal_projection = np.any(alpha > 0, axis=1)
        
        # Heuristic: Find the largest gap?
        # Or simply: The icon is the top block.
        
        # Scan for first block of content
        start_y = 0
        for y in range(len(horizontal_projection)):
            if horizontal_projection[y]:
                start_y = y
                break
                
        # Continue until gap
        end_y = height
        gap_started = False
        
        for y in range(start_y, len(horizontal_projection)):
            if not horizontal_projection[y]:
                if not gap_started:
                    gap_started = True 
                    end_y = y # Potential end
            else:
                if gap_started:
                    # We found content AFTER a gap.
                    # If the gap was significant (e.g. > 5 pixels), then the previous end_y was the split.
                    # If gap was tiny, maybe just noise.
                    # Let's assume text is separate enough.
                    pass
        
        # The above logic is a bit flaky if there's noise.
        # Let's simplify: split based on vertical gap of at least 5px.
        
        final_split = height
        current_gap = 0
        in_first_block = False
        
        for y in range(len(horizontal_projection)):
            has_content = horizontal_projection[y]
            
            if has_content:
                in_first_block = True
                current_gap = 0
            else:
                if in_first_block:
                    current_gap += 1
                    if current_gap > 10: # If we see > 10px gap, assume we passed the icon
                        final_split = y - current_gap
                        break
        
        img_cropped = img.crop((0, 0, width, final_split))
        
        # Final tight crop
        final_bbox = img_cropped.getbbox()
        if final_bbox:
            img_cropped = img_cropped.crop(final_bbox)
            
        img_cropped.save(output_path, "PNG")
        print(f"Processed to {output_path} with size {img_cropped.size}")

    except Exception as e:
        print(f"Error processing image: {e}")
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: process_logo.py <input_path> <output_path>")
        sys.exit(1)
        
    process_image(sys.argv[1], sys.argv[2])
