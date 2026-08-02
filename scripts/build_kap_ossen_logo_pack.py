"""Build approved raster derivatives from the Kap Ossen logo source images.

The flat source is already background-extracted. The 3D source is an opaque
ceremonial treatment. This script never invents or redraws the crest; it only
resizes, crops and flattens approved source artwork.
"""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
SOURCE_DIR = ROOT / "brand-source" / "kap-ossen"
OUTPUT_DIR = ROOT / "public" / "brand" / "kap-ossen"

FLAT_SOURCE = SOURCE_DIR / "ko-crest-flat-transparent-source-v1.png"
THREE_D_SOURCE = SOURCE_DIR / "ko-crest-3d-source-v1.png"

PLUM = (24, 5, 34, 255)
IVORY = (255, 253, 249, 255)


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as file:
        for block in iter(lambda: file.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest().upper()


def contain(image: Image.Image, size: int, padding_ratio: float = 0.04) -> Image.Image:
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    usable = max(1, round(size * (1 - padding_ratio * 2)))
    copy = image.copy()
    copy.thumbnail((usable, usable), Image.Resampling.LANCZOS)
    x = (size - copy.width) // 2
    y = (size - copy.height) // 2
    canvas.alpha_composite(copy, (x, y))
    return canvas


def central_monogram(image: Image.Image) -> Image.Image:
    """Crop the central ceremonial disc for small-size header/icon use."""
    width, height = image.size
    # The master includes an outer twelve-node orbit. Small icons use only the
    # complete central medallion so no partial nodes are clipped at the edge.
    edge = round(min(width, height) * 0.61)
    left = (width - edge) // 2
    top = (height - edge) // 2
    crop = image.crop((left, top, left + edge, top + edge))
    circle = Image.new("L", crop.size, 0)
    ImageDraw.Draw(circle).ellipse((2, 2, edge - 3, edge - 3), fill=255)
    crop.putalpha(ImageChops.multiply(crop.getchannel("A"), circle))
    return crop


def flatten(image: Image.Image, color: tuple[int, int, int, int], size: int) -> Image.Image:
    transparent = contain(image, size)
    background = Image.new("RGBA", transparent.size, color)
    background.alpha_composite(transparent)
    return background.convert("RGB")


def save_png(image: Image.Image, name: str) -> Path:
    path = OUTPUT_DIR / name
    image.save(path, format="PNG", optimize=True)
    return path


def save_webp(image: Image.Image, name: str) -> Path:
    path = OUTPUT_DIR / name
    image.save(path, format="WEBP", lossless=True, method=6)
    return path


def save_jpeg(image: Image.Image, name: str) -> Path:
    path = OUTPUT_DIR / name
    image.convert("RGB").save(path, format="JPEG", quality=92, optimize=True, progressive=True)
    return path


def build() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    flat = Image.open(FLAT_SOURCE).convert("RGBA")
    three_d = Image.open(THREE_D_SOURCE).convert("RGBA")
    monogram = central_monogram(flat)

    produced: list[Path] = []

    produced.append(save_png(flat, "ko-crest-primary-transparent.png"))
    produced.append(save_png(contain(flat, 1024), "ko-crest-primary-transparent-1024.png"))
    produced.append(save_webp(contain(flat, 1024), "ko-crest-primary-transparent-1024.webp"))

    for size in (512, 256, 128, 64, 32):
        produced.append(save_png(contain(monogram, size, 0.06), f"ko-monogram-{size}.png"))

    produced.append(save_webp(contain(monogram, 512, 0.06), "ko-monogram-512.webp"))
    produced.append(save_png(contain(monogram, 512, 0.06), "ko-monogram-header-512.png"))
    produced.append(save_webp(contain(monogram, 256, 0.06), "ko-monogram-header-256.webp"))
    produced.append(save_png(contain(monogram, 180, 0.08), "ko-apple-touch-icon-180.png"))
    produced.append(save_png(contain(monogram, 512, 0.08), "ko-app-icon-512.png"))

    produced.append(save_jpeg(flatten(flat, PLUM, 1200), "ko-crest-flat-plum-1200.jpg"))
    produced.append(save_jpeg(flatten(flat, IVORY, 1200), "ko-crest-flat-ivory-1200.jpg"))

    produced.append(save_png(three_d, "ko-crest-3d-plum.png"))
    produced.append(save_png(contain(three_d, 1024, 0.02), "ko-crest-3d-plum-1024.png"))
    produced.append(save_webp(contain(three_d, 1024, 0.02), "ko-crest-3d-plum-1024.webp"))
    produced.append(save_jpeg(contain(three_d, 1200, 0.02), "ko-crest-3d-plum-1200.jpg"))

    manifest = {
        "brand": "Kap Ossen",
        "mark": "KO ceremonial orbital crest",
        "version": "draft-v1",
        "status": "Draft for Family Assembly and brand-custodian approval",
        "created": "2026-08-01",
        "country_language_standard": "Deutschland for the country; Deutsch for the language",
        "sources": [
            str(FLAT_SOURCE.relative_to(ROOT)).replace("\\", "/"),
            str(THREE_D_SOURCE.relative_to(ROOT)).replace("\\", "/"),
        ],
        "assets": [],
        "motion": "Animate the transparent static crest with CSS/WAAPI; no GIF is canonical.",
        "rights_note": "Kap Ossen crest custodianship and final release authority remain pending Family Assembly approval.",
    }

    for path in produced:
        with Image.open(path) as asset:
            manifest["assets"].append(
                {
                    "path": str(path.relative_to(ROOT)).replace("\\", "/"),
                    "width": asset.width,
                    "height": asset.height,
                    "mode": asset.mode,
                    "bytes": path.stat().st_size,
                    "sha256": sha256(path),
                }
            )

    manifest_path = OUTPUT_DIR / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"Built {len(produced)} Kap Ossen logo assets and {manifest_path}")


if __name__ == "__main__":
    build()
