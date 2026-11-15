import math
from PIL import Image, ImageDraw, ImageFilter

def generate_rocket_icon():
    # Render at 512x512 supersampled for crystal-clear antialiasing
    base_size = 512
    img = Image.new("RGBA", (base_size, base_size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Rocket pointing diagonally from bottom-left (140, 372) to top-right (372, 140)
    # Center of rocket body ~ (256, 256)
    # Angle is 45 degrees (-45 deg from standard orientation)

    # 1. Jet Propulsion Exhaust Plumes (flames)
    flame_outer = [
        (190, 322),
        (130, 360),
        (70, 430),
        (60, 452),
        (82, 442),
        (152, 382),
        (190, 420),
        (205, 410),
        (222, 354)
    ]
    # Draw glowing plume
    draw.polygon(flame_outer, fill=(239, 68, 68, 250)) # Bright Orange-Red

    flame_mid = [
        (185, 330),
        (135, 370),
        (95, 420),
        (90, 435),
        (105, 430),
        (160, 385),
        (190, 405),
        (215, 360)
    ]
    draw.polygon(flame_mid, fill=(249, 115, 22, 255)) # Orange

    flame_core = [
        (185, 335),
        (140, 375),
        (120, 405),
        (135, 400),
        (170, 380),
        (195, 395),
        (210, 360)
    ]
    draw.polygon(flame_core, fill=(253, 224, 71, 255)) # Bright Core Yellow

    # 2. Left and Right Booster Fins
    # Bottom-left fin
    fin_left = [
        (190, 270),
        (135, 290),
        (110, 345),
        (120, 360),
        (175, 345),
        (220, 320)
    ]
    draw.polygon(fin_left, fill=(225, 29, 72, 255)) # Crimson Red

    # Bottom-right fin
    fin_right = [
        (270, 190),
        (290, 135),
        (345, 110),
        (360, 120),
        (345, 175),
        (320, 220)
    ]
    draw.polygon(fin_right, fill=(225, 29, 72, 255)) # Crimson Red

    # 3. Main Thruster Nozzle
    nozzle = [
        (185, 315),
        (225, 355),
        (205, 375),
        (165, 335)
    ]
    draw.polygon(nozzle, fill=(71, 85, 105, 255)) # Slate dark ring

    # 4. Rocket Fuselage (Aerodynamic capsule body)
    # Nose at (420, 92), base around (200, 330)
    # Symmetrical along diagonal line x + y = 512
    fuselage = [
        (425, 87),   # Nose tip
        (395, 100),
        (340, 135),
        (280, 185),
        (225, 245),
        (190, 310),  # Base left
        (205, 325),  # Base center
        (225, 340),  # Base right
        (310, 190),
        (375, 135),
        (412, 117)
    ]
    draw.polygon(fuselage, fill=(248, 250, 252, 255)) # Crisp Titanium White

    # Center Dorsal Fin / Stripe
    dorsal_fin = [
        (260, 260),
        (220, 300),
        (215, 330),
        (230, 315),
        (270, 275)
    ]
    draw.polygon(dorsal_fin, fill=(239, 68, 68, 255)) # Red accent fin

    # Nose Cone Accent (Red cap)
    nose_cap = [
        (425, 87),
        (390, 102),
        (410, 122)
    ]
    draw.polygon(nose_cap, fill=(225, 29, 72, 255)) # Crimson cap

    # 5. Porthole Window (Cyber cyan / Deep space glass)
    # Center around (325, 187)
    window_center = (325, 187)
    r_outer = 32
    r_inner = 24
    draw.ellipse([
        window_center[0] - r_outer, window_center[1] - r_outer,
        window_center[0] + r_outer, window_center[1] + r_outer
    ], fill=(51, 65, 85, 255), outline=(203, 213, 225, 255), width=4)

    draw.ellipse([
        window_center[0] - r_inner, window_center[1] - r_inner,
        window_center[0] + r_inner, window_center[1] + r_inner
    ], fill=(14, 165, 233, 255)) # Cyan glass

    # Window Reflection Specular Highlight
    draw.ellipse([
        window_center[0] - 14, window_center[1] - 18,
        window_center[0] - 4, window_center[1] - 8
    ], fill=(255, 255, 255, 220))

    # Save multi-size ICO
    sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
    ico_images = [img.resize(s, Image.Resampling.LANCZOS) for s in sizes]
    ico_images[0].save(
        "public/favicon.ico",
        format="ICO",
        sizes=sizes,
        append_images=ico_images[1:]
    )
    print("Saved public/favicon.ico successfully!")

    # Save PNG versions
    img.resize((32, 32), Image.Resampling.LANCZOS).save("public/favicon-32x32.png", format="PNG")
    img.resize((180, 180), Image.Resampling.LANCZOS).save("public/apple-touch-icon.png", format="PNG")
    print("Saved public/favicon-32x32.png and public/apple-touch-icon.png!")

if __name__ == "__main__":
    generate_rocket_icon()
