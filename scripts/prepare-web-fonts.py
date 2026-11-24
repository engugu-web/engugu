"""Generate the web fonts from user-supplied originals (fonttools[woff]).

MADE Okine retains its complete character set. SF Pro Display retains Latin,
combining marks, punctuation, currency, arrows and mathematical symbols used by
the English website; other scripts continue to use the system fallback fonts.
Run manually when a source font changes; the website build uses these outputs.
"""

from pathlib import Path
from fontTools import subset
from fontTools.ttLib import TTFont

root = Path(__file__).resolve().parents[1] / "src/assets/font"
output = root / "web"
output.mkdir(exist_ok=True)

families = [
    ("MADE Okine Sans", "MADEOkineSansPERSONALUSE-", "MADEOkineSans-",
     ["Thin", "Light", "Regular", "Medium", "Bold", "Black"]),
    ("SF Pro Display", "SF-Pro-Display-", "SFProDisplay-",
     ["Regular", "Medium", "Semibold", "Bold"]),
]
latin = list(range(0x0250)) + list(range(0x0300, 0x0370)) + list(range(0x2000, 0x2070))
latin += list(range(0x20A0, 0x20D0)) + list(range(0x2190, 0x2300))

for directory, prefix, web_prefix, weights in families:
    for weight in weights:
        source = root / directory / f"{prefix}{weight}.otf"
        font = TTFont(source)
        if directory == "SF Pro Display":
            options = subset.Options()
            options.layout_features = ["*"]
            options.name_IDs = ["*"]
            options.name_languages = ["*"]
            options.passthrough_tables = True
            subsetter = subset.Subsetter(options=options)
            subsetter.populate(unicodes=latin)
            subsetter.subset(font)
        font.flavor = "woff2"
        target = output / f"{web_prefix}{weight}.woff2"
        font.save(target)
        print(f"{target.name}: {source.stat().st_size:,} -> {target.stat().st_size:,} bytes")
