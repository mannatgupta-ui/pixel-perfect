import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

out_dir = os.path.join("public", "textures")
os.makedirs(out_dir, exist_ok=True)
W, H = 1024, 512

def save_img(img, name):
    path = os.path.join(out_dir, name)
    img.save(path, quality=92)
    print(f"Generated {name} -> {path}")

# 1. Sun: golden glowing plasma with solar flares & granulation
def make_sun():
    x = np.linspace(0, 4 * np.pi, W)
    y = np.linspace(0, 2 * np.pi, H)
    X, Y = np.meshgrid(x, y)
    noise = np.sin(X * 3) * np.cos(Y * 3) + np.sin(X * 7 + Y * 5) * 0.4
    noise = (noise - noise.min()) / (noise.max() - noise.min())
    
    r = (255 * (0.95 + 0.05 * noise)).astype(np.uint8)
    g = (180 + 60 * noise).astype(np.uint8)
    b = (30 + 40 * noise).astype(np.uint8)
    rgb = np.stack([r, g, b], axis=-1)
    img = Image.fromarray(rgb).filter(ImageFilter.GaussianBlur(1))
    save_img(img, "sun.jpg")

# 2. Mercury: cratered grey-tan rocky surface
def make_mercury():
    np.random.seed(42)
    base = np.random.normal(140, 18, (H, W))
    img = Image.fromarray(np.clip(base, 80, 200).astype(np.uint8), mode='L').convert('RGB')
    draw = ImageDraw.Draw(img)
    # Add procedural craters
    for _ in range(80):
        cx, cy = np.random.randint(0, W), np.random.randint(0, H)
        rad = np.random.randint(6, 40)
        draw.ellipse([cx-rad, cy-rad, cx+rad, cy+rad], outline=(60, 60, 60), width=2)
        draw.ellipse([cx-rad+2, cy-rad+2, cx+rad-2, cy+rad-2], fill=(120, 115, 110))
    img = img.filter(ImageFilter.GaussianBlur(1.2))
    save_img(img, "mercury.jpg")

# 3. Venus: golden-ochre thick atmospheric swirling clouds
def make_venus():
    y = np.linspace(0, 1, H)[:, None]
    x = np.linspace(0, 1, W)[None, :]
    bands = np.sin(y * 24 + np.sin(x * 12) * 1.5)
    r = np.clip(225 + 25 * bands, 180, 255).astype(np.uint8)
    g = np.clip(185 + 30 * bands, 140, 220).astype(np.uint8)
    b = np.clip(115 + 25 * bands, 80, 150).astype(np.uint8)
    img = Image.fromarray(np.stack([r, g, b], axis=-1)).filter(ImageFilter.GaussianBlur(4))
    save_img(img, "venus.jpg")

# 4. Earth: deep oceans, green continents, blue atmosphere
def make_earth():
    img = Image.new('RGB', (W, H), color=(18, 48, 110))
    draw = ImageDraw.Draw(img)
    # Continents approximate shapes
    draw.polygon([(180, 120), (280, 100), (320, 220), (220, 260), (160, 200)], fill=(45, 125, 65)) # N America
    draw.polygon([(260, 270), (330, 290), (300, 420), (240, 360)], fill=(40, 115, 55)) # S America
    draw.polygon([(460, 100), (560, 90), (540, 190), (450, 170)], fill=(55, 130, 60)) # Europe
    draw.polygon([(450, 200), (570, 210), (540, 380), (460, 330)], fill=(160, 135, 75)) # Africa
    draw.polygon([(560, 80), (820, 90), (840, 260), (620, 270)], fill=(50, 120, 60)) # Asia
    draw.polygon([(740, 330), (850, 340), (830, 440), (730, 420)], fill=(170, 120, 65)) # Australia
    draw.rectangle([(0, 0), (W, 40)], fill=(240, 248, 255)) # Arctic
    draw.rectangle([(0, H-45), (W, H)], fill=(240, 248, 255)) # Antarctica
    # Clouds
    clouds = np.random.normal(0, 40, (H, W))
    img = img.filter(ImageFilter.GaussianBlur(6))
    save_img(img, "earth.jpg")

# 5. Moon: realistic grey lunar maria & highlands
def make_moon():
    np.random.seed(101)
    base = np.random.normal(160, 25, (H, W))
    img = Image.fromarray(np.clip(base, 60, 220).astype(np.uint8), mode='L').convert('RGB')
    draw = ImageDraw.Draw(img)
    # Maria (dark basaltic plains)
    draw.ellipse([300, 140, 480, 300], fill=(75, 75, 75)) # Mare Imbrium / Serenitatis
    draw.ellipse([500, 170, 620, 290], fill=(70, 70, 70)) # Mare Tranquillitatis
    draw.ellipse([200, 180, 340, 360], fill=(80, 80, 80)) # Oceanus Procellarum
    img = img.filter(ImageFilter.GaussianBlur(10))
    save_img(img, "moon.jpg")

# 6. Mars: rust red/orange iron-oxide deserts, dark volcanic Syrtis Major, white polar ice
def make_mars():
    x = np.linspace(0, 1, W)
    y = np.linspace(0, 1, H)
    X, Y = np.meshgrid(x, y)
    base_r = (185 + 30 * np.sin(X * 6) * np.cos(Y * 4)).astype(np.uint8)
    base_g = (75 + 15 * np.sin(X * 6) * np.cos(Y * 4)).astype(np.uint8)
    base_b = (40 + 10 * np.cos(Y * 4)).astype(np.uint8)
    img = Image.fromarray(np.stack([base_r, base_g, base_b], axis=-1))
    draw = ImageDraw.Draw(img)
    # Syrtis Major & dark volcanic plains
    draw.polygon([(460, 190), (550, 220), (520, 340), (440, 310)], fill=(75, 30, 18))
    draw.ellipse([220, 260, 380, 360], fill=(95, 40, 22)) # Valles Marineris / Chryse
    # Polar ice caps
    draw.rectangle([(0, 0), (W, 28)], fill=(245, 240, 235))
    draw.rectangle([(0, H-28), (W, H)], fill=(245, 240, 235))
    img = img.filter(ImageFilter.GaussianBlur(5))
    save_img(img, "mars.jpg")

# 7. Jupiter: prominent gas bands + Great Red Spot
def make_jupiter():
    x = np.linspace(0, 1, W)
    y = np.linspace(0, 1, H)
    X, Y = np.meshgrid(x, y)
    bands = np.sin(Y * 36 + np.sin(X * 8) * 0.4)
    r = np.clip(195 + 45 * bands, 140, 240).astype(np.uint8)
    g = np.clip(140 + 35 * bands, 90, 180).astype(np.uint8)
    b = np.clip(95 + 30 * bands, 60, 130).astype(np.uint8)
    img = Image.fromarray(np.stack([r, g, b], axis=-1))
    draw = ImageDraw.Draw(img)
    # Great Red Spot
    draw.ellipse([580, 280, 680, 340], fill=(185, 55, 35))
    draw.ellipse([595, 290, 665, 330], fill=(210, 80, 50))
    img = img.filter(ImageFilter.GaussianBlur(3))
    save_img(img, "jupiter.jpg")

# 8. Saturn: golden-ochre banded atmosphere
def make_saturn():
    y = np.linspace(0, 1, H)
    bands = np.tile(np.sin(y * 42)[:, None], (1, W))
    r = np.clip(215 + 25 * bands, 180, 245).astype(np.uint8)
    g = np.clip(185 + 25 * bands, 150, 215).astype(np.uint8)
    b = np.clip(135 + 20 * bands, 100, 160).astype(np.uint8)
    img = Image.fromarray(np.stack([r, g, b], axis=-1)).filter(ImageFilter.GaussianBlur(2.5))
    save_img(img, "saturn.jpg")

# 9. Saturn Ring: concentric stripes with transparency (PNG)
def make_saturn_ring():
    ring_w, ring_h = 512, 64
    arr = np.zeros((ring_h, ring_w, 4), dtype=np.uint8)
    x = np.linspace(0, 1, ring_w)
    for i in range(ring_w):
        val = x[i]
        # Cassini division gap around 0.65 - 0.72
        if 0.65 < val < 0.72:
            alpha = 20
        else:
            alpha = int(180 + 70 * math.sin(val * 40))
        arr[:, i, 0] = 210
        arr[:, i, 1] = 185
        arr[:, i, 2] = 140
        arr[:, i, 3] = max(0, min(255, alpha))
    img = Image.fromarray(arr, mode='RGBA')
    img.save(os.path.join(out_dir, "saturn-ring.png"))
    print("Generated saturn-ring.png")

# 10. Uranus: pale cyan ice giant
def make_uranus():
    y = np.linspace(0, 1, H)
    bands = np.tile((np.sin(y * 12) * 8)[:, None], (1, W))
    r = np.clip(160 + bands, 140, 180).astype(np.uint8)
    g = np.clip(210 + bands, 190, 230).astype(np.uint8)
    b = np.clip(220 + bands, 200, 240).astype(np.uint8)
    img = Image.fromarray(np.stack([r, g, b], axis=-1)).filter(ImageFilter.GaussianBlur(3))
    save_img(img, "uranus.jpg")

# 11. Neptune: deep azure blue ice giant
def make_neptune():
    y = np.linspace(0, 1, H)
    bands = np.tile((np.sin(y * 16) * 12)[:, None], (1, W))
    r = np.clip(45 + bands, 30, 70).astype(np.uint8)
    g = np.clip(95 + bands, 70, 130).astype(np.uint8)
    b = np.clip(200 + bands, 170, 235).astype(np.uint8)
    img = Image.fromarray(np.stack([r, g, b], axis=-1)).filter(ImageFilter.GaussianBlur(3))
    save_img(img, "neptune.jpg")

if __name__ == "__main__":
    make_sun()
    make_mercury()
    make_venus()
    make_earth()
    make_moon()
    make_mars()
    make_jupiter()
    make_saturn()
    make_saturn_ring()
    make_uranus()
    make_neptune()
    print("All planet textures successfully generated into public/textures/!")
