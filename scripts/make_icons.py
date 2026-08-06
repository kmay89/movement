#!/usr/bin/env python3
"""Generate the Movement app icons — zero dependencies, pure stdlib PNG.

Design: a deep sea-green gradient with a warm "comet" sweeping upward —
a body in motion, leaving a gentle trail. Full-bleed, so the same art
works for regular, maskable, and apple-touch icons.
"""

import math
import struct
import zlib
from pathlib import Path

TOP = (10, 74, 66)        # deep sea green
BOTTOM = (44, 143, 120)   # lifted green-teal
COMET = (255, 224, 178)   # warm cream
GLOW = (255, 214, 170)


def lerp(a, b, t):
    return a + (b - a) * t


def comet_path(t):
    """Curve the comet travels: lower-left sweeping to upper-right, in unit coords."""
    x = lerp(0.30, 0.72, t)
    y = lerp(0.72, 0.30, t) - 0.16 * math.sin(math.pi * t)
    return x, y


def render(size):
    px = bytearray()
    n_trail = 26
    head_r = 0.115 * size
    trail = []
    for i in range(n_trail):
        t = i / (n_trail - 1)
        cx, cy = comet_path(t)
        r = lerp(0.012, 1.0, t ** 1.6) * head_r
        alpha = lerp(0.10, 1.0, t ** 1.4)
        trail.append((cx * size, cy * size, r, alpha))

    for y in range(size):
        row = bytearray()
        g = y / (size - 1)
        base = [int(lerp(TOP[c], BOTTOM[c], g)) for c in range(3)]
        # soft radial light behind the comet head
        for x in range(size):
            r_, g_, b_ = base
            hx, hy = comet_path(1.0)
            d_glow = math.hypot(x - hx * size, y - hy * size) / size
            glow = max(0.0, 1.0 - d_glow / 0.55) ** 2 * 0.18
            r_ = int(lerp(r_, GLOW[0], glow))
            g_ = int(lerp(g_, GLOW[1], glow))
            b_ = int(lerp(b_, GLOW[2], glow))

            cov = 0.0
            for cx, cy, cr, ca in trail:
                d = math.hypot(x - cx, y - cy)
                c = max(0.0, min(1.0, cr + 0.9 - d)) * ca
                if c > cov:
                    cov = c
            if cov > 0:
                r_ = int(lerp(r_, COMET[0], cov))
                g_ = int(lerp(g_, COMET[1], cov))
                b_ = int(lerp(b_, COMET[2], cov))
            row += bytes((r_, g_, b_))
        px += b"\x00" + row  # filter type 0 per scanline
    return bytes(px)


def write_png(path, size):
    raw = render(size)

    def chunk(tag, data):
        c = struct.pack(">I", len(data)) + tag + data
        return c + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)

    ihdr = struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0)  # 8-bit RGB
    png = (b"\x89PNG\r\n\x1a\n"
           + chunk(b"IHDR", ihdr)
           + chunk(b"IDAT", zlib.compress(raw, 9))
           + chunk(b"IEND", b""))
    Path(path).write_bytes(png)
    print(f"wrote {path} ({size}x{size}, {len(png)} bytes)")


if __name__ == "__main__":
    out = Path(__file__).resolve().parent.parent / "icons"
    out.mkdir(exist_ok=True)
    write_png(out / "icon-512.png", 512)
    write_png(out / "icon-maskable-512.png", 512)
    write_png(out / "icon-192.png", 192)
    write_png(out / "apple-touch-icon.png", 180)
