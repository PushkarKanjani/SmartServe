import os
from PIL import Image

assets_dir = 'docs/assets'
os.makedirs(assets_dir, exist_ok=True)

# 1. Prepare booking modal crop from user screenshot
modal_src = r'C:/Users/Asus/.gemini/antigravity/brain/266bf0da-5bfe-4fe9-86cc-084a693058f6/.user_uploaded/media_1793640367301_ced5c0c5.jpg'
if os.path.exists(modal_src):
    im = Image.open(modal_src)
    # The modal is in the center
    # Size: (1024, 544). Modal is roughly x: 370 to 650, y: 70 to 520
    w, h = im.size
    crop_box = (int(w * 0.36), int(h * 0.12), int(w * 0.64), int(h * 0.96))
    cropped_modal = im.crop(crop_box)
    cropped_modal.save(os.path.join(assets_dir, 'booking_modal_crop.png'))
    print("Saved booking_modal_crop.png")

# 2. Prepare localization crop from user screenshot
loc_src = r'C:/Users/Asus/.gemini/antigravity/brain/266bf0da-5bfe-4fe9-86cc-084a693058f6/.user_uploaded/media_1793610634642_ad4c62c0.jpg'
if os.path.exists(loc_src):
    im2 = Image.open(loc_src)
    w2, h2 = im2.size
    # Center service banner & Gujarati cards
    crop_box2 = (int(w2 * 0.27), int(h2 * 0.12), int(w2 * 0.85), int(h2 * 0.88))
    cropped_loc = im2.crop(crop_box2)
    cropped_loc.save(os.path.join(assets_dir, 'gujarati_service_crop.png'))
    print("Saved gujarati_service_crop.png")
