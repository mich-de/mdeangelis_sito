from PIL import Image, ImageDraw

def create_logo_v2():
    # Setup
    W, H = 1000, 800
    bg_color = (34, 40, 49, 255) # #222831
    img = Image.new("RGBA", (W, H), bg_color)
    draw = ImageDraw.Draw(img)
    
    # Style
    stroke_width = 18
    
    # Colors
    c_peach = (222, 160, 124, 255) # #DEA07C
    c_grey = (160, 160, 160, 255)  # #A0A0A0
    c_white = (255, 255, 255, 255) # #FFFFFF
    
    # Coordinates Strategy:
    # The logo consists of 3 main "peaks" or loops.
    # 1. Peach (Left): A tall loop with a circle at the bottom.
    # 2. Grey (Middle): A peak that seems to go BEHIND the others? Or interlocks?
    # 3. White (Right): A triangle with a loop at the bottom right corner.
    
    # Let's define the peaks.
    # Base Y line approx: 600
    # Top Y line approx: 200
    
    # --- PEACH (Left) ---
    # Shape: effectively a paperclip or hairpin.
    # Left leg: (250, 600) -> (400, 200)
    # Right leg: (350, 600) -> (450, 200) ??
    # Actually looking at the image:
    # It's a U-turn at the bottom left.
    # Center of bottom circle approx (250, 600). Radius approx 50.
    # Leg 1 goes up-right from (200, 600) to (350, 200)
    # Leg 2 goes up-right from (300, 600) to (400, 200) ? 
    # Let's try to match angles.
    
    # Let's use a thicker line drawing helper
    def draw_line(p1, p2, col):
        draw.line([p1, p2], fill=col, width=stroke_width)
        # Add round caps manually if needed, or use joint='curve' in newer PIL
        # draw.ellipse([p1[0]-w/2, p1[1]-w/2, p1[0]+w/2, p1[1]+w/2], fill=col)

    # PEACH
    # Bottom arc center: (280, 600). Radius: 50.
    # Angle of legs: approx 60 degrees from horizontal? 
    # Let's define points.
    p_bot_center = (280, 650)
    p_radius = 60
    
    # It looks like a "racetrack" oval shape tilted.
    # Let's draw the two parallel lines first.
    # Vector (X, Y) = (150, -400) -> Length ~427
    
    start_l = (220, 650) # Left tangent point of bottom arc
    end_l   = (370, 250) # Top left peak
    
    start_r = (340, 650) # Right tangent point of bottom arc
    end_r   = (430, 350) # Shorter leg on right? No, looks like it goes down.
    
    # Re-analyzing the Peach shape:
    # It goes DOWN from top-left, loops at bottom-left, goes UP to middle.
    # Point 1 (Top Left Start): (380, 250)
    # Point 2 (Down to Bottom Left): (230, 650)
    # Arc at Bottom Left
    # Point 3 (Up to Middle): (330, 380)
    
    # Actually, looking at the reference "logo_symbol.png":
    # The Peach shape is on the LEFT.
    # It has a circle at the bottom.
    # Lines go UP and RIGHT.
    
    # Let's trace the visible Peach lines:
    # Line A (Left): Starts at bottom circle (left side), goes up to a sharp peak.
    # Line B (Right): Starts at bottom circle (right side), goes up parallel to Line A, but stops or turns?
    
    # Let's try this geometry:
    # Peak 1 (Peach): (360, 220)
    # Bottom 1 (Peach Circle Center): (260, 600)
    
    dx = 100 # Width between parallel lines of the loop
    
    # Peach Path
    # 1. Outer Loop
    # Left Line: (210, 600) -> (360, 220)
    draw.line([(210, 600), (360, 220)], fill=c_peach, width=stroke_width)
    # Right Line: (310, 600) -> (410, 350) ... it seems to weave.
    draw.line([(310, 600), (460, 220)], fill=c_peach, width=stroke_width) # Wait, it's a peak.
    
    # Connection at top?
    draw.line([(360, 220), (410, 350)], fill=c_peach, width=stroke_width) # Just a test line
    
    # Bottom Circle
    bbox_circle = [210, 550, 310, 650] # Center (260, 600), R=50
    draw.ellipse(bbox_circle, outline=c_peach, width=stroke_width)
    
    # --- WHITE (Right) ---
    # Triangle shape.
    # Peak: (550, 200)
    # Base: (450, 600) to (650, 600)
    
    draw.line([(450, 600), (550, 200)], fill=c_white, width=stroke_width)
    draw.line([(550, 200), (650, 600)], fill=c_white, width=stroke_width)
    draw.line([(450, 600), (650, 600)], fill=c_white, width=stroke_width)
    
    img.save("logo_symbol_v2.png")

if __name__ == "__main__":
    create_logo_v2()
