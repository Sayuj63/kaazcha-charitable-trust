# Media Library photos

Each folder here is one album in **Newsletter & Media → Media Library**. Drop
`.jpg`, `.png` or `.webp` files into the matching folder and they show up in
the gallery on the next build. The first file (by name) becomes the album
cover and the thumbnail of the matching seminar.

| Folder                     | Album                    |
| -------------------------- | ------------------------ |
| `naathonatha/`             | Naathonatha              |
| `niranam-nelkinda-naakada/`| Niranam Nelkinda Naakada |
| `thiruvallavaazhu/`        | Thiruvallavaazhu         |

Name files `01.jpg`, `02.jpg`, … to control the order. Resize photos to about
1600px on the long edge before adding them. Optionally put ~560px copies with
the same names in `<album>/thumbs/`; the photo grid uses those so it loads
fast, and falls back to the full photo when there is no thumbnail.

Photos exported from Google Drive lose their rotation tag, so check portrait
shots are upright before adding them.

To add a new album, create a folder and add a matching entry to `ALBUMS` in
`src/content/media.ts`.
