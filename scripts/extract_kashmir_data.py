import json
import re
from pathlib import Path

import pandas as pd
from docx import Document
from pypdf import PdfReader


ROOT = Path("/Users/aryanjangde/prof/pakhsa")
FILES = {
    "travel_pdf": Path("/Users/aryanjangde/Downloads/TRAVEL 02-05-2026.pdf"),
    "excursion_pdf": Path("/Users/aryanjangde/Downloads/EXCURSION AGENT 02-05-2026.pdf"),
    "hotel_xlsx": Path("/Users/aryanjangde/Downloads/Hotel Bed Capacity 21 oct 2023.xlsx"),
    "hotel_docx_1": Path("/Users/aryanjangde/Downloads/Hotel Guest House only.docx"),
    "hotel_docx_2": Path("/Users/aryanjangde/Downloads/Hotel Guest House only (1).docx"),
}
OUTPUT_DIR = ROOT / "src" / "data"

PHONE_RE = re.compile(r"(?:\+?91[-\s]?)?([6-9]\d{9})")
LICENSE_RE = re.compile(r"JK(?:TA|EA)\d+|Reg/\S+|REG/\S+|Ree/\S+", re.I)
APP_RE = re.compile(r"^(?P<idx>\d+)\s+(?P<app>(?:TA|EA)\d+)\s+(?P<date>\d{2}-\d{2}-\d{4})\s*(?P<rest>.*)$")
ADDRESS_MARKERS = {
    "road",
    "near",
    "floor",
    "market",
    "nagar",
    "bagh",
    "pora",
    "pattan",
    "sopore",
    "gulmarg",
    "kunzer",
    "baramulla",
    "tangmarg",
    "district",
    "highway",
    "crossing",
    "hospital",
    "chowk",
    "complex",
    "colony",
    "bazar",
    "bala",
    "wara",
    "village",
}
SKIP_HOTEL_NAMES = {
    "s.no",
    "list of the paying guest houses registered with tourism department unit",
    "list of paying guest house in verinag.",
    "list of paying guest house in aharbal",
    "list of paying guest houses/home stay (newguide lines) at pahalgam.",
}


def clean(value):
    return re.sub(r"\s+", " ", str(value or "")).strip()


def normalize_key(value):
    return re.sub(r"[^a-z0-9]+", "", clean(value).lower())


def get_phone(*values):
    for value in values:
        match = PHONE_RE.search(clean(value))
        if match:
            return match.group(1)
    return ""


def classify_hotel(name):
    lowered = clean(name).lower()
    if "home stay" in lowered or "homestay" in lowered:
        return "Home Stay"
    if "guest house" in lowered:
        return "Guest House"
    return "Hotel"


def looks_like_hotel_name(name):
    name = clean(name)
    lowered = name.lower()
    if not name or len(name) < 2:
        return False
    if lowered in SKIP_HOTEL_NAMES:
        return False
    if lowered.startswith("list of "):
        return False
    if re.fullmatch(r"\d+", name):
        return False
    return any(ch.isalpha() for ch in name)


def dedupe(records, defaults=None):
    merged = {}
    defaults = defaults or {}
    for record in records:
      name = clean(record.get("name"))
      if not name:
          continue
      key = normalize_key(name)
      entry = merged.setdefault(key, {"name": name, **defaults, "sources": []})
      for field, value in record.items():
          if field == "sources":
              continue
          if field == "name":
              entry[field] = name
              continue
          value = clean(value)
          if value and (not entry.get(field)):
              entry[field] = value
      source = clean(record.get("source"))
      if source and source not in entry["sources"]:
          entry["sources"].append(source)
    return list(merged.values())


def parse_docx_tables(path):
    doc = Document(path)
    records = []

    for table in doc.tables:
        rows = [[clean(cell.text) for cell in row.cells] for row in table.rows]
        if not rows:
            continue
        first = [cell.lower() for cell in rows[0]]

        if "name of unit" in " ".join(first):
            data_rows = rows[1:]
            for row in data_rows:
                if len(row) < 6:
                    continue
                name = row[1]
                if not looks_like_hotel_name(name):
                    continue
                records.append(
                    {
                        "name": name,
                        "phone": "",
                        "location": clean(" ".join(part for part in [row[4], row[5]] if part)),
                        "type": classify_hotel(name),
                        "source": path.name,
                    }
                )
        elif rows[0][0] == "" and len(rows[0]) >= 6:
            for row in rows:
                if len(row) < 6:
                    continue
                name = row[1]
                if not looks_like_hotel_name(name):
                    continue
                records.append(
                    {
                        "name": name,
                        "phone": "",
                        "location": clean(" ".join(part for part in [row[4], row[5]] if part)),
                        "type": classify_hotel(name),
                        "source": path.name,
                    }
                )
    return records


def parse_hotel_xlsx(path):
    xl = pd.ExcelFile(path)
    records = []

    for sheet_name in xl.sheet_names:
        df = xl.parse(sheet_name, header=None, dtype=str).fillna("")
        rows = [[clean(value) for value in row.tolist()] for _, row in df.iterrows()]

        header_idx = None
        for idx, row in enumerate(rows):
            row_text = " ".join(row).lower()
            if "cell" in row_text and ("name of the unit" in row_text or "name of hotel" in row_text):
                header_idx = idx
                break
        if header_idx is None:
            continue

        header = rows[header_idx]
        name_col = next((i for i, value in enumerate(header) if "name of the unit" in value.lower() or "name of hotel" in value.lower()), None)
        phone_col = next((i for i, value in enumerate(header) if "cell" in value.lower()), None)
        location_col = next((i for i, value in enumerate(header) if "location" in value.lower()), None)
        district_col = next((i for i, value in enumerate(header) if "district" in value.lower()), None)

        if name_col is None:
            continue

        for row in rows[header_idx + 1 :]:
            if name_col >= len(row):
                continue
            name = row[name_col]
            if not looks_like_hotel_name(name):
                continue
            phone = row[phone_col] if phone_col is not None and phone_col < len(row) else ""
            location = row[location_col] if location_col is not None and location_col < len(row) else ""
            district = row[district_col] if district_col is not None and district_col < len(row) else ""
            records.append(
                {
                    "name": name,
                    "phone": get_phone(phone),
                    "location": clean(" ".join(part for part in [location, district] if part)),
                    "type": classify_hotel(name),
                    "source": f"{path.name}::{sheet_name}",
                }
            )
    return records


def normalize_pdf_text(path):
    reader = PdfReader(str(path))
    lines = []
    for page in reader.pages:
        text = page.extract_text() or ""
        for line in text.splitlines():
            line = clean(line)
            if not line:
                continue
            if line.startswith("02/05/2026,"):
                continue
            if line.startswith("https://www.tourismjk.in/"):
                continue
            if line in {"Show 100 entries Search:", "# Application", "No.", "Application", "Date", "Firm Name Address License No. License", "Expiry", "Status Remarks View"}:
                continue
            lines.append(line)
    return lines


def looks_like_address(line):
    lowered = line.lower()
    return any(marker in lowered for marker in ADDRESS_MARKERS)


def parse_travel_pdf(path, service):
    lines = normalize_pdf_text(path)
    records = []
    current = None

    def finalize(record):
        if not record:
            return
        content = [line for line in record["content"] if line not in {"Approved", "(View)", "View"}]
        if not content:
            return
        name_parts = []
        address_parts = []
        address_mode = False
        for line in content:
            if (
                LICENSE_RE.search(line)
                or re.fullmatch(r"\d{2}-\d{2}-\d{4}", line)
                or re.fullmatch(r"\d{4}", line)
                or re.fullmatch(r"\d{2}-\d{2}-", line)
                or line.startswith("Registration approved")
                or line.startswith("Registration upgraded")
                or line.startswith("Approved")
                or line.startswith("approved")
                or line.startswith("as Travel")
                or line.startswith("as Excursion")
            ):
                continue
            if not address_mode and looks_like_address(line) and name_parts:
                address_mode = True
            if address_mode:
                address_parts.append(line)
            else:
                name_parts.append(line)
        name = clean(" ".join(name_parts[:4]))
        address = clean(" ".join(address_parts))
        if name:
            records.append(
                {
                    "appNo": record["app_no"],
                    "name": name.title() if name.isupper() else name,
                    "phone": "",
                    "email": "",
                    "website": "",
                    "location": address,
                    "service": service,
                    "source": path.name,
                }
            )

    for line in lines:
        app_match = APP_RE.match(line)
        if app_match:
            finalize(current)
            current = {
                "app_no": app_match.group("app"),
                "content": [clean(app_match.group("rest"))] if clean(app_match.group("rest")) else [],
            }
            continue
        if current:
            current["content"].append(line)
    finalize(current)
    return records


def write_json(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")


def main():
    hotels = dedupe(
        parse_docx_tables(FILES["hotel_docx_1"])
        + parse_docx_tables(FILES["hotel_docx_2"])
        + parse_hotel_xlsx(FILES["hotel_xlsx"]),
        defaults={"phone": "", "location": "", "type": "Hotel"},
    )
    travel = parse_travel_pdf(FILES["travel_pdf"], "Travel Agent") + parse_travel_pdf(
        FILES["excursion_pdf"], "Excursion Agent"
    )

    hotels.sort(key=lambda item: item["name"].lower())
    travel.sort(key=lambda item: (item["service"], item["name"].lower(), item["appNo"]))

    write_json(OUTPUT_DIR / "hotels-directory.json", hotels)
    write_json(OUTPUT_DIR / "travel-directory.json", travel)
    print(json.dumps({"hotels": len(hotels), "travel": len(travel)}, indent=2))


if __name__ == "__main__":
    main()
